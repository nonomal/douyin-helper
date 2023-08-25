import filenamify from 'filenamify';
import { minimatch } from 'minimatch';

import * as config from '../../base/config';
import {
  isEnabled,
  isPlayerDownloadButtonEnabled,
  isListItemDownloadButtonEnabled
} from '../../base/func/downloadVideo';
import { addListener, MSG_OPTIONS_UPDATED } from '../../base/message';
import { toBackground, MSG_PREPARE_TO_DOWNLOAD } from '../../base/message';
import { throttle } from '../../base/stream';
import { Aweme } from '../../base/model';
import state from '../state';
import { querySelectorFirst, querySelectorAllFirst, closestFirst } from '../dom';

let isEnabledNow = false;
let isPlayerDownloadButtonEnabledNow = false;
let isListItemDownloadButtonEnabledNow = false;

export function init() {
  setInterval(handleMutation, 1000);

  document.addEventListener('click', handleClick, true);

  window.addEventListener('popstate', sync);
  addListener(MSG_OPTIONS_UPDATED, sync);
  sync();
}

async function sync() {
  const urlPatterns = await config.get<string[]>(['download', 'disabledInUrls']) || [];
  for (const urlPattern of urlPatterns) {
    if (minimatch(location.href, urlPattern)) {
      isEnabledNow = false;
      removeDownloadNodes();
      return;
    }
  }
  isEnabledNow = await isEnabled();
  isPlayerDownloadButtonEnabledNow = isEnabledNow && await isPlayerDownloadButtonEnabled();
  isListItemDownloadButtonEnabledNow = isEnabledNow && await isListItemDownloadButtonEnabled();
  if (!isEnabledNow) {
    removeDownloadNodes();
  }
  if (!isPlayerDownloadButtonEnabledNow) {
    removePlayerDownloadNodes();
  }
  if (!isListItemDownloadButtonEnabledNow) {
    removeListItemDownloadNotes();
  }
}

function removeDownloadNodes() {
  document.querySelectorAll('[data-dh-download-id]').forEach((node) => node.remove());
}

function removePlayerDownloadNodes() {
  document.querySelectorAll('.dh-player-download-btn').forEach((node) => node.remove());
}

function removeListItemDownloadNotes() {
  document.querySelectorAll('.dh-list-item-download-btn').forEach((node) => node.remove());
}

async function handleClick(e: MouseEvent) {
  if (!(e.target instanceof HTMLElement)) {
    return;
  }
  if (!e.target.matches('[data-dh-download-id]:not(.loading):not(.disabled)')) {
    return;
  }
  e.preventDefault();
  e.stopPropagation();

  try {
    const id = e.target.dataset.dhDownloadId || '';
    e.target.classList.add('loading');
    await downloadVideo(id);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  } catch (err) {
    console.error('[DH][downloadVideo] error', err);
    alert(`下载时遇到错误: ${err.message}`);
  } finally {
    e.target.classList.remove('loading');
  }
}

async function downloadVideo(id: string) {
  const aweme = state.awemes[id];
  if (!aweme) {
    console.error('[DH][downloadVideo] aweme not found', id);
    return;
  }
  
  const tail = `#dhdk=${Date.now()}`;
  const filter = `*${tail}`;
  const url = aweme.bestVideoUrl.replace(/^http:/, 'https:') + tail;
  const filename = getVideoFilename(aweme);

  await toBackground(MSG_PREPARE_TO_DOWNLOAD, { filter, filename });

  const anchorId = 'douyinHelperDownloadAnchor';
  let a = document.querySelector(`#${anchorId}`) as HTMLAnchorElement;
  if (!a) {
    a = document.createElement('a');
    a.id = anchorId;
    a.style.display = 'none';
    document.body.append(a);
  }
  a.href = url;
  a.download = filename;
  a.click();
}

function getVideoFilename(aweme: Aweme) {
  let filename = `${escapeFilename(aweme.author.nickname)}_${escapeFilename(aweme.description)}`;
  if (filename.length > 80) {
    filename = `${filename.slice(0, 80)}…`;
  }
  filename += `_${aweme.id}.mp4`;
  return filename;
}

function escapeFilename(str: string) {
  return filenamify(str.replace(/\s+/g, ' ').trim());
}

function handleMutation() {
  if (!isEnabledNow) {
    return;
  }
  if (isPlayerDownloadButtonEnabledNow) {
    initPlayerDownloadBtn();
  }
  if (isListItemDownloadButtonEnabledNow) {
    initListItemDownloadBtn();
  }
}

async function initListItemDownloadBtn() {
  const cfgs = await config.get<any[]>(['download', 'selectors', 'list']) || [];
  for (const cfg of cfgs) {
    const items = Array.from(querySelectorAllFirst(document, cfg.item)) as HTMLElement[];
    const awemeIdRegex = new RegExp(cfg.awemeId.regex, 'i');
    let matched = false;
    for (const item of items) {
      if (item.dataset.dhInited) {
        continue;
      }
      item.dataset.dhInited = 'true';

      const idNode = querySelectorFirst(item, cfg.awemeId.node) as HTMLElement;
      const id = idNode?.getAttribute(cfg.awemeId.attr)?.match(awemeIdRegex)?.[1];
      if (!id) {
        continue;
      }
      const aweme = state.awemes[id];
      if (!aweme) {
        continue;
      }
      matched = true;
  
      const btn = document.createElement('div');
      btn.className = 'dh-list-item-download-btn';
      btn.dataset.dhDownloadId = id;
      item.append(btn);
    }
    if (matched) {
      break;
    }
  }
}

async function initPlayerDownloadBtn() {
  const cfgs = await config.get<any[]>(['download', 'selectors', 'player']) || [];
  for (const cfg of cfgs) {
    const videos = Array.from(document.querySelectorAll('video')) as HTMLVideoElement[];
    const awemeIdRegex = new RegExp(cfg.awemeId.regex, 'i');
    for (const video of videos) {
      if (video.currentSrc === video.dataset.dhSrc) {
        continue;
      }
      video.dataset.dhSrc = video.currentSrc;
  
      const wrapper = closestFirst(video, cfg.wrapper);
      const anchor = querySelectorFirst(wrapper, cfg.anchor.node);
      if (!anchor) {
        continue;
      }
  
      let btn = anchor.parentNode?.querySelector('.dh-player-download-btn') as HTMLElement;
      let aweme = state.awemeUrlMatcher.find(video.currentSrc);
      if (!aweme) {
        const container = closestFirst(video, cfg.awemeId.node) as HTMLElement;
        aweme = state.awemes[(container?.getAttribute(cfg.awemeId.attr) || '').match(awemeIdRegex)?.[1] || ''];
        if (!aweme) {
          btn?.remove();
          continue;
        }
      }
      if (!btn) {
        btn = document.createElement('div');
        btn.className = 'dh-player-download-btn';
        if (cfg.anchor.before) {
          anchor.parentNode?.insertBefore(btn, anchor);
        } else {
          if (anchor.nextSibling) {
            anchor.parentNode?.insertBefore(btn, anchor.nextSibling);
          } else {
            anchor.parentNode?.append(btn);
          }
        }
      }
      btn.dataset.dhDownloadId = aweme.id;
    }
  }
}

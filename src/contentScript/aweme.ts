import { JSONPath } from 'jsonpath-plus';
import { minimatch } from 'minimatch';

import { Aweme } from '../base/model';
import * as config from '../base/config';
import { EVENT_REQUEST_LOAD, RequestLoadEventDetail } from '../injection/request';
import state from './state';

export function init() {
  document.addEventListener(EVENT_REQUEST_LOAD, async (event: any) => {
    const { url, response } = event.detail as RequestLoadEventDetail;
    await getAwemeFromResponse(url, response);
  });
  document.addEventListener('DOMContentLoaded', async () => {
    await getAwemeFromHtml();
  });
}

async function getAwemeFromResponse(url: string, response: any) {
  if (!response || typeof response !== 'object') {
    return;
  }

  const awemes: Record<string, Aweme> = {};
  const locations = await config.get<any>(['aweme', 'locations']) || {};
  for (const urlPattern in locations.request) {
    if (!minimatch(url, urlPattern)) {
      continue;
    }
    const paths = locations.request[urlPattern];
    for (const path of paths) {
      Object.assign(awemes, await getAwemesByPath(path, response));
    }
  }

  updateAwemeState(awemes);
}

async function getAwemeFromHtml() {
  const awemes: Record<string, Aweme> = {};

  const locations = await config.get<any>(['aweme', 'locations']) || {};
  for (const selector in locations.html) {
    const nodes = Array.from(document.querySelectorAll(selector));
    const paths = locations.html[selector];
    for (const node of nodes) {
      try {
        let data = toUnderscoreCase(JSON.parse(decodeURIComponentIgnoreError(node.textContent || '')));
        for (const path of paths) {
          Object.assign(awemes, await getAwemesByPath(path, data));
        }
      } catch (err) {
        console.warn('[DH][getAwemeFromHtml]', err);
      }
    }
  }

  updateAwemeState(awemes);
}

function decodeURIComponentIgnoreError(str: string): string {
  try {
    return decodeURIComponent(str);
  } catch (err) {
    return str;
  }
}

async function getAwemesByPath(path: string, data: any): Promise<Record<string, Aweme>> {
  const awemes: Record<string, Aweme> = {};

  let field = JSONPath<any[]>({ path, json: data });
  if (!path.includes('..')) {
    field = field[0];
  }
  if (!field) {
    return awemes;
  }

  if (Array.isArray(field)) {
    for (const item of field) {
      const aweme = await resolveAweme(item);
      if (aweme) {
        awemes[aweme.id] = aweme;
      }
    }
    return awemes;
  }

  const aweme = await resolveAweme(field);
  if (aweme) {
    awemes[aweme.id] = aweme;
  }
  return awemes;
}


function updateAwemeState(awemes: Record<string, Aweme>) {
  Object.assign(state.awemes, awemes);
  for (const aweme of Object.values(awemes)) {
    for (const url of aweme.videoUrls) {
      state.awemeUrlMatcher.add(url, aweme);
    }
    aweme.videoUrls = [];
  }
}

async function resolveAweme(data: any): Promise<Aweme | undefined> {
  if (!data) {
    return;
  }

  if (typeof data === 'string') {
    try {
      const json = JSON.parse(data);
      const aweme = resolveAweme(json);
      return aweme;
    } catch (err) {
      console.warn('[DH][getAwemeFromResponse]', err);
      return;
    }
  }

  const fieldCfgList = await config.get<any[]>(['aweme', 'fields']) || [];
  for (const cfg of fieldCfgList) {
    const id = JSONPath<string[]>({ path: cfg.id, json: data })[0];
    if (!id) {
      continue;
    }

    const videos = JSONPath<any[]>({ path: cfg.videos, json: data })[0];
    if (!videos?.length) {
      continue;
    }

    const isDesc = cfg.videosOrder === 'desc';
    videos.sort((a: any, b: any) => {
      const av = JSONPath<any[]>({ path: cfg.videosOrderBy, json: a })[0];
      const bv = JSONPath<any[]>({ path: cfg.videosOrderBy, json: b })[0];
      if (isNaN(av) || isNaN(bv)) {
        return (isDesc ? -1 : 1) * (String(av).localeCompare(String(bv)));
      }
      return (isDesc ? -1 : 1) * (av - bv);
    });

    const videoUrls = videos.map((video: any) => {
      return JSONPath<string[]>({ path: cfg.videoUrls, json: video })
    }).flat(Infinity);

    const bestVideoUrl = JSONPath<string[]>({ path: cfg.bestVideoUrl, json: videos[0] })[0];
    if (!bestVideoUrl) {
      continue;
    }

    const description = JSONPath<string[]>({ path: cfg.description, json: data })[0] || '';
    const authorId = JSONPath<string[]>({ path: cfg.authorId, json: data })[0] || '';
    const authorNickname = JSONPath<string[]>({ path: cfg.authorNickname, json: data })[0] || '';

    return {
      id,
      videoUrls,
      bestVideoUrl,
      description,
      author: {
        id: authorId,
        nickname: authorNickname,
      },
    };
  }
}

export function toUnderscoreCase(obj: any): any {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(toUnderscoreCase);
  }
  const newObj: any = {};
  Object.keys(obj).forEach((key) => {
    const newKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase(
    )}`); 
    newObj[newKey] = toUnderscoreCase(obj[key]);
  });
  return newObj;
}
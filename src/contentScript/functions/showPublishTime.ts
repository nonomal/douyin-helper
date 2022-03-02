import dayjs from 'dayjs';

import { isEnabled } from '../../base/functions/showPublishTime';
import { EVENT_XHR_LOAD, XHRLoadEventDetail } from '../../base/request';
import config from '../../base/config';

interface Aweme {
  video: {
    play_addr: {
      url_list: string[];
    };
    bit_rate: {
      play_addr: {
        url_list: string[];
      };
    }[];
  };
  create_time: number;
}

let items: Aweme[] = [];
let timestamps: Record<string, number> = {};

export function start() {
  document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener(EVENT_XHR_LOAD, (event: any) => {
      const { url, response } = event.detail as XHRLoadEventDetail;
      const path = new URL(url).pathname;
  
      let newItems: Aweme[] = [];
      if (path === config.get<string>(['apis', 'feed', 'path'])) {
        newItems = response.aweme_list || [];
      }
      if (path === config.get<string>(['apis', 'followFeed', 'path'])) {
        newItems = response.data?.map(v => v.aweme) || [];
      }
      items = [...items, ...newItems].slice(-100);

      const newTimestamps: Record<string, number> = {};
      for (const item of items) {
        for (const url of (item.video?.play_addr?.url_list || [])) {
          newTimestamps[removeProtocol(url)] = item.create_time;
        }
        for (const rate of (item.video?.bit_rate || [])) {
          for (const url of (rate.play_addr?.url_list || [])) {
            newTimestamps[removeProtocol(url)] = item.create_time;
          }
        }
      }
      timestamps = newTimestamps;
    });
  });
}

export async function execute() {
  if (!(await isEnabled())) {
    return;
  }
  const slides = Array.from(document.querySelectorAll(
    config.get<string>(['selectors', 'feed:slides'])
  ));
  for (const slide of slides) {
    const video = slide.querySelector<HTMLVideoElement>(
      config.get<string>(['selectors', 'feed:slide:video'])
    );
    if (!video) {
      continue;
    }
    const timestamp = timestamps[removeProtocol(video.currentSrc)];
    if (!timestamp) {
      continue;
    }
    const account = slide.querySelector(
      config.get<string>(['selectors', 'feed:slide:account'])
    );
    if (!account) {
      continue;
    }
    const badge = slide.querySelector<HTMLElement>(
      config.get<string>(['selectors', 'feed:slide:accountBadge'])
    );
    if (badge && !badge.childElementCount) {
      badge.style.display = 'none';
    }
    const className = 'douyinHelper_publishTime';
    if (account.querySelector('.' + className)) {
      continue;
    }
    const time = document.createElement('span');
    time.className = className;
    time.textContent = dayjs.unix(timestamp).format('YYYY-MM-DD');
    time.title = dayjs.unix(timestamp).format('YYYY-MM-DD HH:mm:ss');
    account.appendChild(time);
  }
}

function removeProtocol(url: string | undefined): string {
  return url?.replace(/^.*?\/\//, '') || '';
}

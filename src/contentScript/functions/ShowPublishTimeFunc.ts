import dayjs from 'dayjs';

import { isEnabled } from '../../base/functions/showPublishTime';
import { EVENT_XHR_LOAD, XHRLoadEventDetail } from '../../base/request';
import config from '../../base/config';
import { querySelector, querySelectorAll } from '../dom';
import Func from './Func';

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

export default class ShowPublishTimeFunc extends Func {

  items: Aweme[] = [];
  timestamps: Record<string, number> = {};

  async isEnabled() {
    return await isEnabled();
  }

  start() {
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
        this.items = [...this.items, ...newItems].slice(-100);
  
        const newTimestamps: Record<string, number> = {};
        for (const item of this.items) {
          for (const url of (item.video?.play_addr?.url_list || [])) {
            newTimestamps[this.removeProtocol(url)] = item.create_time;
          }
          for (const rate of (item.video?.bit_rate || [])) {
            for (const url of (rate.play_addr?.url_list || [])) {
              newTimestamps[this.removeProtocol(url)] = item.create_time;
            }
          }
        }
        this.timestamps = newTimestamps;
      });
    });
  }
  
  async execute() {
    if (!(await isEnabled())) {
      return;
    }
    const slides = Array.from(querySelectorAll(
      document,
      ['selectors', 'feed:slides'],
    ));
    for (const slide of slides) {
      const video = querySelector(
        slide,
        ['selectors', 'feed:slide:video'],
      ) as HTMLVideoElement;
      if (!video) {
        continue;
      }
      const timestamp = this.timestamps[this.removeProtocol(video.currentSrc)];
      if (!timestamp) {
        continue;
      }
      const account = querySelector(slide, ['selectors', 'feed:slide:account']);
      if (!account) {
        continue;
      }
      const badge = querySelector(
        slide, 
        ['selectors', 'feed:slide:accountBadge'],
      ) as HTMLElement;
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

}

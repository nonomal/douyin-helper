import { Video } from '../../base/functions/downloadVideo';
import { EVENT_XHR_LOAD, XHRLoadEventDetail } from '../../base/request';
import { querySelectorAll } from '../dom';
import Func from './Func';

export default class DownloadVideoFunc extends Func {

  lastPagePath = '';
  awemes = [];

  async isEnabled() {
    return true;
  }

  async start() {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.addEventListener(EVENT_XHR_LOAD, (event: any) => {
        const { url, response } = event.detail as XHRLoadEventDetail;
        if (this.lastPagePath !== window.location.pathname) {
          this.lastPagePath = window.location.pathname;
          this.awemes = [];
        }
        if (response?.aweme_list) {
          this.awemes.push(...response.aweme_list);
        }
        if (response?.data?.[0]?.aweme) {
          this.awemes.push(...response.data.map(item => item.aweme));
        }
        this.awemes = this.awemes.slice(-1000);
      });
    });
    chrome.runtime.onConnect.addListener(async port => {
      if (port.name === 'popup') {
        port.postMessage({ video: this.getVideo() });
      }
    });
  }

  getVideo(): Video | undefined {
    const videoEls = Array.from(
      querySelectorAll(document, ['selectors', 'video'])
    );
    if (!videoEls.length) {
      return;
    }

    const viewportSize = this.getViewportSize();
    const scores = videoEls.map(el => {
      const rect = el.getBoundingClientRect();
      const centerTop = (rect.top + rect.bottom) / 2;
      const centerLeft = (rect.left + rect.right) / 2;
      const score = -(
        Math.abs(viewportSize.width / 2 - centerLeft) +
        Math.abs(viewportSize.height / 2 - centerTop)
      );
      return { el, score };
    });
    const bestEl = scores.sort((a, b) => b.score - a.score)[0].el;

    const currUrl = bestEl.currentSrc;
    if (!currUrl || /^blob:/.test(currUrl)) {
      return;
    }
    const matched = window.location.pathname.match(/\/video\/(\d+)/);
    if (matched) {
      return {
        filename: matched[1] + '.mp4',
        url: currUrl,
      };
    }
    for (const aweme of this.awemes) {
      const urls = [
        ...(aweme.video?.bit_rate?.reduce((res, item) => [
          ...res,
          ...(item.play_addr?.url_list || []),
        ], []) || []),
        ...(aweme.video?.play_addr?.url_list || []),
      ];
      for (const url of urls) {
        if (this.removeProtocol(currUrl).startsWith(this.removeProtocol(url))) {
          return {
            filename: aweme.aweme_id + '.mp4',
            url: currUrl,
          };
        }
      }
    }
    return {
      filename: `douyin_${Date.now()}.mp4`,
      url: currUrl,
    };
  }

  getViewportSize () {
    const root = document.documentElement
    return {
      width: Math.max(root.clientWidth, window.innerWidth || 0),
      height: Math.max(root.clientHeight, window.innerHeight || 0)
    }
  }

}

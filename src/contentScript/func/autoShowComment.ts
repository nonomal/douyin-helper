import { isEnabled } from '../../base/func/autoShowComment';
import { addListener, MSG_OPTIONS_UPDATED } from '../../base/message';
import * as config from '../../base/config';
import { querySelectorFirst } from '../dom';

let isEnabledNow = false;

export function init() {
  setInterval(() => {
    autoShowCOmment();
  }, 1000);

  addListener(MSG_OPTIONS_UPDATED, sync);
  sync();
}

async function sync() {
  isEnabledNow = await isEnabled();
}

async function autoShowCOmment() {
  if (!isEnabledNow) {
    return;
  }
  
  const selectors = await config.get<any[]>(['comment', 'selectors']) || [];
  for (const cfg of selectors) {
    const wrapper = querySelectorFirst(document, cfg.wrapper) as HTMLElement;
    if (!wrapper) {
      continue;
    }
    const video = querySelectorFirst(wrapper, cfg.video) as HTMLElement;
    if (!video) {
      continue;
    }
    const toggleBtn = querySelectorFirst(wrapper, cfg.toggleBtn) as HTMLElement;
    if (!toggleBtn) {
      continue;
    }
  
    const wrapperRect = wrapper.getBoundingClientRect();
    const videoRect = video.getBoundingClientRect();
  
    if (wrapperRect.right - videoRect.right < 200) {
      toggleBtn.click();
    }

    return;
  }
}
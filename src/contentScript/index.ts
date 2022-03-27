import config from '../base/config';
import { Theme, updateTheme } from '../base/theme';

import AutoShowCommentFunc from './functions/AutoShowCommentFunc';
import ShowPublishTimeFunc from './functions/ShowPublishTimeFunc';
import RemapShortcutFunc from './functions/RemapShortcutFunc';
import DownloadVideoFunc from './functions/DownloadVideoFunc';
import { querySelector } from './dom';

(async () => {
  inject();

  await config.prepare();

  initThemeSync();

  new AutoShowCommentFunc().init();
  new ShowPublishTimeFunc().init();
  new RemapShortcutFunc().init();
  new DownloadVideoFunc().init();
})();

function inject() {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('injection/index.js');
  document.documentElement.appendChild(script);
  document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('link');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.href = chrome.runtime.getURL('assets/css/style.css');
    document.head.appendChild(style);
    script.remove();
  });
}

function initThemeSync() {
  document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
      const isDark = !!querySelector(document, ['selectors', 'darkTheme']);
      updateTheme(isDark ? Theme.Dark : Theme.Light);
    }, 3000);
  });
}

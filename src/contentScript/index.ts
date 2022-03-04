import config from '../base/config';
import { Theme, updateTheme } from '../base/theme';

import * as autoShowComment from './functions/autoShowComment';
import * as enhanceDescription from './functions/enhanceDescription';
import * as showPublishTime from './functions/showPublishTime';
import * as autoHideCursor from './functions/autoHideCursor';
import * as remapShortcut from './functions/remapShortcut';
import { querySelector } from './dom';

(async () => {
  inject();

  await config.prepare();

  initThemeSync();
  
  if (isInPages('feeds')) {
    autoHideCursor.start();
    showPublishTime.start();
    setInterval(() => {
      autoShowComment.execute();
      enhanceDescription.execute();
      showPublishTime.execute();
    }, 1000);
  }
  
  if (isInPages('remapShortcutsIn')) {
    remapShortcut.start();
    setInterval(() => {
      remapShortcut.execute();
    }, 1000);
  }
})();

function isInPages(name: string) {
  const patterns = config.get<string[]>(['paths', name]) || [];
  for (const pattern of patterns) {
    const reg = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$')
    if (reg.test(location.pathname)) {
      return true;
    }
  }
}

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

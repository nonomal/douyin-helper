import config from '../base/config';
import { Theme, updateTheme } from '../base/theme';

import * as autoShowComment from './functions/autoShowComment';
import * as enhanceDescription from './functions/enhanceDescription';
import * as showPublishTime from './functions/showPublishTime';
import * as autoHideCursor from './functions/autoHideCursor';

if (isInFeedPage()) {
  inject();
  start();
  initThemeSync();
}

function isInFeedPage() {
  return config.get<string[]>(['paths', 'feeds'])?.includes(location.pathname);
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

function start() {
  autoHideCursor.start();
  setInterval(() => {
    autoShowComment.execute();
    enhanceDescription.execute();
    showPublishTime.execute();
  }, 1000);
}

function initThemeSync() {
  document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
      const isDark = Boolean(document.querySelector(
        config.get<string>(['selectors', 'darkTheme'])
      ));
      updateTheme(isDark ? Theme.Dark : Theme.Light);
    }, 3000);
  });
}

import config from '../base/config';

import * as autoShowComment from './functions/autoShowComment';
import * as enhanceDescription from './functions/enhanceDescription';
import * as showPublishTime from './functions/showPublishTime';
import * as autoHideCursor from './functions/autoHideCursor';

if (isInFeedPage()) {
  inject();
  start();
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

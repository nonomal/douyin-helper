import * as config from '../base/config';

export function init() {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('injection/index.js');
  document.documentElement.insertBefore(script, document.documentElement.firstChild);

  document.addEventListener('DOMContentLoaded', async () => {
    const css = document.createElement('link');
    css.type = 'text/css';
    css.rel = 'stylesheet';
    css.href = chrome.runtime.getURL('assets/styles/douyin.css');
    document.head.appendChild(css);

    const style = document.createElement('style');
    style.textContent = await config.get<string>(['injection', 'style']) || '';
    document.head.appendChild(style);

    script.remove();
  });
}

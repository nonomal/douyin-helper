import { updateUserLastActiveTime } from '../base/status';
import { isDouyinHost, isInFeedPage } from '../base/page';
import config from '../base/config';

const ALARM_SYNC_CONFIG = 'config:sync';

chrome.alarms.create(ALARM_SYNC_CONFIG, {
  periodInMinutes: 1,
});

chrome.alarms.onAlarm.addListener(({ name }) => {
  if (name === ALARM_SYNC_CONFIG) {
    config.sync();
  }
});

chrome.webNavigation.onCommitted.addListener(() => {
  updateUserLastActiveTime(new Date());
});

chrome.webNavigation.onCommitted.addListener(({ url, tabId }) => {
  const u = new URL(url);
  if (!isDouyinHost(u.hostname)) {
    return;
  }
  if (isInFeedPage(u.pathname)) {
    initFeedPage(tabId);
  }
});

function initFeedPage(tabId: number) {
  chrome.scripting.executeScript({
    target: {
      tabId,
    },
    files: [
      'injection/index.js',
    ],
    world: 'MAIN',
  });
  chrome.scripting.insertCSS({
    target: {
      tabId,
    },
    files: [
      'assets/css/style.css',
    ],
  })
}

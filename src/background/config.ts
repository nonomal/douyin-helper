import { updateUserLastActiveTime } from '../base/state';
import * as config from '../base/config';

const ALARM_SYNC_CONFIG = 'config:sync';

export function init() {
  chrome.alarms.create(ALARM_SYNC_CONFIG, {
    periodInMinutes: 1,
    delayInMinutes: 0,
  });
  chrome.alarms.onAlarm.addListener(({ name }) => {
    if (name === ALARM_SYNC_CONFIG) {
      config.sync();
    }
  });
  chrome.tabs.onCreated.addListener(() => {
    updateUserLastActiveTime(new Date());
  });
}

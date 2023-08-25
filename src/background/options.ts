export function init() {
  chrome.action.onClicked.addListener(() => {
    chrome.runtime.openOptionsPage();
  });

  chrome.runtime.onInstalled.addListener(({ previousVersion, reason }) => {
    if (!['update', 'install'].includes(reason)) {
      return;
    }
    const prev = previousVersion;
    const curr = chrome.runtime.getManifest().version;
    if (!prev || +curr.split('.')[0] > +prev.split('.')[0]) {
      const url = chrome.runtime.getURL(`/main/index.html#?reason=${reason}`);
      chrome.tabs.create({ url });
    }
  });
}

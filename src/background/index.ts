chrome.webNavigation.onCommitted.addListener(({ url, tabId }) => {
  if (!isDouyinUrl(url)) {
    return;
  }
  if (isFeedUrl(url)) {
    initFeedPage(tabId);
  }
});

function isDouyinUrl(url: string) {
  return /(www)?\.douyin\.com/.test(new URL(url).hostname);
}

function isFeedUrl(url: string) {
  return /^\/(follow)?$/.test(new URL(url).pathname);
}

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

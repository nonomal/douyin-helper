const KEY_AUTO_SHOW_COMMENT = 'autoShowComment';

async function isAutoShowCommentEnabled() {
  return new Promise((resolve => {
    chrome.storage.local.get(KEY_AUTO_SHOW_COMMENT, res => {
      resolve(res[KEY_AUTO_SHOW_COMMENT] ?? true);
    });
  }));
}

async function updateAutoShowCommentStatus(enabled) {
  return new Promise((resolve => {
    chrome.storage.local.set({
      [KEY_AUTO_SHOW_COMMENT]: enabled,
    }, resolve);
  }));
}

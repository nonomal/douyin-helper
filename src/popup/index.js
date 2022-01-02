(async function initAutoShowComment () {
  const checkbox = document.getElementById(KEY_AUTO_SHOW_COMMENT);
  checkbox.checked = await isAutoShowCommentEnabled();
  checkbox.onchange = e => {
    updateAutoShowCommentStatus(e.target.checked);
  }
}());

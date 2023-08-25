import * as base from '../../base/func/searchSelection';

export function init() {
  base.updateContextMenu();
  chrome.contextMenus.onClicked.addListener(base.onSearchMenuItemClicked);
  chrome.tabs.onUpdated.addListener(base.onTabUpdated);
}

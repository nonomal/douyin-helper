import storage from '../storage';
import * as config from '../config';
import { broadcast, MSG_OPTIONS_UPDATED } from '../message';

const KEY_ENABLED = 'func:searchSelection:enabled';
const KEY_OPTIONS = 'func:searchSelection:options';
const KEY_OPEN_IN_NEW_TAB = 'func:searchSelection:openInNewTab';

const MENU_ITEM_ID = 'search';

export async function isEnabled() {
  return (await storage.get(KEY_ENABLED)) ?? true;
};

export async function updateIsEnabled(enabled: boolean) {
  await storage.set(KEY_ENABLED, enabled);
  broadcast(MSG_OPTIONS_UPDATED);
  await updateContextMenu();
};

export async function updateContextMenu() {
  const item: chrome.contextMenus.CreateProperties = {
    id: MENU_ITEM_ID,
    title: '使用抖音搜索“%s”',
    contexts: ['selection'],
  };
  chrome.contextMenus?.removeAll?.();
  if (await isEnabled()) {
    chrome.contextMenus?.create?.(item);
  }
}

export async function onSearchMenuItemClicked(info: chrome.contextMenus.OnClickData) {
  if (info.menuItemId !== MENU_ITEM_ID) {
    return;
  }
  const query = encodeURIComponent((info.selectionText || '*').trim().slice(0, 64));
  const template = await config.get<string>(['search', 'urlTemplate']) || '';
  const url = new URL(template.replace('{{query}}', query));
  const keys = await getFieldKeys();
  const options = await getOptions();
  for (const key in options) {
    if (keys.includes(key)) {
      url.searchParams.set(key, options[key]);
    }
  }
  if (await isOpenInNewTab()) {
    const tabs = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    const tab = tabs[0]!;
    chrome.tabs.create({ url: url.toString(), index: tab.index + 1 });
    return;
  }
  chrome.tabs.update({ url: url.toString() });
}

export async function onTabUpdated(id: number, info: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) {
  const template = await config.get<string>(['search', 'urlTemplate']) || '';
  if (!tab.url?.startsWith(template.split('{{')[0])) {
    return;
  }
  const url = new URL(tab.url);
  const keys = await getFieldKeys();
  const options: Record<string, string> = {};
  for (const key of keys) {
    const value = url.searchParams.get(key);
    if (value) {
      options[key] = value;
    }
  }
  if (!Object.keys(options).length) {
    return;
  }
  await updateOptions(options);
}

async function getFieldKeys() {
  return await config.get<string[]>(['search', 'rememberFields']) || [];
}

async function getOptions() {
  return (await storage.get(KEY_OPTIONS)) ?? {};
}

async function updateOptions(options: Record<string, string>) {
  await storage.set(KEY_OPTIONS, options);
}

export async function isOpenInNewTab() {
  return (await storage.get(KEY_OPEN_IN_NEW_TAB)) ?? true;
}

export async function updateIsOpenInNewTab(value: boolean) {
  await storage.set(KEY_OPEN_IN_NEW_TAB, value);
  broadcast(MSG_OPTIONS_UPDATED);
}

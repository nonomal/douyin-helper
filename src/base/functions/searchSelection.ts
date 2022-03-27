import storage from '../storage';
import config from '../config';

const KEY_ENABLED = 'func:searchSelection:enabled';
const KEY_OPTIONS = 'func:searchSelection:options';

const MENU_ITEM_ID = 'search';

const BASE_URL = 'https://www.douyin.com/search/';

export async function isEnabled() {
  return (await storage.get(KEY_ENABLED)) ?? true;
};

export async function updateStatus(enabled: boolean) {
  await storage.set(KEY_ENABLED, enabled);
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
  const query = (info.selectionText || '*').trim().slice(0, 64);
  const path = encodeURIComponent(query);
  const url = new URL(`${BASE_URL}${path}`);
  const keys = await getRememberableOptionKeys();
  const options = await getOptions();
  for (const key in options) {
    if (keys.includes(key)) {
      url.searchParams.set(key, options[key]);
    }
  }
  chrome.tabs.create({ url: url.toString() });
}

export async function onTabUpdated(id: number, info: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) {
  if (!tab.url?.startsWith(BASE_URL)) {
    return;
  }
  const url = new URL(tab.url);
  const keys = await getRememberableOptionKeys();
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

async function getRememberableOptionKeys() {
  await config.prepare();
  return config.get<string[]>(['search', 'rememberableOptionKeys']) || [];
}

async function getOptions() {
  return (await storage.get(KEY_OPTIONS)) ?? {};
}

async function updateOptions(options: Record<string, string>) {
  await storage.set(KEY_OPTIONS, options);
}

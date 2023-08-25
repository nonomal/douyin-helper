import storage from '../storage';
import { broadcast, MSG_OPTIONS_UPDATED } from '../message';

const KEY_ENABLED = 'func:downloadVideo:enabled';
const KEY_PLAYER_DOWNLOAD_BUTTON_ENABLED = 'func:downloadVideo:playerDownloadButtonEnabled';
const KEY_LIST_ITEM_DOWNLOAD_BUTTON_ENABLED = 'func:downloadVideo:listItemDownloadButtonEnabled';

export async function isEnabled() {
  return (await storage.get(KEY_ENABLED)) ?? true;
};

export async function updateIsEnabled(enabled: boolean) {
  await storage.set(KEY_ENABLED, enabled);
  broadcast(MSG_OPTIONS_UPDATED);
};

export async function isPlayerDownloadButtonEnabled() {
  return (await storage.get(KEY_PLAYER_DOWNLOAD_BUTTON_ENABLED)) ?? true;
}

export async function updateIsPlayerDownloadButtonEnabled(enabled: boolean) {
  await storage.set(KEY_PLAYER_DOWNLOAD_BUTTON_ENABLED, enabled);
  broadcast(MSG_OPTIONS_UPDATED);
}

export async function isListItemDownloadButtonEnabled() {
  return (await storage.get(KEY_LIST_ITEM_DOWNLOAD_BUTTON_ENABLED)) ?? true;
}

export async function updateIsListItemDownloadButtonEnabled(enabled: boolean) {
  await storage.set(KEY_LIST_ITEM_DOWNLOAD_BUTTON_ENABLED, enabled);
  broadcast(MSG_OPTIONS_UPDATED);
}

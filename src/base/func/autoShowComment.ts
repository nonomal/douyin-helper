import storage from '../storage';
import { broadcast, MSG_OPTIONS_UPDATED } from '../message';

const KEY_ENABLED = 'func:autoShowComment:enabled';

export async function isEnabled() {
  return (await storage.get(KEY_ENABLED)) ?? true;
};

export async function updateIsEnabled(enabled: boolean) {
  await storage.set(KEY_ENABLED, enabled);
  broadcast(MSG_OPTIONS_UPDATED);
};

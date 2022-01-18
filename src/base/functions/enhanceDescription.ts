import storage from '../storage';

const KEY_ENABLED = 'func:enhanceDescription:enabled';

export async function isEnabled() {
  return (await storage.get(KEY_ENABLED)) ?? true;
};

export async function updateStatus(enabled: boolean) {
  return storage.set(KEY_ENABLED, enabled);
};

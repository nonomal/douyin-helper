import storage from '../storage';

const KEY_ENABLED = 'func:autoShowComment:enabled';

export async function isEnabled() {
  return (await storage.get(KEY_ENABLED)) ?? true;
};

export async function updateStatus(enabled: boolean) {
  await storage.set(KEY_ENABLED, enabled);
};

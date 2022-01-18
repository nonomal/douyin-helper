import storage from './storage';

const KEY_USER_LAST_ACTIVE_TIME = 'status:userLastActiveTime';

export async function getUserLastActiveTime(): Promise<Date> {
  return new Date(await storage.get(KEY_USER_LAST_ACTIVE_TIME) || 0);
}

export async function updateUserLastActiveTime(date: Date) {
  return storage.set(KEY_USER_LAST_ACTIVE_TIME, date.toISOString());
}

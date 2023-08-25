import defaultData from '../runtime/config.v2.json';
import storage from './storage';
import { getUserLastActiveTime } from './state';

const REMOTE_DATA_URL = 'https://douyinhelper.com/runtime/config.v2.json';
const MIN_SYNC_INTERVAL = 1000 * 3600;

const KEY_DATA = 'config:data:v2';
const KEY_SYNC_TIME = 'config:syncTime';

let configData: any = defaultData;
let prepared = false;

export async function sync(force?: boolean) {
  try {
    if (!force && !await canSync()) {
      return;
    }

    const res = await fetch(REMOTE_DATA_URL, { cache: 'default' });
    const remoteData = await res.json();

    // 开发环境下以本地配置数据优先，只空跑同步逻辑
    if (process.env.DEV) {
      console.log('[config][sync] got', new Date(), remoteData);
      return;
    }

    configData = remoteData;
    await storage.set(KEY_DATA, remoteData);
    await storage.set(KEY_SYNC_TIME, new Date().toISOString());
  } catch (err) {
    console.error('[config][sync]', err);
  }
}

async function canSync() {
  const syncTime = await storage.get(KEY_SYNC_TIME) as string;
  const now = new Date().getTime();
  if (syncTime) {
    const last = new Date(syncTime).getTime();
    if (now - last < MIN_SYNC_INTERVAL) {
      return false;
    }
  }
  const lastActiveTime = (await getUserLastActiveTime()).getTime();
  if (now - lastActiveTime > MIN_SYNC_INTERVAL) {
    return false;
  }
  return true;
}

export async function get<T=any>(paths: string[]): Promise<T | undefined> {
  if (!prepared) {
    await load();
    prepared = true;
  }
  let curr = configData;
  for (const key of paths) {
    if (!curr) {
      return undefined;
    }
    curr = curr[key];
  }
  return curr;
}

export async function load() {
  try {
    const data = await storage.get(KEY_DATA);
    if (data) {
      configData = data;
    }
  } catch (err) {
    console.error('[config][load]', err);
  }
}

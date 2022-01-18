import { satisfies } from 'semver';

import manifest from '../manifest.json';
import defaultData from '../runtime/config.json';
import storage from './storage';
import { getUserLastActiveTime } from './status';


const REMOTE_DATA_URL = 'https://douyinhelper.com/runtime/config.json';
const MIN_SYNC_INTERVAL = 1000 * 3600;

const KEY_DATA = 'config:data';
const KEY_SYNC_TIME = 'config:syncTime';

let configData: any = defaultData;

const config = {
  sync: syncData,
  get: getValue,
}

export default config;

(async function init() {
  const localData = await storage.get(KEY_DATA);
  configData = localData || configData;
})();

async function syncData(force?: boolean) {
  try {
    if (!force && !await canSync()) {
      return;
    }

    const res = await fetch(REMOTE_DATA_URL, { cache: 'no-cache' });
    const remoteData = await res.json();

    // 开发环境下以本地配置数据优先，只空跑同步逻辑
    if (process.env.DEV) {
      console.log('[syncData] got', new Date(), remoteData);
      return;
    }

    configData = remoteData || configData;
    storage.set(KEY_DATA, configData);
    storage.set(KEY_SYNC_TIME, new Date().toISOString());
  } catch (err) {
    console.error('[syncData]', err);
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

function getValue<T=any>(paths: string[]): T {
  let curr = configData;
  for (const key of paths) {
    if (!curr) {
      return undefined;
    }
    const matched = getMatchKey(key, Object.keys(curr));
    if (!matched) {
      return undefined;
    }
    curr = curr[matched];
  }
  return curr;
}

function getMatchKey(key: string, candidates: string[]): string | undefined {
  candidates.sort().reverse();
  for (const candidate of candidates) {
    const [prefix, range] = candidate.split('|');
    if (prefix !== key) {
      continue;
    }
    if (range) {
      if (satisfies(manifest.version, range)) {
        return candidate;
      }
      continue;
    }
    return candidate;
  }
  return undefined;
}

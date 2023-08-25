export async function toBackground<K extends keyof PayloadMap>(key: K, payload: PayloadMap[K]): Promise<ResultMap[K] | undefined> {
  const msg: Message = { key, payload };
  const res = await chrome.runtime.sendMessage(msg) as Response<ResultMap[K]> | undefined;
  if (res?.error) {
    throw new Error(res.error.message);
  }
  return res?.data;
}

export function broadcast<K extends keyof PayloadMap>(key: K, payload?: PayloadMap[K]) {
  const msg: Message = { key, payload };
  chrome.tabs.query({}, (tabs) => {
    for (const tab of tabs) {
      chrome.tabs.sendMessage(tab.id!, msg).catch(() => {});
    }
  });
  chrome.runtime.sendMessage(msg).catch(() => {});
}

export function addListener<K extends keyof PayloadMap>(key: K, listener: (payload: PayloadMap[K]) => Promise<ResultMap[K]>) {
  chrome.runtime.onMessage.addListener((msg, sender, send) => {
    if (msg.key !== key) {
      send({});
      return;
    }
    listener(msg.payload).then((data) => {
      send({ data });
    }).catch((err) => {
      send({ error: { message: err.message } });
    });
    return true;
  });
}

export interface Message {
  key: string;
  payload: any;
}

export interface Response<T> {
  data?: T;
  error?: MessageError;
}

export interface MessageError {
  message: string;
}

export const MSG_PREPARE_TO_DOWNLOAD = 'MSG_PREPARE_TO_DOWNLOAD';
export const MSG_OPTIONS_UPDATED = 'MSG_OPTIONS_UPDATED';

interface PayloadMap {
  MSG_PREPARE_TO_DOWNLOAD: {
    filter: string;
    filename: string;
  };
  MSG_OPTIONS_UPDATED: void;
}

interface ResultMap {
  MSG_PREPARE_TO_DOWNLOAD: void;
  MSG_OPTIONS_UPDATED: void;
}

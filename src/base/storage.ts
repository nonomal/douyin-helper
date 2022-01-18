const storage = {

  get: (key: string) => {
    return new Promise<any>((resolve => {
      chrome.storage.local.get(key, res => {
        resolve(res[key]);
      });
    }));
  },

  set: (key: string, val: any) => {
    return new Promise<void>((resolve => {
      chrome.storage.local.set({
        [key]: val,
      }, resolve);
    }));
  },

}

export default storage;

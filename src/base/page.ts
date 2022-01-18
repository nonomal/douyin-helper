import config from './config';

export function isDouyinHost(host: string) {
  return /(www)?\.douyin\.com/.test(host);
}

export function isInFeedPage(path: string) {
  return config.get<string[]>(['paths', 'feeds'])?.includes(path);
}

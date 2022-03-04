import config from '../base/config';

export function querySelector(element: Element | Document, configPaths: string[]) {
  const data = config.get<string | string[]>(configPaths) || [];
  const selectors = typeof data === 'string' ? [data] : data;
  for (const selector of selectors) {
    if (!selector) {
      continue;
    }
    const res = element.querySelector(selector);
    if (res) {
      return res;
    }
  }
  return null;
}

export function querySelectorAll(element: Element | Document, configPaths: string[]) {
  const data = config.get<string | string[]>(configPaths) || [];
  const selectors = typeof data === 'string' ? [data] : data;
  for (const selector of selectors) {
    if (!selector) {
      continue;
    }
    const res = element.querySelectorAll(selector);
    if (res.length) {
      return res;
    }
  }
  return [];
}

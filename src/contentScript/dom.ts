import { get } from '../base/config';

export async function querySelector(element: Element | Document, configPaths: string[]) {
  const data = await get<string | string[]>(configPaths) || [];
  return querySelectorFirst(element, data);
}

export function querySelectorFirst(element: Element | Document | null, selectors: string[] | string) {
  if (!element) {
    return null;
  }
  selectors = Array.isArray(selectors) ? selectors : [selectors];
  for (const selector of selectors) {
    if (!selector) {
      continue;
    }
    if (selector === '$') {
      return element;
    }
    const res = element.querySelector(selector);
    if (res) {
      return res;
    }
  }
  return null;
}

export async function querySelectorAll(element: Element | Document, configPaths: string[]) {
  const data = await get<string | string[]>(configPaths) || [];
  return querySelectorAllFirst(element, data);
}

export function querySelectorAllFirst(element: Element | Document | null, selectors: string[] | string) {
  if (!element) {
    return [];
  }
  selectors = Array.isArray(selectors) ? selectors : [selectors];
  for (const selector of selectors) {
    if (!selector) {
      continue;
    }
    if (selector === '$') {
      return [element];
    }
    const res = element.querySelectorAll(selector);
    if (res.length) {
      return res;
    }
  }
  return [];
}

export function closestFirst(element: Element | null, selectors: string[] | string) {
  if (!element) {
    return null;
  }
  selectors = Array.isArray(selectors) ? selectors : [selectors];
  for (const selector of selectors) {
    if (!selector) {
      continue;
    }
    if (selector === '$') {
      return element;
    }
    const res = element.closest(selector);
    if (res) {
      return res;
    }
  }
  return null;
}
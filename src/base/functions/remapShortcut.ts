import storage from '../storage';
import config from '../config';

export interface Shortcut {
  title: string;
  code: string;
}

export interface CustomShortcut {
  code: string;
}

interface KeyInfo {
  key: string;
  keyCode?: number;
  label: string;
}

export type Shortcuts = Record<string, Shortcut>;
export type CustomShortcuts = Record<string, CustomShortcut>;

export const KEY_INFOS: Record<string, KeyInfo> = {
  ...'1234567890'.split('').reduce((m, c) => ({
    ...m,
    [`Digit${c}`]: {
      key: c,
      label: c,
    },
  }), {}),
  ...'abcdefghijklmnopqrstuvwxyz'.split('').reduce((m, c) => ({
    ...m,
    [`Key${c.toUpperCase()}`]: {
      key: c,
      label: c.toUpperCase(),
    },
  }), {}),
  Minus: { key: '-', label: '-' },
  Equal: { key: '=', label: '=' },
  BracketLeft: { key: '[', label: '[' },
  BracketRight: { key: ']', label: ']' },
  Backslash: { key: '\\', label: `\\` },
  Semicolon: { key: ';', label: ';' },
  Quote: { key: `'`, label: `'` },
  Comma: { key: ',', label: ',' },
  Period: { key: '.', label: '.' },
  Slash: { key: '/', label: '/' },
  Space: { key: ' ', keyCode: 32, label: 'Space' },
  ArrowUp: { key: 'ArrowUp', keyCode: 38, label: 'Up' },
  ArrowDown: { key: 'ArrowDown', keyCode: 40, label: 'Down' },
  ArrowLeft: { key: 'ArrowLeft', keyCode: 37, label: 'Left' },
  ArrowRight: { key: 'ArrowRight', keyCode: 39, label: 'Right' },
};

const KEY_ENABLED = 'func:remapShortcut:enabled';
const KEY_CUSTOM = 'func:remapShortcut:custom';

export async function isEnabled() {
  return (await storage.get(KEY_ENABLED)) ?? true;
};

export async function updateStatus(enabled: boolean) {
  return storage.set(KEY_ENABLED, enabled);
};

export async function getCustomShortcuts(): Promise<CustomShortcuts> {
  return (await storage.get(KEY_CUSTOM)) ?? {};
};

export async function getDefaultShortcuts(): Promise<Shortcuts> {
  return config.get<Shortcuts>(['shortcuts']) ?? {};
};

export async function updateShortcut(name: string, shortcut: CustomShortcut) {
  const shortcuts = await getCustomShortcuts();
  if (shortcut.code) {
    for (const key in shortcuts) {
      const { code } = shortcuts[key];
      if (key === name || code !== shortcut.code) {
        continue;
      }
      delete shortcuts[key];
    }
  }
  shortcuts[name] = { code: shortcut.code };
  return storage.set(KEY_CUSTOM, shortcuts);
};

import storage from '../storage';
import { broadcast, MSG_OPTIONS_UPDATED } from '../message';

export interface Pair {
  oldCode: string;
  newCode: string;
}

interface KeyInfo {
  key: string;
  keyCode?: number;
  label: string;
}

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
const KEY_PAIRS = 'func:remapShortcut:pairs';

export async function isEnabled() {
  return (await storage.get(KEY_ENABLED)) ?? true;
};

export async function updateIsEnabled(enabled: boolean) {
  await storage.set(KEY_ENABLED, enabled);
  broadcast(MSG_OPTIONS_UPDATED);
};

export async function getPairs(): Promise<Pair[]> {
  return (await storage.get(KEY_PAIRS)) || [];
};

export async function addPair(pair: Pair) {
  const pairs = await getPairs();
  await savePairs(deConflic([...pairs, pair]));
};

export async function updatePair(index: number, pair: Pair) {
  const pairs = await getPairs();
  if (!pairs[index]) {
    return;
  }
  pairs[index] = pair;
  await savePairs(deConflic(pairs));
};

export async function detelePair(index: number) {
  const pairs = await getPairs();
  await savePairs(pairs.filter((_, i) => i !== index));
};

async function savePairs(pairs: Pair[]) {
  await storage.set(KEY_PAIRS, pairs);
  broadcast(MSG_OPTIONS_UPDATED);
}

function deConflic(pairs: Pair[]) {
  // 旧键 1:n 新键
  const newCodes = new Set<string>();
  const oldCodeNewCodes: Record<string, string> = {};
  const newPairs: Pair[] = [];
  for (const pair of pairs) {
    const p = {...pair};
    if (newCodes.has(p.newCode)) {
      p.newCode = '';
    } else {
      newCodes.add(p.newCode);
    }
    if (oldCodeNewCodes[p.oldCode] === p.newCode) {
      continue;
    }
    oldCodeNewCodes[p.oldCode] = p.newCode;
    newPairs.push(p);
  }
  return newPairs;
}

import { useState, useEffect } from 'react';

import * as func from '../../../base/functions/remapShortcut';

export interface Shortcut {
  name: string;
  title: string;
  defaultCode: string;
  code: string;
}

export const KEY_INFOS = func.KEY_INFOS;

export default function useRemapShortcutFunc() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

  const syncShortcuts = () => Promise.all([
    func.getDefaultShortcuts(),
    func.getCustomShortcuts(),
  ]).then(res => {
    const items = Object.keys(res[0]).reduce<Shortcut[]>((list, name) => {
      const [origin, custom] = [res[0][name], res[1][name]];
      list.push({
        name,
        title: origin.title,
        defaultCode: origin.code,
        code: custom?.code || '',
      });
      return list;
    }, []);
    setShortcuts(items);
  });

  useEffect(() => {
    func.isEnabled().then(setIsEnabled);
    syncShortcuts();
  }, []);

  const updateStatus = async (enabled: boolean) => {
    await func.updateStatus(enabled);
    setIsEnabled(enabled);
  };

  const updateShortcut = async (name: string, shortcut: Shortcut) => {
    await func.updateShortcut(name, shortcut);
    syncShortcuts();
  };

  return {
    isEnabled,
    shortcuts,
    updateStatus,
    updateShortcut,
  };
}

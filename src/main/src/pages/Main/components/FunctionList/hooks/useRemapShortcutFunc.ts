import { useState, useEffect } from 'react';

import * as func from '../../../../../../../base/func/remapShortcut';

export type Pair = func.Pair;
export const KEY_INFOS = func.KEY_INFOS;

export default function useRemapShortcutFunc() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [pairs, setPairs] = useState<Pair[]>([]);

  const syncPairs = async () => {
    setPairs(await func.getPairs());
  };

  useEffect(() => {
    func.isEnabled().then(setIsEnabled);
    syncPairs();
  }, []);

  const updateIsEnabled = async (enabled: boolean) => {
    await func.updateIsEnabled(enabled);
    setIsEnabled(enabled);
  };

  const addPair = async (pair: Pair) => {
    await func.addPair(pair);
    syncPairs();
  };

  const updatePair = async (index: number, pair: Pair) => {
    await func.updatePair(index, pair);
    syncPairs();
  };

  const detelePair = async (index: number) => {
    await func.detelePair(index);
    syncPairs();
  };

  return {
    isEnabled,
    pairs,
    updateIsEnabled,
    addPair,
    updatePair,
    detelePair,
  };
}

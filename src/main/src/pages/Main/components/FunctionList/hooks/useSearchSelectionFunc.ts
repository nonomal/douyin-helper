import { useState, useEffect } from 'react';

import * as func from '../../../../../../../base/func/searchSelection';

export default function useSearchSelectionFunc() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isOpenInNewTab, setIsOpenInNewTab] = useState(true);

  useEffect(() => {
    func.isEnabled().then(setIsEnabled);
    func.isOpenInNewTab().then(setIsOpenInNewTab);
  }, []);

  const updateIsEnabled = async (enabled: boolean) => {
    await func.updateIsEnabled(enabled);
    setIsEnabled(enabled);
  };

  const updateIsOpenInNewTab = async (isOpenInNewTab: boolean) => {
    await func.updateIsOpenInNewTab(isOpenInNewTab);
    setIsOpenInNewTab(isOpenInNewTab);
  };

  return {
    isEnabled,
    updateIsEnabled,
    isOpenInNewTab,
    updateIsOpenInNewTab,
  };
}

import { useState, useEffect } from 'react';

import * as func from '../../../../../../../base/func/downloadVideo';

export default function useDownloadVideoFunc() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isPlayerDownloadButtonEnabled, setIsPlayerDownloadButtonEnabled] = useState(false);
  const [isListItemDownloadButtonEnabled, setIsListItemDownloadButtonEnabled] = useState(false);

  useEffect(() => {
    func.isEnabled().then(setIsEnabled);
    func.isPlayerDownloadButtonEnabled().then(setIsPlayerDownloadButtonEnabled);
    func.isListItemDownloadButtonEnabled().then(setIsListItemDownloadButtonEnabled);
  }, []);

  const updateIsEnabled = async (enabled: boolean) => {
    await func.updateIsEnabled(enabled);
    setIsEnabled(enabled);
  };

  const updateIsPlayerDownloadButtonEnabled = async (enabled: boolean) => {
    await func.updateIsPlayerDownloadButtonEnabled(enabled);
    setIsPlayerDownloadButtonEnabled(enabled);
  };

  const updateIsListItemDownloadButtonEnabled = async (enabled: boolean) => {
    await func.updateIsListItemDownloadButtonEnabled(enabled);
    setIsListItemDownloadButtonEnabled(enabled);
  };

  return {
    isEnabled,
    updateIsEnabled,
    isPlayerDownloadButtonEnabled,
    updateIsPlayerDownloadButtonEnabled,
    isListItemDownloadButtonEnabled,
    updateIsListItemDownloadButtonEnabled,
  };
}

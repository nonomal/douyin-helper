import { useState, useEffect } from 'react';

import * as func from '../../../base/functions/showPublishTime';

export default function useShowPublishTimeFunc() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    func.isEnabled().then(setIsEnabled);
  }, []);

  const updateStatus = async (enabled: boolean) => {
    await func.updateStatus(enabled);
    setIsEnabled(enabled);
  };

  return {
    isEnabled,
    updateStatus,
  };
}

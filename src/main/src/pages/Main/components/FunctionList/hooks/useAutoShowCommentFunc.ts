import { useState, useEffect } from 'react';

import * as func from '../../../../../../../base/func/autoShowComment';

export default function useAutoShowCommentFunc() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    func.isEnabled().then(setIsEnabled);
  }, []);

  const updateIsEnabled = async (enabled: boolean) => {
    await func.updateIsEnabled(enabled);
    setIsEnabled(enabled);
  };

  return {
    isEnabled,
    updateIsEnabled,
  };
}

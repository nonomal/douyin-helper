import { Pair, KEY_INFOS, isEnabled, getPairs } from '../../base/func/remapShortcut';
import { addListener, MSG_OPTIONS_UPDATED } from '../../base/message';

let isEnabledNow = false;
let pairs: Pair[] = [];

export function init() {
  window.addEventListener('keydown', (e) => {
    if (!isEnabledNow || !e.isTrusted) {
      return;
    }
    const { code, shiftKey, ctrlKey, metaKey, altKey, target } = e;
    if (shiftKey || ctrlKey || metaKey || altKey) {
      return;
    }
    if (
      (target as HTMLElement).contentEditable === 'true' ||
      (target as HTMLElement).nodeName === 'INPUT'
    ) {
      return;
    }
    const { oldCode } = pairs.find(pair => pair.newCode === code) || {};
    if (!oldCode) {
      return;
    }
    const info = KEY_INFOS[oldCode];
    document.dispatchEvent(new KeyboardEvent('keydown', {
      key: info.key,
      code: oldCode,
      keyCode: info.keyCode,
    }));
    e.stopPropagation();
    e.preventDefault();
  }, true);

  addListener(MSG_OPTIONS_UPDATED, sync);
  sync();
}

async function sync() {
  isEnabledNow = await isEnabled();
  pairs = await getPairs();
}
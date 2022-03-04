import {
  Pair,
  KEY_INFOS,
  isEnabled,
  getPairs,
} from '../../base/functions/remapShortcut';

let isEnabledNow = false;
let pairs: Pair[] = [];

export async function start() {
  document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.addEventListener('keydown', event => {
      if (!isEnabledNow || !event.isTrusted) {
        return;
      }
      const { code, shiftKey, ctrlKey, metaKey, altKey, target } = event;
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
      event.stopPropagation();
      event.preventDefault();
    }, true);
  });
}

export async function execute() {
  isEnabled().then(v => isEnabledNow = v);
  getPairs().then(v => pairs = v);
}

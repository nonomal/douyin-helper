import {
  KEY_INFOS,
  isEnabled,
  getDefaultShortcuts,
  getCustomShortcuts,
} from '../../base/functions/remapShortcut';

let isEnabledNow = false;
let codeMap: Record<string, string> = {};

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
      if (!codeMap[code]) {
        return;
      }
      const info = KEY_INFOS[codeMap[code]];
      document.dispatchEvent(new KeyboardEvent('keydown', {
        key: info.key,
        code: codeMap[code],
        keyCode: info.keyCode,
      }));
      event.stopPropagation();
      event.preventDefault();
    }, true);
  });
}

export async function execute() {
  const res = await Promise.all([
    isEnabled(),
    getDefaultShortcuts(),
    getCustomShortcuts(),
  ])
  isEnabledNow = res[0];
  const newCodeMap: Record<string, string> = {};
  for (const key in res[1]) {
    const defaultCode = res[1][key].code;
    const customCode = res[2][key]?.code;
    if (defaultCode && customCode && defaultCode !== customCode) {
      newCodeMap[customCode] = defaultCode;
    }
  }
  codeMap = newCodeMap;
}

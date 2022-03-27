import {
  Pair,
  KEY_INFOS,
  isEnabled,
  getPairs,
} from '../../base/functions/remapShortcut';
import Func from './Func';

export default class RemapShortcutFunc extends Func {

  isEnabledNow = false;
  pairs: Pair[] = [];

  async isEnabled() {
    return await isEnabled();
  }

  async start() {
    document.addEventListener('DOMContentLoaded', () => {
      document.documentElement.addEventListener('keydown', event => {
        if (!this.isEnabledNow || !event.isTrusted) {
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
        const { oldCode } = this.pairs.find(pair => pair.newCode === code) || {};
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
  
  async execute() {
    isEnabled().then(v => {
      this.isEnabledNow = v && this.isInPages('remapShortcutsIn');
    });
    getPairs().then(v => this.pairs = v);
  }

}


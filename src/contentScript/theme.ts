import { Theme, updateTheme } from '../base/theme';
import { querySelector } from './dom';

let currentTheme: Theme | null = null;

export function init() {
  setInterval(() => {
    handleMutation();
  }, 3000);
}

function handleMutation() {
  const isDark = !!querySelector(document, ['theme', 'darkSelectors']);
  const theme = isDark ? Theme.Dark : Theme.Light;
  if (currentTheme === theme) {
    return;
  }
  currentTheme = theme;
  updateTheme(theme);
}

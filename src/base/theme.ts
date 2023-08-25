import storage from './storage';

export enum Theme {
  Dark = 'dark',
  Light = 'light',
};

const KEY_THEME = 'theme';

export async function getTheme(): Promise<Theme> {
  return await storage.get(KEY_THEME) || Theme.Dark;
}

export async function updateTheme(theme: Theme) {
  return storage.set(KEY_THEME, theme);
}

export async function isDarkTheme(): Promise<boolean> {
  return await getTheme() !== Theme.Light;
}

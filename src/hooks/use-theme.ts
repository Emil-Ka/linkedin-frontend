import { useState, useEffect } from 'react';

import { storage } from '../models/storage';

type ThemeType = 'light' | 'dark';
const THEME_LIST: Record<string, ThemeType> = {
  LIGHT: 'light',
  DARK: 'dark',
};
const THEME_KEY = 'theme';
const isThemeType = (theme: string): theme is ThemeType => ['light', 'dark'].includes(theme);

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const theme = storage.get(THEME_KEY);

    if (theme && isThemeType(theme)) {
      return theme;
    }

    storage.set(THEME_KEY, THEME_LIST.LIGHT);

    return THEME_LIST.LIGHT;
  });

  useEffect(() => {
    const root = document.querySelector(':root');

    if (!root) {
      throw new Error('Element with id root not found');
    }

    root.setAttribute('data-theme', theme);
    storage.set(THEME_KEY, theme);
  }, [theme]);

  return { theme, setTheme };
};

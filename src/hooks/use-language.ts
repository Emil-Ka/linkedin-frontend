import { useState, useEffect } from 'react';
import { changeLanguage } from 'i18next';

import { storage } from '../models/storage';

type LangType = 'ru' | 'en';

export const LANG_KEY = 'lang';
export const LANG_LIST: Record<string, LangType> = {
  RU: 'ru',
  EN: 'en',
};

const isLangType = (lang: string): lang is LangType => ['ru', 'en'].includes(lang);

export const useLanguage = () => {
  const [lang, setLang] = useState<LangType>(() => {
    const lang = storage.get(LANG_KEY);

    if (lang && isLangType(lang)) {
      return lang;
    }

    storage.set(LANG_KEY, LANG_LIST.RU);

    return LANG_LIST.RU;
  });

  useEffect(() => {
    storage.set(LANG_KEY, lang);
    changeLanguage(lang);
  }, [lang]);

  return { lang, setLang };
};

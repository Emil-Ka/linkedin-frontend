import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { storage } from 'models/storage';
import { LANG_LIST, LANG_KEY } from 'shared/hooks/use-language';

import { en } from './en';
import { ru } from './ru';

i18n.use(initReactI18next).init({
  resources: {
    [LANG_LIST.EN]: {
      translations: en,
    },
    [LANG_LIST.RU]: {
      translations: ru,
    },
  },
  fallbackLng: LANG_LIST.EN,
  debug: true,
  lng: storage.get(LANG_KEY) || LANG_LIST.RU,

  ns: ['translations'],
  defaultNS: 'translations',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

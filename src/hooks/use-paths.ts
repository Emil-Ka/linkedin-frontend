import { useTranslation } from 'react-i18next';

import { PATHS } from '../constants/paths';

interface ILinks {
  path: string;
  label: string;
  show: ('header' | 'footer')[];
  isAuth: boolean[];
}

export const usePaths = (): ILinks[] => {
  const { t } = useTranslation();

  return [
    {
      path: PATHS.MAIN,
      label: t('links.main'),
      show: ['footer'],
      isAuth: [true, false],
    },
    {
      path: PATHS.LOGIN,
      label: t('links.login'),
      show: ['header', 'footer'],
      isAuth: [false],
    },
    {
      path: PATHS.REGISTRATION,
      label: t('links.registration'),
      show: ['header', 'footer'],
      isAuth: [false],
    },
    {
      path: PATHS.CONTACTS,
      label: t('links.contacts'),
      show: ['header', 'footer'],
      isAuth: [true, false],
    },
    {
      path: PATHS.ABOUT,
      label: t('links.about'),
      show: ['header', 'footer'],
      isAuth: [true, false],
    },
    {
      path: PATHS.VACANCIES,
      label: t('links.vacancies'),
      show: ['header'],
      isAuth: [true],
    },
    {
      path: PATHS.TESTS,
      label: t('links.tests'),
      show: ['header'],
      isAuth: [true],
    },
  ];
};

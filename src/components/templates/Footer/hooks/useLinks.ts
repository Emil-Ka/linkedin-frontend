import { useTranslation } from 'react-i18next';

interface ILinks {
  path: string;
  label: string;
}

export const useLinks = (): ILinks[] => {
  const { t } = useTranslation();

  return [
    {
      path: '/',
      label: t('links.main'),
    },
    {
      path: '/login',
      label: t('links.login'),
    },
    {
      path: '/registration',
      label: t('links.registration'),
    },
    {
      path: '/contacts',
      label: t('links.contacts'),
    },
    {
      path: '/about',
      label: t('links.about'),
    },
  ];
};

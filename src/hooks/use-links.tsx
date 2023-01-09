import React from 'react';
import { useTranslation } from 'react-i18next';

import { useLocation } from 'react-router-dom';
import { Avatar } from '../components';
import { PATHS } from '../constants/paths';
import { useGetUser } from './use-get-user';
import { USER_ROLE } from '../redux/types/user';

type AreaType = 'header' | 'footer';

interface ILink {
  path: string;
  label?: string | null;
  Component?: JSX.Element;
  show: AreaType[];
  isAuth: boolean[];
  excludeShow?: PATHS[];
  role?: USER_ROLE[];
}

type IsShowType = (area: AreaType, link: ILink) => boolean;

interface IUseLinksReturn {
  links: ILink[];
  isShow: IsShowType;
  isLoading: boolean;
}

export const useLinks = (): IUseLinksReturn => {
  const { t } = useTranslation();
  const { user, isLoading } = useGetUser();
  const location = useLocation();

  const isShow: IsShowType = (area, link) => {
    let condition = link.show.includes(area) && link.isAuth.includes(!!user);

    if (link.excludeShow?.length) {
      condition = condition && !link.excludeShow.includes(location.pathname as PATHS);
    }

    if (link.role && user) {
      condition = condition && link.role.includes(user.role);
    }

    return condition;
  };

  const links: ILink[] = [
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
      show: ['footer'],
      isAuth: [true, false],
    },
    {
      path: PATHS.ABOUT,
      label: t('links.about'),
      show: ['footer'],
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
    {
      path: PATHS.ADMIN,
      label: t('links.admin'),
      show: ['header'],
      isAuth: [true],
      role: [USER_ROLE.ADMIN],
    },
    {
      path: PATHS.ACCOUNT,
      Component: <Avatar to={PATHS.ACCOUNT} />,
      show: ['header'],
      isAuth: [true],
      excludeShow: [PATHS.ACCOUNT, PATHS.LOGIN, PATHS.REGISTRATION],
    },
  ];

  return { links, isShow, isLoading };
};

import React from 'react';
import { useTranslation } from 'react-i18next';

import { useLocation } from 'react-router-dom';
import { Avatar } from '../components';
import { PATHS } from '../constants/paths';
import { IUser } from '../redux/types/user';
import { useTypedSelector } from './use-typed-selector';

type AreaType = 'header' | 'footer';

interface ILink {
  path: string;
  label?: string | null;
  Component?: JSX.Element;
  show: AreaType[];
  isAuth: boolean[];
  excludeShow?: PATHS[];
}

type IsShowType = (area: AreaType, link: ILink) => boolean;

interface IUseLinksReturn {
  links: ILink[];
  isShow: IsShowType;
}

export const useLinks = (): IUseLinksReturn => {
  const { t } = useTranslation();
  const { user } = useTypedSelector((state) => state.user);
  const location = useLocation();

  const isShow: IsShowType = (area, link): boolean => {
    let condition = link.show.includes(area) && link.isAuth.includes(!!user);

    if (link.excludeShow?.length) {
      condition = condition && !link.excludeShow.includes(location.pathname as PATHS);
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
    {
      path: PATHS.ACCOUNT,
      Component: <Avatar to={PATHS.ACCOUNT} />,
      show: ['header'],
      isAuth: [true],
      excludeShow: [PATHS.ACCOUNT],
    },
  ];

  return { links, isShow };
};

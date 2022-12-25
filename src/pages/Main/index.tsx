import React, { FC } from 'react';

import { useGetUser } from '../../hooks';
import { Page } from '../../components';

export const Main: FC = () => {
  const { user } = useGetUser();

  console.log('main');

  return (
    <Page>
      Главная
      {user?.email}
      {user?.first_name}
      {user?.last_name}
    </Page>
  );
};

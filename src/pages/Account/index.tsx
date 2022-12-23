import React, { useEffect } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';

import { Card, Container, Page } from '../../components';
import { useTypedSelector, useTypedDispatch } from '../../hooks';
import { BACKEND_URL } from '../../config/backend.config';
import { useGetUserQuery } from '../../redux/api/user';
import * as userSlice from '../../redux/slices/user';

import profileFont from './assets/preview-font.jpg';

import styles from './account.module.scss';

export const Account = () => {
  const dispatch = useTypedDispatch();
  const { user } = useTypedSelector((state) => state.user);
  const { setUser } = bindActionCreators({ setUser: userSlice.setUser }, dispatch);
  const { data, error, isLoading } = useGetUserQuery();

  useEffect(() => {
    if (data) {
      setUser({ user: data });
    }
  }, [data]);

  return user && (
    <Page>
      <Container className={styles.content}>
        <Card className={styles.preview}>
          <img
            src={profileFont}
            alt="preview-img"
            className={styles.previewImg}
          />
          <img
            src={user.photo ? `${BACKEND_URL.base}${user.photo}` : ''}
            alt={`${user.first_name}${user.last_name}`}
            className={styles.avatarImg}
          />
          <div className={styles.bio}>
            <h1 className={styles.name}>
              {user.first_name}
              {' '}
              {user.last_name}
            </h1>
            <p className={styles.desc}>{user.bio}</p>
          </div>
        </Card>
      </Container>
    </Page>
  );
};

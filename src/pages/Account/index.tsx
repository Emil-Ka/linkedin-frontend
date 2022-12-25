import React from 'react';

import { Card, Container, Page } from '../../components';
import { useGetUser } from '../../hooks';
import { BACKEND_URL } from '../../config/backend.config';

import peviewImg from './assets/preview.jpg';

import styles from './account.module.scss';

export const Account = () => {
  const { user } = useGetUser();

  return user && (
    <Page>
      <Container className={styles.content}>
        <Card className={styles.preview}>
          <img
            src={peviewImg}
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

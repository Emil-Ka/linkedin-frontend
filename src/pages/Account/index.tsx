import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Card, Container, CustomLink, Page,
} from '../../components';
import { useGetUser } from '../../hooks';
import { BACKEND_URL } from '../../config/backend.config';
import { useGetResumesQuery } from '../../redux/api/resume';

import peviewImg from './assets/preview.jpg';

import styles from './account.module.scss';
import { priceRu } from '../../services';
import { PATHS } from '../../constants/paths';

export const Account = () => {
  const { t } = useTranslation();
  const { user } = useGetUser();
  const { data: resumes, isLoading } = useGetResumesQuery();

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
        {resumes?.length ? (
          <Card className={styles.resume}>
            <h2 className={styles.resumeLabel}>{t('account.titles.resumes')}</h2>
            {resumes && resumes.map(({
              id, title, text, salary,
            }) => (
              <Card key={id} className={styles.resumeItem}>
                <h3 className={styles.resumeTitle}>{title}</h3>
                <b className={styles.resumeSalary}>{salary && priceRu(salary)}</b>
                <CustomLink
                  className={styles.resumeBtn}
                  type="button"
                  to={`${PATHS.RESUME}/${id}`}
                >
                  {t('account.links.more')}
                </CustomLink>
              </Card>
            ))}
            <CustomLink
              className={styles.resumeAdd}
              type="button"
              to={PATHS.ADD_RESUME}
            >
              {t('account.links.add_resume')}
            </CustomLink>
          </Card>
        ) : null}
      </Container>
    </Page>
  );
};

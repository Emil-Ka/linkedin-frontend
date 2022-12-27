import React from 'react';
import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { Card, Container, Page } from '../../components';
import { useGetTestsQuery } from '../../redux/api/test';
import { PATHS } from '../../constants/paths';

import styles from './tests-page.module.scss';

export const TestsPage = () => {
  const { data } = useGetTestsQuery();
  const { t } = useTranslation();

  return (
    <Page>
      <Container className={styles.content}>
        <h1 className={styles.title}>
          {t('tests.title')}
        </h1>
        <div className={styles.tests}>
          {data?.map(({
            id, name, cover, desc,
          }) => (
            <Link
              key={id}
              to={`${PATHS.TESTS}/${id}`}
              className={styles.link}
            >
              <Card className={styles.card}>
                <img className={styles.img} src={cover} alt={name} />
                <h2 className={styles.name}>{name}</h2>
                <p className={styles.desc}>{desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </Page>
  );
};

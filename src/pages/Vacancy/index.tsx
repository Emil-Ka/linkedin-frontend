import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Page, Card } from '../../components';
import { useLazyGetVacancyQuery } from '../../redux/api/vacancy';
import { priceRu } from '../../shared/lib';
import { IVacancyParams } from './types';

import styles from './vacancy.module.scss';

export const Vacancy = () => {
  const { id } = useParams<IVacancyParams>();
  const [getVacancy, { data: vacancy, isLoading }] = useLazyGetVacancyQuery();

  useEffect(() => {
    if (id) {
      getVacancy({ id: parseInt(id, 10) });
    }
  }, [id]);

  return (
    <Page>
      <Container className={styles.content}>
        {vacancy && (
          <Card className={styles.card}>
            <div className={styles.header}>
              <h1 className={styles.title}>{vacancy.title}</h1>
              <b className={styles.salary}>{priceRu(vacancy.salary)}</b>
            </div>
            <h2 className={styles.companyName}>{vacancy.company_name}</h2>
            <p className={styles.desc}>{vacancy.text}</p>
          </Card>
        )}
      </Container>
    </Page>
  );
};

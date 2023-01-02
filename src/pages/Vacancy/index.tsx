import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Container, Page, Card } from '../../components';
import { useGetVacancyQuery } from '../../redux/api/vacancy';
import { IVacancyParams } from '../../redux/types/vacancies';

import styles from './vacancy.module.scss';
import { priceRu } from '../../services';

export const Vacancy = () => {
  const { id } = useParams<IVacancyParams>();
  const { data, isLoading } = useGetVacancyQuery({ id });

  return (
    <Page>
      <Container className={styles.content}>
        <Card className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>{data?.title}</h1>
            <b className={styles.salary}>{data?.salary && priceRu(data.salary)}</b>
          </div>
          <h2 className={styles.companyName}>{data?.company_name}</h2>
          <p className={styles.desc}>{data?.text}</p>
        </Card>
      </Container>
    </Page>
  );
};

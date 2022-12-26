import React, { useId, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  Button, Card, Container, CustomLink, Page,
} from '../../components';
import { useGetUser } from '../../hooks';
import { useGetVacanciesQuery } from '../../redux/api/vacancy';

import styles from './vacancies.module.scss';
import { USER_ROLE } from '../../redux/types/user';
import { PATHS } from '../../constants/paths';
import { priceRu } from '../../services';

export const Vacancies = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const { user, isLoading: isUserLoading } = useGetUser();
  const { data: vacancies, isLoading: isVacanciesLoading } = useGetVacanciesQuery({ page, pageSize });
  const countPage = Math.ceil((vacancies?.count || pageSize) / pageSize);
  const containerRef = useRef<HTMLDivElement>(null);

  const changePage = (page: number) => {
    setPage(() => page);
    containerRef.current?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  };

  return (
    <Page>
      <Container
        ref={containerRef}
        className={styles.content}
      >
        <div className={styles.header}>
          {(user?.role || USER_ROLE.USER) >= USER_ROLE.HR && (
          <CustomLink
            to={PATHS.ADD_VACANCY}
            type="button"
            className={styles.addVacancy}
          >
            {t('vacancies.buttons.addVacancy')}
          </CustomLink>
          )}
        </div>
        <ul className={styles.list}>
          {vacancies?.results.map(({
            id, title, salary, company_name,
          }) => (
            <li className={styles.item} key={id}>
              <Link to={id.toString()}>
                <Card className={styles.card}>
                  <h2 className={styles.vacancyTitle}>{title}</h2>
                  <h3 className={styles.companyName}>{company_name}</h3>
                  <b className={styles.salary}>{priceRu(salary)}</b>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.pagination}>
          {[...Array(countPage)].map((item, index) => (
            <Button
              customType="pagination"
              selected={page === index + 1}
              key={uuid()}
              onClick={() => changePage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </Container>
    </Page>
  );
};

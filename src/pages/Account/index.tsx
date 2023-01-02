import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';
import {
  Card, Container, CustomLink, Page,
} from '../../components';
import { useGetUser } from '../../hooks';
import { BACKEND_URL } from '../../config/backend.config';
import { useGetResumesQuery } from '../../redux/api/resume';
import { priceRu } from '../../services';
import { PATHS } from '../../constants/paths';
import { useLazyGetPassedTestsQuery } from '../../redux/api/passed-test';
import { useLazyGetTestQuery } from '../../redux/api/test';
import { ITests } from './types';
import peviewImg from './assets/preview.jpg';
import PlusIcon from './assets/plus.svg';

import styles from './account.module.scss';
import { resetCacheByTag } from '../../redux/api';

export const Account = () => {
  const { t } = useTranslation();
  const { user } = useGetUser();

  const [tests, setTests] = useState<ITests[]>([]);

  const { data: resumes } = useGetResumesQuery();

  const [getPassedTests, { data: passedTests }] = useLazyGetPassedTestsQuery();
  const [getTest] = useLazyGetTestQuery();

  useEffect(() => {
    resetCacheByTag('PassedTests');
    getPassedTests();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (passedTests) {
      passedTests.forEach(async (passedTest) => {
        const test = await getTest({ id: passedTest.test }).unwrap();

        setTests((prev) => ([
          ...prev,
          {
            passedTest,
            test,
          },
        ]));
      });
    }
    // eslint-disable-next-line
  }, [passedTests]);

  return (
    user && (
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
          {resumes && (
            <Card className={styles.resume}>
              <h2 className={styles.label}>
                {t('account.titles.resumes')}
              </h2>
              <div className={styles.list}>
                {resumes.map(({ id, title, salary }) => (
                  <Card key={id} className={styles.card}>
                    <h3 className={styles.resumeTitle}>{title}</h3>
                    <b className={styles.resumeSalary}>
                      {salary ? priceRu(salary) : t('account.text.salary')}
                    </b>
                    <CustomLink
                      className={styles.resumeBtn}
                      type="button"
                      to={`${PATHS.RESUME}/${id}`}
                    >
                      {t('account.links.more')}
                    </CustomLink>
                  </Card>
                ))}
                <Link to={PATHS.ADD_RESUME}>
                  <Card className={styles.resumeAdd}>
                    <PlusIcon className={styles.plusIcon} />
                    <span>
                      {t('account.links.add_resume')}
                    </span>
                  </Card>
                </Link>
              </div>
            </Card>
          )}
          {tests.length && (
            <Card className={styles.passedTests}>
              <h2 className={styles.label}>
                {t('account.titles.passed_tests')}
              </h2>
              <div className={styles.list}>
                {tests.map(({ test, passedTest }) => (
                  <Card key={passedTest.id} className={styles.card}>
                    <img
                      src={test.cover}
                      alt={test.name}
                      className={styles.testCover}
                    />
                    <h3 className={styles.testTitle}>
                      {test.name}
                    </h3>
                    <span className={styles.result}>
                      {t('account.labels.result')}
                      {' '}
                      {passedTest.result}
                      {' '}
                      %
                    </span>
                    <CustomLink
                      to={`${PATHS.RESULT}/${test.id}`}
                      type="button"
                      className={styles.testBtn}
                    >
                      {t('account.links.show_result')}
                    </CustomLink>
                  </Card>
                ))}
              </div>
            </Card>
          )}
        </Container>
      </Page>
    )
  );
};

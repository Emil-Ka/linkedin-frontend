import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Card, Container, Page } from '../../components';
import { ResumeParams } from './types';
import { useLazyGetResumeQuery } from '../../redux/api/resume';
import { priceRu } from '../../services';

import styles from './resume.module.scss';

export const Resume = () => {
  const { t } = useTranslation();
  const { id } = useParams<ResumeParams>();

  const [getResume, { data: resume, isLoading }] = useLazyGetResumeQuery();

  useEffect(() => {
    if (id) {
      getResume({ id: parseInt(id, 10) });
    }
  }, [id]);

  return (
    <Page>
      <Container className={styles.content}>
        {resume && (
          <Card className={styles.card}>
            <div className={styles.header}>
              <h1 className={styles.title}>{resume.title}</h1>
              <b className={styles.salary}>
                {resume.salary ? priceRu(resume.salary) : t('utils.resume')}
              </b>
            </div>
            <p className={styles.desc}>{resume.text}</p>
          </Card>
        )}
      </Container>
    </Page>
  );
};

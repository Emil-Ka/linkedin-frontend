import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { bindActionCreators } from '@reduxjs/toolkit';

import { Page, Error, Input, Button, Container, Textarea } from '../../components';
import { instanceOfIErrorResponse } from '../../redux/types/user';
import { setCookie } from '../../models/cookie';
import { PATHS } from '../../shared/config/paths';

import styles from './add-vacancy.module.scss';
import { IVacancyRequest } from '../../redux/types/vacancies';
import { useAddVacancyMutation } from '../../redux/api/vacancy';

export const AddVacancy = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string[] | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [addVacancy, { isLoading, error: errorResponse }] = useAddVacancyMutation();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<IVacancyRequest>({
    mode: 'all',
  });

  const onSubmit = async (data: IVacancyRequest) => {
    try {
      await addVacancy(data).unwrap();
      setRedirect(true);
    } catch (err) {
      setError((prev) => prev && [...prev, 'Error']);
    }
  };

  if (redirect) {
    return <Navigate to={PATHS.VACANCIES} />;
  }
  return (
    <Page className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>{t('add_vacancy.title')}</h1>
        {error && <Error errors={error} />}
        <Input
          label={t('add_vacancy.labels.title')!}
          placeholder={t('add_vacancy.placeholders.title')!}
          error={errors.title}
          {...register('title', {
            required: t('utils.errors.required')!,
          })}
        />
        <Input
          label={t('add_vacancy.labels.company_name')!}
          placeholder={t('add_vacancy.placeholders.company_name')!}
          error={errors.company_name}
          {...register('company_name', {
            required: t('utils.errors.required')!,
          })}
        />
        <Input
          type="number"
          label={t('add_vacancy.labels.salary')!}
          placeholder={t('add_vacancy.placeholders.salary')!}
          error={errors.salary}
          {...register('salary', {
            required: t('utils.errors.required')!,
          })}
        />
        <Textarea
          label={t('add_vacancy.labels.text')!}
          error={errors.text}
          {...register('text', {
            required: t('utils.errors.required')!,
          })}
        />
        <Button type="submit" disabled={!isValid}>
          {t('add_vacancy.buttons.submit')}
        </Button>
      </form>
    </Page>
  );
};

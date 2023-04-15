import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { Button, Container, FileInput, Input, Page, Textarea } from '../../components';
import { useGetUser } from '../../shared/hooks';
import { USER_ROLE } from '../../redux/types/user';
import { PATHS } from '../../shared/config/paths';
import { ITestData } from './types';
import { useAddTestMutation } from '../../redux/api/test';

import styles from './add-test.module.scss';
import { convertData } from '../../shared/lib';

export const AddTest = () => {
  const { t } = useTranslation();
  const { user, isLoading } = useGetUser({
    role: USER_ROLE.ADMIN,
  });

  const [addTest, { error, isLoading: isAddTestLoading }] = useAddTestMutation();

  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm<ITestData>({
    mode: 'all',
  });

  const onSubmit = async (data: ITestData) => {
    await addTest(convertData.addTest(data)).unwrap();
    reset();
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Page className={styles.page}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{t('add_test.title')}</h1>
        <Input
          label={t('add_test.labels.name')!}
          placeholder={t('add_test.placeholders.name')!}
          // TODO
          // @ts-ignore
          {...register('name', {
            required: t('utils.errors.required')!,
          })}
          error={errors.name}
        />
        <Textarea
          label={t('add_test.labels.desc')!}
          placeholder={t('add_test.placeholders.desc')!}
          {...register('desc', {
            required: t('utils.errors.required')!,
          })}
          error={errors.desc}
        />
        <Input
          label={t('add_test.labels.time')!}
          type="number"
          placeholder={t('add_test.placeholders.time')!}
          {...register('time', {
            required: t('utils.errors.required')!,
          })}
          error={errors.time}
        />
        <FileInput
          accept="image/png, image/jpeg"
          label={t('add_test.labels.images')!}
          {...register('cover', {
            required: t('utils.errors.required')!,
          })}
          error={errors.cover}
        />
        <Button type="submit" disabled={!isValid} loading={isAddTestLoading}>
          {t('add_test.buttons.submit')}
        </Button>
      </form>
    </Page>
  );
};

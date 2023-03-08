import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { Button, Input, Notification, Page, Textarea } from '../../components';
import { IResumeRequest } from '../../redux/types/resume';
import { useAddResumeMutation } from '../../redux/api/resume';

import styles from './add-resume.module.scss';

export const AddResume = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IResumeRequest>({
    mode: 'all',
  });

  const [addResume, { isSuccess, isLoading }] = useAddResumeMutation();

  const onSubmit = (data: IResumeRequest) => {
    addResume(data);
    reset();
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <Page className={styles.page}>
      <Notification isVisible={isSuccess} status="success">
        {t('add_resume.notifications.success')!}
      </Notification>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{t('add_resume.title')}</h1>
        <Input
          label={t('add_resume.labels.title')}
          placeholder={t('add_resume.placeholders.title')!}
          {...register('title', {
            required: t('utils.errors.required')!,
          })}
          error={errors.title}
        />
        <Textarea
          label={t('add_resume.labels.text')}
          {...register('text', {
            required: t('utils.errors.required')!,
          })}
          error={errors.text}
        />
        <Input
          type="number"
          label={t('add_resume.labels.salary')}
          placeholder={t('add_resume.placeholders.salary')!}
          {...register('salary', {
            required: t('utils.errors.required')!,
          })}
          error={errors.salary}
        />
        <Button disabled={!isValid} type="submit">
          {t('add_resume.buttons.submit')}
        </Button>
      </form>
    </Page>
  );
};

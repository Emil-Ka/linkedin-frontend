import React, { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Button, Input, CheckBox, Page,
} from '../../components';
import { useRegisterMutation } from '../../redux/api/user';
import { IRegistrationInitData } from './types';

import styles from './registration.module.scss';
import { convertApiData } from '../../services/convert-api-data';

export const initRegistrationState: IRegistrationInitData = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  isHr: false,
};

export const Registration = () => {
  const [registration, {
    data, isLoading, isError, error,
  }] = useRegisterMutation();

  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IRegistrationInitData>({
    mode: 'onBlur',
  });

  useEffect(() => {
    console.log('loading', isLoading);
    console.log('isError', isError);
    console.log('error', error);
    console.log('data', data);
  }, [data, error, isLoading, isError]);

  const onSubmit = async (data: IRegistrationInitData) => {
    const payload = await registration(convertApiData.registration(data)).unwrap();
    console.log('payload', payload);
    console.log('data', data);
    reset();
  };

  return (
    <Page className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={t('registration.labels.firstName') || 'Имя'}
          placeholder={t('registration.placeholders.firstName') || 'Иван'}
          error={errors.first_name}
          {...register('first_name', {
            required: t('registration.error') || 'Ошибка',
          })}
        />
        <Input
          label={t('registration.labels.lastName') || 'Фамилия'}
          placeholder={t('registration.placeholders.lastName') || 'Иванов'}
          error={errors.last_name}
          {...register('last_name', {
            required: t('registration.error') || 'Ошибка',
          })}
        />
        <Input
          type="email"
          label={t('registration.labels.email') || 'Email'}
          placeholder={t('registration.placeholders.email') || 'ivan@google.com'}
          error={errors.email}
          {...register('email', {
            required: t('registration.error') || 'Ошибка',
          })}
        />
        <Input
          type="password"
          label={t('registration.labels.password') || 'Пароль'}
          error={errors.password}
          {...register('password', {
            required: t('registration.error') || 'Ошибка',
          })}
        />
        <CheckBox
          label={t('registration.labels.role') || 'Хотите зарегестрироваться как HR?'}
          {...register('isHr')}
        />
        <Button label={t('registration.buttons.submit')} type="submit" />
      </form>
    </Page>
  );
};

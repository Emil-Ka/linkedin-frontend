import React, { FC, useEffect, useState } from 'react';
import decode from 'jwt-decode';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { bindActionCreators } from '@reduxjs/toolkit';

import {
  Button, Input, CheckBox, Page,
} from '../../components';
import { useRegisterMutation, useGetUserQuery } from '../../redux/api/user';
import { IRegistrationInitData } from './types';
import { convertApiData } from '../../services/convert-api-data';
import { setUser, setToken } from '../../redux/slices/user-slice';
import { IErrorResponse, instanceOfIErrorResponse } from '../../redux/types/user-slice';
import { useTypedDispatch } from '../../hooks';

import styles from './registration.module.scss';

export const initRegistrationState: IRegistrationInitData = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  isHr: false,
};

export const Registration = () => {
  const dispatch = useTypedDispatch();
  const [error, setError] = useState<string[] | null>(null);

  const { setToken: changeToken, setUser: changeUser } = bindActionCreators(
    { setUser, setToken },
    dispatch,
  );

  const [registration, {
    isLoading, isError, error: errorResponse,
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
    if (errorResponse && instanceOfIErrorResponse(errorResponse)) {
      const newErrors: string[] = [];

      Object.keys(errorResponse.data).forEach((key) => {
        newErrors.push(...errorResponse.data[key]);
      });

      setError(newErrors);
    }
  }, [errorResponse]);

  useEffect(() => {
    console.log('loading', isLoading);
    console.log('isError', isError);
    console.log('error', error);
  }, [error, isLoading, isError]);

  const onSubmit = async (data: IRegistrationInitData) => {
    reset();

    const payload = await registration(convertApiData.registration(data)).unwrap();

    changeToken({
      token: payload.access,
    });

    console.log('payload', payload);
    console.log('data', data);
  };

  return (
    <Page className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {error && error.map((error) => <span key={error}>{error}</span>)}
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
          placeholder={
            t('registration.placeholders.email') || 'ivan@google.com'
          }
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
          label={
            t('registration.labels.role') || 'Хотите зарегестрироваться как HR?'
          }
          {...register('isHr')}
        />
        <Button label={t('registration.buttons.submit')} type="submit" />
      </form>
    </Page>
  );
};

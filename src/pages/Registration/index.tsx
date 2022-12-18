import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { bindActionCreators } from '@reduxjs/toolkit';

import {
  Button, Input, CheckBox, Page, Error,
} from '../../components';
import { useRegisterMutation } from '../../redux/api/user';
import { IRegistrationInitData } from './types';
import { convertApiData } from '../../services/convert-api-data';
import { setToken } from '../../redux/slices/user-slice';
import { instanceOfIErrorResponse } from '../../redux/types/user-slice';
import { useTypedDispatch } from '../../hooks';
import { PATHS } from '../routes';

import styles from './registration.module.scss';
import { setCookie } from '../../models/cookie';

export const initRegistrationState: IRegistrationInitData = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  isHr: false,
};

export const Registration: FC = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const [error, setError] = useState<string[] | null>(null);
  const [registration, { isLoading, error: errorResponse }] = useRegisterMutation();

  const { setToken: changeToken } = bindActionCreators({ setToken }, dispatch);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<IRegistrationInitData>({
    mode: 'all',
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

  const onSubmit = async (data: IRegistrationInitData) => {
    const payload = await registration(convertApiData.registration(data)).unwrap();

    reset();

    changeToken({
      token: payload.access,
    });

    setCookie('token', payload.access, 1);

    navigate(PATHS.MAIN);
  };

  return (
    <Page className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {error && <Error errors={error} />}
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
        <Button type="submit" disabled={!isValid} loading={isLoading}>
          {t('registration.buttons.submit')}
        </Button>
      </form>
    </Page>
  );
};

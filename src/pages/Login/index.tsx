import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { bindActionCreators } from '@reduxjs/toolkit';

import {
  Page, Error, Input, Button,
} from '../../components';
import { ILoginData } from './types';
import { useTypedDispatch } from '../../hooks';
import { useLoginMutation } from '../../redux/api/user';
import { instanceOfIErrorResponse } from '../../redux/types/user-slice';
import { setToken } from '../../redux/slices/user-slice';
import { setCookie } from '../../models/cookie';
import { PATHS } from '../routes';

import styles from '../Registration/registration.module.scss';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const [error, setError] = useState<string[] | null>(null);
  const [login, { isLoading, error: errorResponse }] = useLoginMutation();
  const { setToken: changeToken } = bindActionCreators({ setToken }, dispatch);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<ILoginData>({
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

  const onSubmit = async (data: ILoginData) => {
    console.log(data);

    const payload = await login(data).unwrap();

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
        <h1 className={styles.title}>{t('login.title')}</h1>
        {error && <Error errors={error} />}
        <Input
          label={t('login.labels.email') || 'Электронная почта'}
          placeholder={t('login.placeholders.email') || 'ivan@gmail.com'}
          error={errors.email}
          {...register('email', {
            required: t('registration.error') || 'Ошибка',
          })}
        />
        <Input
          type="password"
          label={t('login.labels.password') || 'Пароль'}
          error={errors.password}
          {...register('password', {
            required: t('login.error') || 'Ошибка',
          })}
        />
        <Button type="submit" disabled={!isValid} loading={isLoading}>
          {t('login.buttons.submit')}
        </Button>
        <Link className={styles.link} to={PATHS.REGISTRATION}>
          {t('login.link')}
        </Link>
      </form>
    </Page>
  );
};

export default Login;
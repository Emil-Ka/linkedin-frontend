import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { bindActionCreators } from '@reduxjs/toolkit';

import { Page, Error, Input, Button } from '../../components';
import { ILoginData } from './types';
import { useTypedDispatch } from '../../hooks';
import { useLoginMutation } from '../../redux/api/user';
import { instanceOfIErrorResponse } from '../../redux/types/user';
import * as userSlice from '../../redux/slices/user';
import { resetCookie, setCookie } from '../../models/cookie';
import { PATHS } from '../../constants/paths';

import styles from './login.module.scss';

export const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [error, setError] = useState<string[] | null>(null);

  const [login, { isLoading, error: errorResponse }] = useLoginMutation();

  const dispatch = useTypedDispatch();
  const { setToken, resetUser, setUser } = bindActionCreators(
    {
      setToken: userSlice.setToken,
      setUser: userSlice.setUser,
      resetUser: userSlice.resetUser,
    },
    dispatch,
  );

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<ILoginData>({
    mode: 'all',
  });

  useEffect(() => {
    resetUser();
    resetCookie('token');
    // eslint-disable-next-line
  }, []);

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
    const payload = await login(data).unwrap();

    reset();

    setToken({ token: payload.access });
    setUser({ user: payload.data });
    setCookie('token', payload.access, 1);

    navigate(PATHS.MAIN);
  };

  return (
    <Page className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>{t('login.title')}</h1>
        {error && <Error errors={error} />}
        <Input
          label={t('login.labels.email')!}
          placeholder={t('login.placeholders.email')!}
          error={errors.email}
          {...register('email', {
            required: t('utils.errors.required')!,
          })}
        />
        <Input
          type="password"
          label={t('login.labels.password')!}
          error={errors.password}
          {...register('password', {
            required: t('utils.errors.required')!,
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

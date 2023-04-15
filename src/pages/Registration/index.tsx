import React, { FC, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { bindActionCreators } from '@reduxjs/toolkit';

import { Button, Input, ChoiceInput, Page, Error } from '../../components';
import { useRegisterMutation } from '../../redux/api/user';
import { IRegistrationInitData, instanceOfIErrorResponse } from '../../redux/types/user';
import { convertData } from '../../shared/lib/convert-data';
import * as userSlice from '../../redux/slices/user';
import { setCookie } from '../../models/cookie';
import { useTypedDispatch } from '../../shared/hooks';
import { PATHS } from '../../shared/config/paths';

import styles from './registration.module.scss';

export const initRegistrationState: IRegistrationInitData = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  isHr: false,
};

export const Registration: FC = () => {
  const dispatch = useTypedDispatch();
  const { t } = useTranslation();
  const [error, setError] = useState<string[] | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [registration, { isLoading, error: errorResponse }] = useRegisterMutation();

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
  } = useForm<IRegistrationInitData>({
    mode: 'all',
  });

  useEffect(() => {
    resetUser();
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

  const onSubmit = async (data: IRegistrationInitData) => {
    const payload = await registration(convertData.registration(data)).unwrap();

    reset();

    setToken({ token: payload.access });
    setUser({ user: payload.data });
    setCookie('token', payload.access, 1);

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={PATHS.MAIN} />;
  }

  return (
    <Page className={styles.page}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{t('registration.title')}</h1>
        {error && <Error errors={error} />}
        <Input
          label={t('registration.labels.firstName')!}
          placeholder={t('registration.placeholders.firstName')!}
          error={errors.first_name}
          {...register('first_name', {
            required: t('utils.errors.required')!,
          })}
        />
        <Input
          label={t('registration.labels.lastName')!}
          placeholder={t('registration.placeholders.lastName')!}
          error={errors.last_name}
          {...register('last_name', {
            required: t('utils.errors.required')!,
          })}
        />
        <Input
          type="email"
          label={t('registration.labels.email')!}
          placeholder={t('registration.placeholders.email')!}
          error={errors.email}
          {...register('email', {
            required: t('utils.errors.required')!,
          })}
        />
        <Input
          type="password"
          label={t('registration.labels.password')!}
          error={errors.password}
          {...register('password', {
            required: t('utils.errors.required')!,
          })}
        />
        <ChoiceInput type="checkbox" label={t('registration.labels.role')!} {...register('isHr')} />
        <Button type="submit" disabled={!isValid} loading={isLoading}>
          {t('registration.buttons.submit')}
        </Button>
        <Link to={PATHS.LOGIN}>{t('registration.link')}</Link>
      </form>
    </Page>
  );
};

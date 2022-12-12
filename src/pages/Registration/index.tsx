import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from '../../components/templates/Form';
import { useLanguage, useTheme } from '../../hooks';

import styles from './registration.module.scss';

export const initState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

export const Registration = () => {
  const { t } = useTranslation();
  const { lang, setLang } = useLanguage();
  const { theme, setTheme } = useTheme();

  console.log(lang);
  console.log(theme);

  const onSubmit = (data: typeof initState) => {
    console.log(data);
  };

  return (
    <main className={styles.main}>
      <Form fields={initState} className={styles.form} submitHandler={onSubmit}>
        <Form.Input name="firstName" label="Имя" />
        <Form.Input name="lastName" label="Фамилия" />
        <Form.Input name="email" label="Email" />
      </Form>
    </main>
  );
};

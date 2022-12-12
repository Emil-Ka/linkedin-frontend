import React, { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormProps } from './form.props';
import { Input } from '../../atomic';
import { FormContext } from './context';

export const Form = ({
  children, submitHandler, fields, ...props
}: FormProps) => {
  const {
    register, formState: { errors }, handleSubmit, reset,
  } = useForm<typeof fields>();

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <FormContext.Provider value={{ register }}>
      <form onSubmit={submitHandler && handleSubmit(submitHandler)} {...props}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

Form.Input = Input;

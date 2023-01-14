import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import cn from 'classnames';

import { Button, ChoiceInput, FileInput, Input, Page } from '../../components';
import { useGetUser } from '../../hooks';
import { USER_ROLE } from '../../redux/types/user';
import { useGetTestsQuery } from '../../redux/api/test';
import { IAddQuestionData, ITestOption, IOption } from './types';
import { IGetTestResponse } from '../../redux/types/test';

import styles from './add-question.module.scss';

const defaultOptions: IOption[] = [
  {
    id: 1,
    value: '',
  },
];

export const AddQuestion = () => {
  const { t } = useTranslation();
  const { isLoading } = useGetUser({
    role: USER_ROLE.ADMIN,
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<IAddQuestionData>();

  const watcher = watch();
  const { data: tests, isLoading: isTestsLoading } = useGetTestsQuery();

  const [testOptions, setTestOptions] = useState<ITestOption[]>();
  const [optionOptions, setOptionOptions] = useState<IOption[]>(defaultOptions);
  const [answer, setAnswer] = useState<string>();

  useEffect(() => {
    console.log(watcher);
  }, [watcher]);

  useEffect(() => {
    if (tests) {
      setTestOptions(
        tests.map((test) => ({
          value: test.id,
          label: test.name,
        })),
      );
    }
  }, [tests]);

  const onSubmit = (data: IAddQuestionData) => {
    console.log('data', data);
    console.log('options', optionOptions);
  };

  const handleOption = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    setOptionOptions((prev) =>
      prev.map((option) => {
        if (option.id === id) {
          return {
            id,
            value: e.target.value,
          };
        }

        return option;
      }),
    );
  };

  const addOption = () => {
    setOptionOptions((options) => [
      ...options,
      {
        id: options.length + 1,
        value: '',
      },
    ]);
  };

  const handleAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
    console.log(answer);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    testOptions && (
      <Page className={styles.page}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* @ts-ignore */}
          <Controller
            control={control}
            name="test"
            rules={{
              // @ts-ignore
              required: t('utils.errors.required')!,
            }}
            render={({ field }) => (
              <Select
                ref={field.ref}
                options={testOptions}
                value={testOptions.filter((option) => option.value === field.value)}
                onChange={(val) => {
                  field.onChange(val?.value);
                }}
                placeholder={t('add_question.placeholders.test')}
                isLoading={isTestsLoading}
                isSearchable
              />
            )}
          />
          <Input
            label={t('add_question.labels.question')!}
            placeholder={t('add_question.placeholders.question')!}
            {...register('question', {
              required: t('utils.errors.required')!,
            })}
            error={errors.question}
          />
          <FileInput
            accept="image/png, image/jpeg, image/svg"
            label={t('add_question.labels.image')!}
            {...register('cover')}
            error={errors.cover}
          />
          {optionOptions.map((option, index) => (
            <div key={option.id} className={styles.option}>
              <Input
                className={styles.optionInput}
                label={index === 0 ? t('add_question.labels.option')! : null}
                onChange={(e) => handleOption(e, option.id)}
                value={option.value}
              />
              <ChoiceInput
                className={cn(styles.optionRadio, {
                  [styles.optionRadio_first]: index === 0,
                })}
                name="answer"
                value={answer}
                onChange={handleAnswer}
                // {...register('answer')}
                type="radio"
                variant="box"
                size="l"
              />
            </div>
          ))}
          <Button onClick={addOption} className={styles.addOption}>
            {t('add_question.buttons.add_option')}
          </Button>
          <Button type="submit" disabled={!isValid}>
            {t('add_question.buttons.submit')}
          </Button>
        </form>
      </Page>
    )
  );
};

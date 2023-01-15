import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import cn from 'classnames';

import { Button, ChoiceInput, FileInput, Input, Notification, Page } from '../../components';
import { useGetUser } from '../../hooks';
import { USER_ROLE } from '../../redux/types/user';
import { useGetTestsQuery } from '../../redux/api/test';
import { IAddQuestionData, ITestOption, IOption } from './types';
import { IGetTestResponse } from '../../redux/types/test';

import styles from './add-question.module.scss';
import { useAddQuestionMutation } from '../../redux/api/question';
import { convertData } from '../../services';
import { useAddOptionMutation } from '../../redux/api/option';
import { IOptionResponse } from '../../redux/types/option';
import { useAddAnswerMutation } from '../../redux/api/answer';

export const AddQuestion = () => {
  const { t } = useTranslation();
  const { isLoading } = useGetUser({ role: USER_ROLE.ADMIN });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IAddQuestionData>({
    defaultValues: {
      options: [
        {
          _id: 0,
          value: '',
        },
      ],
    },
    mode: 'all',
  });

  const {
    fields: options,
    append,
    remove,
    // @ts-ignore
  } = useFieldArray<IAddQuestionData, keyof IAddQuestionData>({
    control,
    name: 'options',
  });

  const { data: tests, isLoading: isTestsLoading } = useGetTestsQuery();

  const [addQuestion, { isLoading: isAddQuestionLoading, isSuccess: isQuestionSuccess }] =
    useAddQuestionMutation();

  const [addOption, { isLoading: isAddOptionLoading, isSuccess: isOptionSuccess }] =
    useAddOptionMutation();

  const [addAnswer, { isLoading: isAnswerLoading, isSuccess: isAnswerSuccess }] =
    useAddAnswerMutation();

  const [testOptions, setTestOptions] = useState<ITestOption[]>();

  const addOptionField = () => {
    append({
      _id: options.length,
      value: '',
    } as never);
  };

  const onSubmit = async (data: IAddQuestionData) => {
    const answerText = data.options.filter((option) => option._id === parseInt(data.answer, 10))[0]
      .value;
    const createdOptions: IOptionResponse[] = [];

    const question = await addQuestion(convertData.addQuestion(data)).unwrap();

    await Promise.all<Promise<void>[]>(
      data.options.map(async (option) => {
        const createdOption = await addOption(
          convertData.addOption({
            value: option.value,
            question: question.id,
          }),
        ).unwrap();

        createdOptions.push(createdOption);
      }),
    );

    await Promise.all<Promise<void>>(
      createdOptions.map(async (createdOption) => {
        if (createdOption.text === answerText) {
          addAnswer({
            option: createdOption.id,
            question: question.id,
          }).unwrap();
        }
      }),
    );

    reset();
  };

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

  if (isLoading || isAddQuestionLoading || isAddOptionLoading || isAnswerLoading) {
    return <span>Loading...</span>;
  }

  return (
    testOptions && (
      <Page className={styles.page}>
        <Notification
          isVisible={isQuestionSuccess && isOptionSuccess && isAnswerSuccess}
          time={10_000}
          status="success"
        >
          {t('add_question.notifications.success')!}
        </Notification>
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
              <div className={styles.selectWrapper}>
                <Select
                  // @ts-ignore
                  ref={field.ref}
                  options={testOptions}
                  value={testOptions.filter((option) => option.value === field.value)}
                  onChange={(val) => {
                    field.onChange(val?.value);
                  }}
                  onBlur={field.onBlur}
                  placeholder={t('add_question.placeholders.test')}
                  isLoading={isTestsLoading}
                  isSearchable
                />
                <span className={styles.error}>{errors.test?.message}</span>
              </div>
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
          {options.map((option, index) => (
            <div key={(option as IOption)._id} className={styles.option}>
              <Input
                className={styles.optionInput}
                label={index === 0 ? t('add_question.labels.option')! : null}
                handleDelete={index !== 0 ? () => remove(index) : null}
                {...register(`options.${index}.value`, {
                  required: t('add_question.errors.option')!,
                })}
                error={errors.options?.[index]?.value}
              />
              <ChoiceInput
                className={cn(styles.optionRadio, {
                  [styles.optionRadio_first]: index === 0,
                })}
                type="radio"
                value={(option as IOption)._id}
                variant="box"
                size="l"
                {...register('answer', {
                  required: t('utils.errors.required')!,
                })}
              />
            </div>
          ))}
          <Button onClick={addOptionField} className={styles.addOption}>
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

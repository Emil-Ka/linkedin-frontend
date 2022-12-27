import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import {
  Button,
  Card, CheckBox, Container, Error, Page,
} from '../../components';
import { useGetQuestionsQuery } from '../../redux/api/question';
import { IQuestionParams } from '../../redux/types/question';
import { useGetTestQuery } from '../../redux/api/test';
import { useGetOptionsQuery } from '../../redux/api/option';
import { minToSec, timeForUI } from '../../services';
import { IClientAnswersData } from '../../redux/types/test';

import styles from './test-page.module.scss';

export const TestPage = () => {
  const { register, getValues } = useForm<IClientAnswersData>();

  const timer = useRef<NodeJS.Timer | null>(null);
  const { t } = useTranslation();
  const { id: testId } = useParams<IQuestionParams>();
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const { data: questions, isSuccess: isQuestionsSuccess } = useGetQuestionsQuery({ id: testId });
  const { data: test, isSuccess: isTestSuccess } = useGetTestQuery({ id: testId });

  const currentQuestion = questions?.[questionNumber - 1] || null;
  const questionsCount = questions?.length || 0;

  const { data: options } = useGetOptionsQuery(
    { id: currentQuestion ? currentQuestion.id : 0 },
    { skip: questionNumber === 0 || !currentQuestion },
  );

  const clearTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  const startTest = () => {
    setQuestionNumber((questionNumber) => questionNumber + 1);

    timer.current = setInterval(() => {
      setElapsedTime((leftTime) => {
        if (leftTime === minToSec(test!.time) - 1) {
          clearTimer();
        }

        return leftTime + 1;
      });
    }, 1000);
  };

  const goToNextQuestion = () => {
    setQuestionNumber((questionNumber) => questionNumber + 1);
  };

  useEffect(() => () => {
    clearTimer();
  }, []);

  useEffect(() => {
    if (questionNumber > questionsCount) {
      console.log(getValues());
    }
  }, [questionNumber]);

  if (!isQuestionsSuccess) {
    return <Error errors={['С загрузкой вопросов произошла ошибка']} />;
  }

  if (!isTestSuccess) {
    return <Error errors={['С загрузкой теста произошла ошибка']} />;
  }

  return (
    <Page>
      <Container>
        <h1 className={styles.title}>
          {test.name}
        </h1>
        <Card className={styles.card}>
          {questionNumber === 0 && (
            <>
              <p className={styles.desc}>
                {test.desc}
              </p>
              <Button
                className={styles.startBtn}
                onClick={startTest}
              >
                {t('test.buttons.start')}
              </Button>
            </>
          )}
          {questionNumber > 0 && questionNumber <= questionsCount && (
            <>
              <div className={styles.header}>
                <span className={styles.score}>
                  {questionNumber}
                  /
                  {questionsCount}
                </span>
                <span className={styles.time}>
                  {timeForUI(elapsedTime)}
                  /
                  {timeForUI(minToSec(test.time))}
                </span>
              </div>
              <div>
                {currentQuestion?.photo && (
                  <img
                    src={currentQuestion.photo}
                    alt={t('test.alt.photo') || 'Изображение для вопроса не загрузилось'}
                  />
                )}
                <p className={styles.text}>{currentQuestion?.text}</p>
                <form>
                  {options && options.map(({ id, text }) => (
                    <CheckBox
                      key={id}
                      type="radio"
                      label={text}
                      value={id}
                      {...register(currentQuestion!.id.toString())}
                    />
                  ))}
                </form>
                <Button onClick={goToNextQuestion}>
                  {t('test.buttons.next')}
                </Button>
              </div>
            </>
          )}
        </Card>
      </Container>
    </Page>
  );
};

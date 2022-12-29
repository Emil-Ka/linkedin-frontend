import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import {
  Button,
  Card, ChoiceInput, Container, Error, Page,
} from '../../components';
import { useGetQuestionsQuery } from '../../redux/api/question';
import { IQuestionParams } from '../../redux/types/question';
import { useGetTestQuery } from '../../redux/api/test';
import { useGetOptionsQuery } from '../../redux/api/option';
import { minToSec, timeForUI } from '../../services';
import { IClientAnswersData } from '../../redux/types/test';
import TimerIcon from './assets/timer.svg';

import styles from './test-page.module.scss';

export const TestPage = () => {
  const { register, getValues } = useForm<IClientAnswersData>();
  const { t } = useTranslation();

  const timer = useRef<NodeJS.Timer | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { id: testId } = useParams<IQuestionParams>();

  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isFinish, setIsFinish] = useState<boolean>(false);

  const { data: questions, isSuccess: isQuestionsSuccess, isLoading: isQuestionsLoading } = useGetQuestionsQuery({ id: testId });
  const { data: test, isSuccess: isTestSuccess, isLoading: isTestLoading } = useGetTestQuery({ id: testId });

  const currentQuestion = questions?.[questionNumber - 1] || null;
  const questionsCount = questions?.length || 0;

  const { data: options, isLoading: isOptionsLoading } = useGetOptionsQuery(
    { id: currentQuestion ? currentQuestion.id : 0 },
    { skip: questionNumber === 0 || !currentQuestion },
  );

  const clearTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  const finishTest = () => {
    setIsFinish(true);
    console.log(getValues());
  };

  const startTest = () => {
    if (!test) {
      return;
    }

    setQuestionNumber((questionNumber) => questionNumber + 1);

    timer.current = setInterval(() => {
      setElapsedTime((elapsedTime) => {
        if (elapsedTime === minToSec(test.time) - 1) {
          clearTimer();
          finishTest();
        }

        return elapsedTime + 1;
      });
    }, 1000);
  };

  const scrollToUp = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  const goToNextQuestion = () => {
    setQuestionNumber((questionNumber) => questionNumber + 1);
    scrollToUp();
  };

  const goToPrevQuestion = () => {
    setQuestionNumber((questionNumber) => questionNumber - 1);
    scrollToUp();
  };

  useEffect(() => () => {
    clearTimer();
  }, []);

  useEffect(() => {
    if (questionNumber > questionsCount) {
      finishTest();
    }
  }, [questionNumber]);

  if (isQuestionsLoading || isTestLoading || isOptionsLoading) {
    return 'Loading...';
  }

  if (!isQuestionsSuccess) {
    return <Error errors={['С загрузкой вопросов произошла ошибка']} />;
  }

  if (!isTestSuccess) {
    return <Error errors={['С загрузкой теста произошла ошибка']} />;
  }

  return (
    <Page>
      <Container className={styles.content} ref={containerRef}>
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
          {!isFinish && questionNumber > 0 && (
            <>
              <div className={styles.header}>
                <div className={styles.score}>
                  <span>{questionNumber}</span>
                  /
                  <span>{questionsCount}</span>
                </div>
                <TimerIcon className={cn(styles.timerIcon, {
                  [styles.timerIcon_red]: minToSec(test.time) - elapsedTime <= 60,
                })}
                />
                <div className={cn(styles.time, {
                  [styles.time_red]: minToSec(test.time) - elapsedTime <= 60,
                })}
                >
                  <span>{timeForUI(elapsedTime)}</span>
                  /
                  <span>{timeForUI(minToSec(test.time))}</span>
                </div>
              </div>
              <div>
                {currentQuestion?.photo && (
                  <img
                    src={currentQuestion.photo}
                    alt={t('test.alt.photo') || 'Изображение для вопроса не загрузилось'}
                    className={styles.photo}
                  />
                )}
                <p className={styles.text}>{currentQuestion?.text}</p>
                {options && options.map(({ id, text }) => (
                  <ChoiceInput
                    key={id}
                    type="radio"
                    label={text}
                    value={id}
                    className={styles.option}
                    {...register(currentQuestion!.id.toString())}
                  />
                ))}
                <div className={styles.buttons}>
                  {questionNumber > 1 && (
                    <Button onClick={goToPrevQuestion}>
                      {t('test.buttons.prev')}
                    </Button>
                  )}
                  <Button onClick={goToNextQuestion}>
                    {questionNumber < questionsCount
                      ? t('test.buttons.next')
                      : t('test.buttons.end')}
                  </Button>
                </div>
              </div>
            </>
          )}
          {isFinish && (
            <span>ВСЁ!</span>
          )}
        </Card>
      </Container>
    </Page>
  );
};

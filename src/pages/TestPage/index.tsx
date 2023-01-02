import React, { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import { Button, Card, ChoiceInput, Container, Error, Page, Timer } from '../../components';
import { useLazyGetQuestionsQuery } from '../../redux/api/question';
import { IQuestionResponse } from '../../redux/types/question';
import { useLazyGetTestQuery } from '../../redux/api/test';
import { useLazyGetOptionsQuery } from '../../redux/api/option';
import { useCheckAnswerMutation } from '../../redux/api/answer';
import { minToMs, minToSec } from '../../services';
import { IAnswerRequest } from '../../redux/types/answer';
import { QuestionParamsType } from './types';
import cowboySrc from './assets/cowboy.png';
import sadSrc from './assets/sad.png';

import styles from './test-page.module.scss';

export const TestPage = () => {
  const { register, getValues } = useForm<IAnswerRequest>();
  const { id: testId } = useParams<QuestionParamsType>();
  const { t } = useTranslation();

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<IQuestionResponse | null>(null);

  const [getQuestions, { data: questions, isLoading: isQuestionsLoading }] =
    useLazyGetQuestionsQuery();
  const [getOptions, { data: options, isLoading: isOptionsLoading }] = useLazyGetOptionsQuery();
  const [getTest, { data: test, isLoading: isTestLoading }] = useLazyGetTestQuery();

  const [checkAnswer, { data: result }] = useCheckAnswerMutation();

  const finishTest = () => {
    setIsStarted(false);
    setIsFinish(true);

    checkAnswer(getValues());
  };

  const startTest = () => {
    setIsStarted(true);
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

  useEffect(() => {
    if (testId) {
      getTest({ id: parseInt(testId, 10) });
      getQuestions({ testId: parseInt(testId, 10) });
    }
    // eslint-disable-next-line
  }, [testId]);

  useEffect(() => {
    if (!questions) {
      return;
    }

    if (questionNumber >= questions.length) {
      finishTest();
      return;
    }

    setCurrentQuestion(questions[questionNumber]);
  }, [questions, questionNumber]);

  useEffect(() => {
    if (currentQuestion) {
      getOptions({ questionId: currentQuestion!.id });
    }
    // eslint-disable-next-line
  }, [currentQuestion]);

  useEffect(() => {
    let timer: NodeJS.Timer;

    if (isStarted && test) {
      timer = setTimeout(() => {
        finishTest();
      }, minToMs(test.time));
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isStarted, test]);

  if (isQuestionsLoading || isTestLoading || isOptionsLoading) {
    return <span>Loading...</span>;
  }

  return (
    <Page>
      <Container className={styles.content} ref={containerRef}>
        <h1 className={styles.title}>{test?.name}</h1>
        <Card className={styles.card}>
          {!isStarted && questionNumber === 0 && (
            <>
              <p className={styles.desc}>{test?.desc}</p>
              <Button className={styles.startBtn} onClick={startTest}>
                {t('test.buttons.start')}
              </Button>
            </>
          )}
          {isStarted && test && currentQuestion && options && (
            <>
              <div className={styles.header}>
                <div className={styles.score}>
                  <span>{questionNumber + 1}</span>/<span>{questions!.length}</span>
                </div>
                <Timer time={minToSec(test.time)} finishTest={finishTest} />
              </div>
              <div>
                {currentQuestion.photo && (
                  <img
                    src={currentQuestion.photo}
                    alt={t('utils.photo.alt') as string}
                    className={styles.photo}
                  />
                )}
                <p className={styles.text}>{currentQuestion.text}</p>
                {options.map(({ id, text }) => (
                  <ChoiceInput
                    key={id}
                    type="radio"
                    label={text}
                    value={id}
                    className={styles.option}
                    {...register(currentQuestion.id.toString())}
                  />
                ))}
                <div className={styles.buttons}>
                  {questionNumber > 0 && (
                    <Button onClick={goToPrevQuestion}>{t('test.buttons.prev')}</Button>
                  )}
                  <Button onClick={goToNextQuestion}>
                    {questionNumber < questions!.length - 1
                      ? t('test.buttons.next')
                      : t('test.buttons.end')}
                  </Button>
                </div>
              </div>
            </>
          )}
          {isFinish && result && (
            <>
              <h2
                className={cn(styles.resultTitle, {
                  [styles.success]: result.result >= 50,
                  [styles.failed]: result.result < 50,
                })}
              >
                {t('test.title.result')} {result?.result}%
              </h2>
              <img
                className={styles.emoji}
                src={result.result < 50 ? sadSrc : cowboySrc}
                alt="emoji"
              />
            </>
          )}
        </Card>
      </Container>
    </Page>
  );
};

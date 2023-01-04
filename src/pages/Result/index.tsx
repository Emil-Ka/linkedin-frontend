import React, { FC, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Page, Container, Card } from '../../components';
import { useLazyGetResultsQuery } from '../../redux/api/result';
import { IOptions, ResultParamsType } from './types';
import { useGetAnswersQuery } from '../../redux/api/answer';
import { useLazyGetQuestionsQuery } from '../../redux/api/question';
import { useLazyGetTestQuery } from '../../redux/api/test';
import { useLazyGetOptionsQuery } from '../../redux/api/option';

import styles from './result.module.scss';
import { useGetPassedTestsQuery } from '../../redux/api/passed-test';

export const Result: FC = () => {
  const { t } = useTranslation();
  const { id: testId } = useParams<ResultParamsType>();

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [options, setOptions] = useState<IOptions>({});
  const [totalResult, setTotalResult] = useState<number>(0);

  const { data: passedTests } = useGetPassedTestsQuery();

  const [getQuestions, { data: questions }] = useLazyGetQuestionsQuery();
  const [getResults, { data: results }] = useLazyGetResultsQuery();
  const [getTest, { data: test }] = useLazyGetTestQuery();
  const [getOptions] = useLazyGetOptionsQuery();

  const { data: answers } = useGetAnswersQuery();

  const getOptionIdByQuestionId = (questionId: number) => {
    return answers?.filter(({ question }) => question === questionId)[0].option;
  };

  const getSelectedOptionIdByQuestionId = (questionId: number) => {
    return results?.filter(({ question }) => question === questionId)[0].option;
  };

  useEffect(() => {
    if (testId) {
      getTest({ id: parseInt(testId, 10) });
      getResults({ testId: parseInt(testId, 10) });
      getQuestions({ testId: parseInt(testId, 10) });
    }
    // eslint-disable-next-line
  }, [testId]);

  useEffect(() => {
    if (questions) {
      questions.forEach(async ({ id: questionId }) => {
        const option = await getOptions({ questionId }).unwrap();

        setOptions((prev) => ({
          ...prev,
          [questionId]: option,
        }));
      });
    }
    // eslint-disable-next-line
  }, [questions]);

  useEffect(() => {
    if (passedTests && testId) {
      setTotalResult(passedTests.filter(({ test }) => test === parseInt(testId, 10))[0].result);
    }
  }, [passedTests, testId]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <Page>
      <Container className={styles.content} ref={containerRef}>
        <h1 className={styles.title}>
          {t('result.title')} {test?.name}
        </h1>
        {questions &&
          questions.map(({ id: questionId, photo, text }) => (
            <Card key={questionId} className={styles.question}>
              {photo && (
                <img
                  className={styles.questionImage}
                  src={photo}
                  alt={t('utils.photo.alt') as string}
                />
              )}
              <p className={styles.questionText}>{text}</p>
              {options[questionId] &&
                options[questionId].map(({ id: optionId, text }) => (
                  <Card
                    key={optionId}
                    className={cn(styles.option, {
                      [styles.option_green]: getOptionIdByQuestionId(questionId) === optionId,
                      [styles.option_red]:
                        getOptionIdByQuestionId(questionId) !== optionId &&
                        getSelectedOptionIdByQuestionId(questionId) === optionId,
                    })}
                  >
                    <span className={styles.optionText}>{text}</span>
                  </Card>
                ))}
            </Card>
          ))}
        {passedTests && (
          <span
            className={cn(styles.totalResult, {
              [styles.totalResult_green]: totalResult >= 50,
              [styles.totalResult_red]: totalResult < 50,
            })}
          >
            {t('result.labels.result')} {totalResult} %
          </span>
        )}
      </Container>
    </Page>
  );
};

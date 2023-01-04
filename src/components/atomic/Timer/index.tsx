import React, { FC, useState, useEffect, useRef } from 'react';
import cn from 'classnames';

import { ITimerProps } from './timer.props';
import { timeForUI } from '../../../services';
import TimerIcon from './assets/timer.svg';

import styles from './timer.module.scss';

export const Timer: FC<ITimerProps> = ({ time, finishTest, className, ...props }) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((elapsedTime) => {
        if (elapsedTime === time - 1) {
          finishTest();
        }

        return elapsedTime + 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={cn(styles.timer, className)} {...props}>
      <TimerIcon
        className={cn(styles.timerIcon, {
          [styles.timerIcon_red]: time - elapsedTime <= 60,
        })}
      />
      <div
        className={cn(styles.time, {
          [styles.time_red]: time - elapsedTime <= 60,
        })}
      >
        <span>{timeForUI(elapsedTime)}</span>/<span>{timeForUI(time)}</span>
      </div>
    </div>
  );
};

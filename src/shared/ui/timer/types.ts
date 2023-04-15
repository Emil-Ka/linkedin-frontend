import React from 'react';

export interface ITimerProps extends React.ComponentProps<'div'> {
  time: number;
  finishTest: () => void;
}

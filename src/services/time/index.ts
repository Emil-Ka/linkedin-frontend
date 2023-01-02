const addZero = (num: number) => {
  if (num < 10) {
    return `0${num}`;
  }

  return `${num}`;
};

export const timeForUI = (sec: number): string => `${addZero(Math.floor(sec / 60))}:${addZero(sec % 60)}`;

export const minToSec = (min: number): number => min * 60;

export const minToMs = (min: number): number => min * 60 * 1000;

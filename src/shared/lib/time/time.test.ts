import { minToMs, minToSec, timeForUI } from './index';

describe('Проверка правильности форматирования времени', () => {
  test('Минуты в секунды', () => {
    expect(minToSec(0)).toBe(0);
    expect(minToSec(1.5)).toBe(90);
    expect(minToSec(4)).toBe(240);
  });

  test('Минуты в милисекунды', () => {
    expect(minToMs(0)).toBe(0);
    expect(minToMs(1.5)).toBe(90000);
    expect(minToMs(4)).toBe(240000);
  });

  test('Отображение врмени в UI', () => {
    expect(timeForUI(0)).toBe('00:00');
    expect(timeForUI(1.5)).toBe('00:01');
    expect(timeForUI(4)).toBe('00:04');
    expect(timeForUI(113)).toBe('01:53');
    expect(timeForUI(700)).toBe('11:40');
  });
});

import { convertApiData } from '.';

describe('Проверка правильности конвертации данных для запроса регистрации', () => {
  test('пустые поля', () => {
    expect(
      convertApiData.registration({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        isHr: false,
      }),
    ).toEqual({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      role: 0,
    });
  });

  test('заполненные поля', () => {
    expect(
      convertApiData.registration({
        first_name: 'Max',
        last_name: 'Boiler',
        email: 'max@boiler.com',
        password: 'qwerty123',
        isHr: false,
      }),
    ).toEqual({
      first_name: 'Max',
      last_name: 'Boiler',
      email: 'max@boiler.com',
      password: 'qwerty123',
      role: 0,
    });
  });

  test('пользователь - HR', () => {
    expect(
      convertApiData.registration({
        first_name: 'Max',
        last_name: 'Boiler',
        email: 'max@boiler.com',
        password: 'qwerty123',
        isHr: true,
      }),
    ).toEqual({
      first_name: 'Max',
      last_name: 'Boiler',
      email: 'max@boiler.com',
      password: 'qwerty123',
      role: 1,
    });
  });

  test('isHR не задан в форме регистрации', () => {
    expect(
      convertApiData.registration({
        first_name: 'Max',
        last_name: 'Boiler',
        email: 'max@boiler.com',
        password: 'qwerty123',
      }),
    ).toEqual({
      first_name: 'Max',
      last_name: 'Boiler',
      email: 'max@boiler.com',
      password: 'qwerty123',
      role: 0,
    });
  });
});

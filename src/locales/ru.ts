export const ru = {
  registration: {
    title: 'Регистрация',
    labels: {
      firstName: 'Имя',
      lastName: 'Фамилия',
      email: 'Электронная почта',
      password: 'Пароль',
      role: 'Хотите зарегестрироваться как HR?',
    },
    error: 'Это обязательное поле',
    placeholders: {
      firstName: 'Иван',
      lastName: 'Иванов',
      email: 'ivan@gmail.com',
    },
    buttons: {
      submit: 'Зарегестрироваться',
    },
    link: 'Уже есть аккаунт? Войдите',
  },
  login: {
    title: 'Вход',
    labels: {
      email: 'Электронная почта',
      password: 'Пароль',
    },
    error: 'Это обязательное поле',
    placeholders: {
      email: 'ivanov@gmail.com',
    },
    buttons: {
      submit: 'Войти',
    },
    link: 'Ещё нет аккаунта? Зарегестрируйтесь',
  },
  links: {
    login: 'Вход',
    registration: 'Регистрация',
    contacts: 'Контакты',
    main: 'Главная',
    about: 'О проекте',
    tests: 'Тесты',
    vacancies: 'Вакансии',
    account: 'Личный кабинет',
    admin: 'Админка',
  },
  vacancies: {
    buttons: {
      addVacancy: '+ добавить вакансию',
    },
  },
  add_vacancy: {
    title: 'Создайте вакансию',
    labels: {
      title: 'Заголовок вакансии',
      company_name: 'Название компании',
      salary: 'Размер зарплаты',
      text: 'Описание вкансии',
    },
    error: 'Это обязательное поле',
    placeholders: {
      title: 'Senior GO Developer',
      company_name: 'ООО Домклик',
      salary: '120 000',
    },
    buttons: {
      submit: 'Добавить вакансию',
    },
  },
  account: {
    titles: {
      resumes: 'Все резюме',
      passed_tests: 'Пройденные тесты',
    },
    labels: {
      result: 'Результат:',
    },
    text: {
      salary: 'Зарплата не указана',
    },
    links: {
      more: 'Подробнее',
      add_resume: 'Добавить резюме',
      show_result: 'Показать результаты',
    },
  },
  tests: {
    title: 'Все тесты',
  },
  test: {
    title: {
      result: 'Вы решили тест правильно на',
    },
    buttons: {
      start: 'Начать тест',
      next: 'Следующий вопрос',
      prev: 'Предыдущий вопрос',
      end: 'Закончить тест',
    },
  },
  result: {
    title: 'Ваши результаты по тесту',
    labels: {
      result: 'Ваш итоговый результат за тест:',
    },
  },
  add_test: {
    title: 'Создайте новый тест',
    labels: {
      name: 'Название теста',
      desc: 'Описание теста',
      time: 'Время на прохождение в минутах',
      images: 'Обложка для теста',
    },
    placeholders: {
      name: 'React Junior',
      desc: 'Этот тест предназначен для ...',
      time: '20',
    },
    buttons: {
      submit: 'Создать тест',
    },
  },
  utils: {
    photo: {
      alt: 'Изображение для вопроса не загрузилось',
    },
    errors: {
      required: 'Это обязательное поле',
    },
  },
  file_input: {
    labels: {
      drug_files: 'Перетащите файлы сюда или',
      upload_files: 'загрузите фотографии',
    },
  },
};

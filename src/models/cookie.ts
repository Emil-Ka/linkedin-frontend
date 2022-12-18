export const setCookie = (name: string, value: string, days?: number): void => {
  let expires = '';

  if (days) {
    const date = new Date();

    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${value}${expires}; path=/`;
};

export const getCookie = (name: string): string | null => {
  const nameEqual = `${name}=`;
  const cookieArray = document.cookie.split(';');

  for (let i = 0; i < cookieArray.length; i += 1) {
    let cookieItem = cookieArray[i];

    while (cookieItem.charAt(0) === ' ') {
      cookieItem = cookieItem.substring(1, cookieItem.length);
    }

    if (cookieItem.indexOf(nameEqual) === 0) {
      return cookieItem.substring(nameEqual.length, cookieItem.length);
    }
  }

  return null;
};

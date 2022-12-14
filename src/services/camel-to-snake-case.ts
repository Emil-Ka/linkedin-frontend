export const camelToSnakeCase = (str: string): string => {
  let newStr = '';

  for (let i = 0; i < str.length; i += 1) {
    if (str[i] === str[i].toUpperCase()) {
      newStr += `_${str[i].toLowerCase()}`;
    } else {
      newStr += str[i];
    }
  }

  return newStr;
};

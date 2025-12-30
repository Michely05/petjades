export const isEmpty = (value: string) => value.trim().length === 0;

export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);

export const isMessageTooLong = (message: string, max = 250) =>
  message.length > max;

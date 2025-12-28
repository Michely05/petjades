export const isEmpty = (value: string) => !value || value.trim() === "";

export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isMessageTooLong = (message: string, max = 250) =>
  message.length > max;

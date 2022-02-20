export enum Locale {
  BRL = 790,
  USD = 220,
  EUR = 978,
  INR = 860
}

export const getEnumByValue = (value: Locale) => {
  return Locale[value];
};

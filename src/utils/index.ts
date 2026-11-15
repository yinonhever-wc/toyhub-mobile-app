export const generateOrderId = (): string => {
  const num = Math.floor(Math.random() * (9999999 - 10000 + 1)) + 10000;
  return "OR-" + num;
};

export const formatNumber = (num: number): string =>
  num.toLocaleString("en-NZ");

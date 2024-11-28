export const formatNumber = (number) => {
  return new Intl.NumberFormat('ko-KR').format(number);
};

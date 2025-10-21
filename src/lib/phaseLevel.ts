export const getPhaseLabel = (num: number) => {
  if (num % 100 >= 11 && num % 100 <= 13) {
    return `${num}th phase`; // special case: 11th, 12th, 13th
  }
  switch (num % 10) {
    case 1:
      return `${num}st phase`;
    case 2:
      return `${num}nd phase`;
    case 3:
      return `${num}rd phase`;
    default:
      return `${num}th phase`;
  }
};

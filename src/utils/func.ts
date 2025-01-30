export const generateUniqueRandomNumber = () => {
  const min = 100;
  const max = 999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomBoolean = () => Math.random() < 0.5;

export const random = {
  int: getRandomInt,
  boolean: getRandomBoolean,
};

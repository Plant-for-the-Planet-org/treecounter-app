export const debug = (...params) => {
  process.env.DEBUG && console.log(...params);
};

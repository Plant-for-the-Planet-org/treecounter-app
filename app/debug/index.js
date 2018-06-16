import { context } from '../config/index.js.dist';

export const debug = (...params) => {
  context.debug && console.log(...params);
};

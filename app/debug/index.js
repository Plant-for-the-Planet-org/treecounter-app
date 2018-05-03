import {context} from "../config"

export const debug = (...params) => {
  context.debug && console.log(...params)
}
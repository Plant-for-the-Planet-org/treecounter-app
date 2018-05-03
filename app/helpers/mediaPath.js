import {context} from '../config'

/**
 * Possible entityKeys are:
 *  - 'profile'
 *  - 'project'
 *
 * @param filename
 * @param entityKey
 * @param sizeKey
 * @returns {string}
 */
export const mediaPath = (filename, entityKey, sizeKey) => {
  return `${context.baseUrl}/${context.mediaPath}/${entityKey}/${sizeKey}/${filename}`
}
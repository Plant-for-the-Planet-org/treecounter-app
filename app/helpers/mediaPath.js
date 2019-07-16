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
  return `${process.env.BASE_URL}${
    process.env.MEDIA_PATH
  }/${entityKey}/${sizeKey}/${filename}`;
};

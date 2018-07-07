export function queryParamsToObject(queryParams) {
  let returnObject = {};
  try {
    returnObject = JSON.parse(
      '{"' +
        decodeURI(queryParams)
          .replace('?', '')
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    );
  } catch (err) {
    console.log(err);
  }
  console.log('object to return ', returnObject);
  return returnObject;
}

export function objectToQueryParams(objectValue) {
  let valueString = Object.keys(objectValue)
    .map(key => key + '=' + objectValue[key])
    .join('&');

  console.log('object to return ', valueString);
  return valueString;
}

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

export function formatDate(date) {
  console.log('formatDate', date);

  let dd = date.getDate();
  let mm = date.getMonth() + 1; //January is 0!
  let yyyy = date.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }

  date = yyyy + '-' + mm + '-' + dd;
  return date;
}

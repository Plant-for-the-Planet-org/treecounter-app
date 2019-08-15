export function currencySort(currenciesArray) {
  if (currenciesArray.indexOf('LBP') > 0) {
    currenciesArray.splice(currenciesArray.indexOf('LBP'), 1);
    currenciesArray.unshift('LBP');
  }
  if (currenciesArray.indexOf('EUR') > 0) {
    currenciesArray.splice(currenciesArray.indexOf('EUR'), 1);
    currenciesArray.unshift('EUR');
  }
  if (currenciesArray.indexOf('USD') > 0) {
    currenciesArray.splice(currenciesArray.indexOf('USD'), 1);
    currenciesArray.unshift('USD');
  }
  return currenciesArray;
}

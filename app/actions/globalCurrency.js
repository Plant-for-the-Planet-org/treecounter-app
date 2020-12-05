// import { debug } from '../debug';
import { saveItem, getItemSync } from '../stores/localStorage';
import { setCurrency } from '../reducers/currencyReducer';
import { context } from '../config';
import { getLocale } from './getLocale';

let cache = { currency: '' };

export function getPreferredCurrency() {
  if (!cache.currency) {
    guess();
  }
  return cache.currency;
}

function guess() {
  //debug('locale', getLocale());
  cache.currency =
    getLocale() == 'de'
      ? 'EUR'
      : getItemSync('preferredCurrency') || context.currency;
  saveItem('preferredCurrency', cache.currency);
  return cache.currency;
}

export function setCurrencyAction(data) {
  return dispatch => {
    saveItem('preferredCurrency', data);
    dispatch(setCurrency(data));
  };
}

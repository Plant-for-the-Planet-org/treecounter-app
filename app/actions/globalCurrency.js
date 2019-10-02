import { saveItem, getItemSync } from '../stores/localStorage';
import { setCurrency } from '../reducers/currencyReducer';
import { context } from '../config';
let cache = { currency: '' };

export function getPreferredCurrency() {
  if (!cache.currency) {
    guess();
  }
  return cache.currency;
}

function guess() {
  cache.currency = getItemSync('preferredCurrency') || context.currency;
  cache.currency && saveItem('preferredCurrency', cache.currency);
  return cache.currency;
}

export function setCurrencyAction(data) {
  return dispatch => {
    saveItem('preferredCurrency', data);
    dispatch(setCurrency(data));
  };
}

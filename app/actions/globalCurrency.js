import { saveItem, getItemSync } from '../stores/localStorage';
import { setCurrency } from '../reducers/currencyReducer';
let cache = { currency: '' };
export function init() {
  cache.currency = guess();
}

export function getPreferredCurrency() {
  if (!cache.currency) {
    guess();
  }
  return cache.currency;
}

function guess() {
  // will implement default currency or initialization here
  try {
    cache.currency = getItemSync('preferredCurrency');
    saveItem('preferredCurrency', cache.currency || 'EUR');
    return cache.currency;
  } catch (error) {
    return cache.currency || 'EUR';
  }
}

export function setCurrencyAction(data) {
  return dispatch => {
    saveItem('preferredCurrency', data);
    dispatch(setCurrency(data));
  };
}

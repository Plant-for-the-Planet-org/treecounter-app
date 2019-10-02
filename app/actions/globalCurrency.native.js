import { saveItem, getItem } from '../stores/localStorage.native';
import { setCurrency } from '../reducers/currencyReducer';
import { context } from '../config';
let cache = { currency: '' };

export async function getPreferredCurrency() {
  if (!cache.currency) {
    await guess();
  }
  return cache.currency;
}

async function guess() {
  cache.currency = await getItem('preferredCurrency');
  cache.currency = cache.currency || context.currency;
  cache.currency && (await saveItem('preferredCurrency', cache.currency));
  return cache.currency;
}

export function setCurrencyAction(data) {
  return dispatch => {
    dispatch(setCurrency(data));
    saveItem('preferredCurrency', data);
  };
}

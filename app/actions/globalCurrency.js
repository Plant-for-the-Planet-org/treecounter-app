import { saveItem, getItemSync } from '../stores/localStorage';
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
    return cache.currency;
  } catch (error) {
    return cache.currency || 'EUR';
  }
}

export function setPreferredCurrency(currency) {
  cache.currency = currency;
  saveItem('preferredCurrency', currency);
  // we will update preferredCurrency in user profile in db
}

import { setCurrenciesConversions } from '../reducers/currenciesReducer';
import { getRequest } from '../utils/api';
import { debug } from '../debug';

let last = 0;

export function fetchCurrencies() {
  // Throttle it so it is waits 10 seconds before calling it again.
  // to prevent dogpiling.
  // The first request will probably fetch currencies
  // and all interested components will update.
  // If there was a network or server error then it will try
  // again in 10 seconds.
  return dispatch => {
    const now = Date.now();
    if (now - last > 10000) {
      last = now;

      debug('fetchCurrencies...');
      getRequest('public_currencies_get')
        .then(response => dispatch(setCurrenciesConversions(response.data)))
        .catch(error => debug(error));
    } else {
      debug('fetchCurrencies already called, throttling.');
    }
  };
}

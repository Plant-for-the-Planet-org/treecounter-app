import { setCurrenciesConversions } from '../reducers/currenciesReducer';
import { getRequest } from '../utils/api';
let last = 0;

export function fetchCurrencies() {
  // Actually we do not want to call this again and again,
  // the idea is we load this at the very beginning of the app

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

      return getRequest('public_currencies_get', { version: 'v1.3' })
        .then(response => {
          dispatch(setCurrenciesConversions(response.data));
          return response.data;
        })
        .catch(error => console.error(error));
    } else {
      console.log('fetchCurrencies already called, throttling.');
    }
  };
}

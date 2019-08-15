import { setCurrenciesConversions } from '../reducers/currenciesReducer';
import { getRequest } from '../utils/api';

export function fetchCurrencies() {
  return dispatch => {
    getRequest('public_currencies_get').then(response =>
      dispatch(setCurrenciesConversions(response.data))
    );
  };
}

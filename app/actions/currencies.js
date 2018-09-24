import { setCurrenciesConversions } from '../reducers/currenciesReducer';
import { getRequest } from '../utils/api';

export function fetchCurrencies() {
  return dispatch => {
    getRequest('public_currencies_get').then(response => {
      let currency_names = response.data.currency_names;
      let usd = currency_names['USD'];
      let euro = currency_names['EUR'];
      let pound = currency_names['LBP'];
      let newCurrencies = {};
      newCurrencies['USD'] = usd;
      newCurrencies['EUR'] = euro;
      newCurrencies['LBP'] = pound;
      currency_names = _.omit(currency_names, 'USD');
      currency_names = _.omit(currency_names, 'EUR');
      currency_names = _.omit(currency_names, 'LBP');
      Object.keys(currency_names).map(value => {
        newCurrencies[value] = currency_names[value];
      });
      response.data.currency_names = newCurrencies;
      dispatch(setCurrenciesConversions(response.data));
    });
  };
}

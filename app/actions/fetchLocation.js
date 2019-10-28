import { getItemSync } from '../stores/localStorage';
import { getExternalRequest } from '../utils/api';
import countryCodes from '../assets/countryCodes.json';
import supportedCurrency from '../assets/supportedCurrency.json';
import { find } from 'lodash';
import { setCurrencyAction } from './globalCurrency';
import { context } from '../config';

export function fetchLocation() {
  // fetchCurrency();
  return dispatch => {
    if (!getItemSync('preferredCurrency')) {
      getExternalRequest({
        endPoint: `http://api.ipstack.com/check?access_key=${
          context.locationApikKey
        }&fields=location,country_code,currency`
      })
        .then(data => {
          console.log('Got location fetch ip', data);
          const foundLocation = find(countryCodes, {
            countryCode: data.data.country_code
          });
          supportedCurrency.includes(foundLocation.code) &&
            dispatch(setCurrencyAction(foundLocation.code));
        })

        .catch(error => {
          console.error(error);
        });
    }
  };
}

export function fetchCurrency() {
  return dispatch => {
    getExternalRequest({
      endPoint: `hhttps://openexchangerates.org/api/latest.json?app_id=${
        context.currencyApiKey
      }`
    })
      .then(data => {
        console.log('Got currency fetch ip', data);
        //                dispatch(setCurrencyAction(foundLocation.code));
      })

      .catch(error => {
        console.error(error);
      });
  };
}

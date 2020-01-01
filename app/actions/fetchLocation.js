import { getItemSync } from '../stores/localStorage';
import { getRequest } from '../utils/api';
// Source: This is absolutely static data
import countryCodes from '../assets/countryCodes.json';
// Source: https://trilliontreecampaign.org/public/v1.1/en/currencies > rates
// This should be changed upon we change the rates api.
import supportedCurrency from '../assets/supportedCurrency.json';
import { find } from 'lodash';
import { setCurrencyAction } from './globalCurrency';

export function fetchLocation() {
  return dispatch => {
    if (!getItemSync('preferredCurrency')) {
      getRequest('public_ipstack')
        .then(data => {
          // console.log('Got location fetch ip', data);
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

import { getItemSync } from '../stores/localStorage';
import { getExternalRequest } from '../utils/api';
import countryCodes from '../assets/countryCodes.json';
import supportedCurrency from '../assets/supportedCurrency.json';
import { find } from 'lodash';
import { setCurrencyAction } from './globalCurrency';

export function fetchLocation() {
  return dispatch => {
    if (!getItemSync('preferredCurrency')) {
      getExternalRequest()
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

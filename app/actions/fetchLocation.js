import { getItemSync } from '../stores/localStorage';
import { getRequest } from '../utils/api';
// Source: This is absolutely static data
import countryCodes from '../assets/countryCodes.json';
// Source: https://trilliontreecampaign.org/public/v1.1/en/currencies > rates
// This should be changed upon we change the rates api.
import supportedCurrency from '../assets/supportedCurrency.json';
import { find } from 'lodash';
import { setCurrencyAction } from './globalCurrency';
import { setCdnMedia } from '../reducers/configReducer';
let cdnMedia = {};
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
export function getCdnMediaUrl() {
  return cdnMedia;
}
export function fetchConfig() {
  return dispatch => {
    // if (!getItemSync('preferredCurrency')) {
    getRequest('config_get')
      .then(data => {
        console.log('Got config fetch data:', data.data);
        cdnMedia = data.data.cdnMedia;
        dispatch(setCdnMedia(data.data.cdnMedia));
      })

      .catch(error => {
        console.error(error);
      });
    // }
  };
}

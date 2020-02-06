import { getItemSync } from '../stores/localStorage';
import { getRequest } from '../utils/api';
// Source: This is absolutely static data
import countryCodes from '../assets/countryCodes.json';
// Source: https://trilliontreecampaign.org/public/v1.1/en/currencies > rates
// This should be changed upon we change the rates api.
import supportedCurrency from '../assets/supportedCurrency.json';
import { find } from 'lodash';
import { setCurrencyAction } from './globalCurrency';
// import { setCdnMedia } from '../reducers/configReducer';
let cdnMedia = {};
let currency = '';
export function fetchLocation() {
  return dispatch => {
    console.log('got preferred currency', getItemSync('preferredCurrency'));
    if (!getItemSync('preferredCurrency')) {
      getRequest('public_ipstack')
        .then(data => {
          console.log('Got location fetch ip', data);
          if (data.data && data.data.countryCode) {
            const foundLocation = find(countryCodes, {
              countryCode: data.data.country_code
            });
            supportedCurrency.includes(foundLocation.code) &&
              dispatch(setCurrencyAction(foundLocation.code));
          }
        })

        .catch(error => {
          console.error(error);
        });
    }
  };
}

export function getCurrency() {
  return currency;
}

export function getCdnMediaUrl() {
  return cdnMedia;
}
export function fetchConfig() {
  return dispatch => {
    // if (!getItemSync('preferredCurrency')) {
    getRequest('config_get')
      .then(data => {
        console.log('============== Got config fetched data:', data.data);
        cdnMedia = data.data.cdnMedia;

        // fake data manipulation for debug purpose, please remove this when debug finishes
        data.data.currency = 'USD';
        // debug code ends

        if (data.data && data.data.currency) {
          currency = data.data.currency;
          supportedCurrency.includes(data.data.currency) &&
            dispatch(setCurrencyAction(data.data.currency));
        } else {
          dispatch(fetchLocation());
        }
        // for now we are not storing those in redux, please uncomment this when you need these urls in your components
        // dispatch(setCdnMedia(data.data.cdnMedia));
      })

      .catch(error => {
        console.error(error);
      });
    // }
  };
}

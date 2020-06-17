import { getItemSync } from '../stores/localStorage';
import { getRequest } from '../utils/api';
import { debug } from '../debug';
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
let webMapIds = {};
let appVersions = {};

export async function fetchLocation() {
  if (!getItemSync('preferredCurrency')) {
    getRequest('public_ipstack')
      .then(res => {
        debug('Got location fetch ip', res.data);
        const foundLocation = find(countryCodes, {
          countryCode: res.data.country_code
        });
        supportedCurrency.includes(foundLocation.code) &&
          setCurrencyAction(foundLocation.code);
      })

      .catch(error => {
        console.error(error);
      });
  }
}

export function getCurrency() {
  return currency;
}

export function getCdnMediaUrl() {
  return cdnMedia;
}

export function getWebMapIds() {
  return webMapIds;
}

export function getAppVersions() {
  return appVersions;
}

export async function fetchConfig() {
  // if (!getItemSync('preferredCurrency')) {
  await getRequest('config_get')
    .then(res => {
      debug('Got config fetch data:', res.data);
      cdnMedia = res.data.cdnMedia;
      webMapIds = res.data.webMapIds;
      appVersions = res.data.appVersions;
      // Test outdates app addding these values:
      // appVersions.ios[0]='1.3.5';
      // appVersions.android[0]='1.3.5';

      // fake data manipulation for debug purpose, please remove this when debug finishes
      // data.data.currency = 'USD';
      // debug code ends

      if (res.data && res.data.currency) {
        currency = res.data.currency;
        supportedCurrency.includes(res.data.currency) &&
          setCurrencyAction(res.data.currency);
      } else {
        fetchLocation();
      }
      // for now we are not storing those in redux, please uncomment this when you need these urls in your components
      // setCdnMedia(data.data.cdnMedia);
    })

    .catch(error => {
      console.error(error);
    });
  // }
}

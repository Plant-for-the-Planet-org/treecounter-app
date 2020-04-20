// import { debug } from '../debug';
import { getLocale, localeObjects } from '../actions/getLocale';
import { Intl } from '../locales/Intl';
import i18n from '../locales/i18n.js';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export function delimitNumbers(str) {
  if (!isNaN(parseInt(str))) return formatNumber(str);
  else return str;
}

export function delimitNumbersStr(str) {
  return (str + '').replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
    return (
      (b.charAt(0) > 0 && !(c || '.').lastIndexOf('.')
        ? b.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
        : b) + c
    );
  });
}

export function formatNumber(data, locale, currency, userProfile, currencies) {
  locale = locale || getLocale();
  try {
    let style = { maximumFractionDigits: 2 };
    // debug('got numberformat', data, locale, currency, style, userProfile);
    if (currency) {
      style.style = 'currency';
      style.currency = currency;
      //debug('cu', currency, userProfile);
      if (userProfile && userProfile.currency) {
        style.currency = userProfile.currency;
        if (
          currencies &&
          currencies.currencies &&
          currencies.currencies.currency_rates[currency]
        ) {
          data =
            currencies.currencies.currency_rates[currency].rates[
              userProfile.currency
            ] * data;
        } else {
          style.currency = currency;
        }
      }
    }
    // debug('got numberformat', data, locale, currency, style, userProfile);
    return new Intl.NumberFormat(locale, style).format(data);
  } catch (error) {
    console.error(error);
    return data;
  }
}

export function formatDate(date, style = 'dd MMM yyyy', locale) {
  locale = locale || getLocale();
  //debug('formatDate', date, style, locale);

  if (date) {
    return format(parseISO(date), style, {
      locale: localeObjects[locale]
    });
  } else {
    return '';
  }
}

function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone';
  }

  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS';
  }

  return 'unknown';
}

export function isIOS() {
  return getMobileOperatingSystem() == 'iOS';
}

export function isAndroid() {
  return getMobileOperatingSystem() == 'Android';
}

export function convertNumber(number, useDigits) {
  if (isNaN(number) || undefined) {
    return 0;
  }

  const numDigits = ('' + number).length;
  // use number name starting at millions with 7 digits
  let digitsInGroup = 0;
  if (numDigits > 6) {
    digitsInGroup = numDigits - 1;
    digitsInGroup -= digitsInGroup % 3;
  }

  let pow = Math.pow;
  let powerOfUsedDigits = pow(10, useDigits);
  let roundedNumber =
    Math.round(number * powerOfUsedDigits / pow(10, digitsInGroup)) /
    powerOfUsedDigits;
  let isSingular = roundedNumber == 1 ? 1 : 0;
  return (
    delimitNumbers(roundedNumber) +
    [
      '',
      ' ' +
        (isSingular
          ? i18n.t('label.thousand_singular')
          : i18n.t('label.thousand_plural')),
      ' ' +
        (isSingular
          ? i18n.t('label.million_singular')
          : i18n.t('label.million_plural')),
      ' ' +
        (isSingular
          ? i18n.t('label.billion_singular')
          : i18n.t('label.billion_plural')),
      ' ' +
        (isSingular
          ? i18n.t('label.trillion_singular')
          : i18n.t('label.trillion_plural')),
      ' ' +
        (isSingular
          ? i18n.t('label.quadrillion_singular')
          : i18n.t('label.quadrillion_plural')),
      ' ' +
        (isSingular
          ? i18n.t('label.quintillion_singular')
          : i18n.t('label.quintillion_plural'))
    ][digitsInGroup / 3]
  );
}

/* FlatList requires a data object with items containing a string value for every id attribute
   This function converts an existing id attribute from number to string
*/
export function convertNumIdToString(object) {
  return object.map(item => {
    return {
      ...item,
      id: item.id + ''
    };
  });
}

import { getLocale } from '../actions/getLocale';
import { Intl } from '../locales/Intl';
import i18n from '../locales/i18n.js';

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

export function formatNumber(data, locale, currency) {
  locale = locale || getLocale();
  try {
    let style = { maximumFractionDigits: 2 };
    if (currency) {
      style.style = 'currency';
      style.currency = currency;
    }
    // console.log('got numberformat', data, locale, currency, style)
    return new Intl.NumberFormat(locale, style).format(data);
  } catch (error) {
    console.error(error);
    return data;
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

export function convertNumber(n, d) {
  if (isNaN(n) || undefined) {
    return 0;
  }
  let x = ('' + n).length - 1;
  x -= x % 3;
  let p = Math.pow;
  d = p(10, d);
  let rounded = Math.round(n * d / p(10, x)) / d;
  let singular = rounded == 1 ? 1 : 0;
  return (
    delimitNumbers(rounded) +
    [
      '',
      ' ' +
        (singular
          ? i18n.t('label.thousand_singular')
          : i18n.t('label.thousand_plural')),
      ' ' +
        (singular
          ? i18n.t('label.million_singular')
          : i18n.t('label.million_plural')),
      ' ' +
        (singular
          ? i18n.t('label.billion_singular')
          : i18n.t('label.billion_plural')),
      ' ' +
        (singular
          ? i18n.t('label.trillion_singular')
          : i18n.t('label.trillion_plural')),
      ' ' +
        (singular
          ? i18n.t('label.quadrillion_singular')
          : i18n.t('label.quadrillion_plural')),
      ' ' +
        (singular
          ? i18n.t('label.quintillion_singular')
          : i18n.t('label.quintillion_plural'))
    ][x / 3]
  );
}

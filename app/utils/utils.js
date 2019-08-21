import { getLocale } from '../actions/getLocale';
import { Intl } from '../locales/Intl';

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

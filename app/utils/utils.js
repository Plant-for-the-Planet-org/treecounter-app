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

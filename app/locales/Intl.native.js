// polyfill for Intl
// https://github.com/andyearnshaw/Intl.js/

import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/de';

export { default as Intl } from 'intl';

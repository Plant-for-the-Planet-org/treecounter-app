// polyfill for Intl
// https://github.com/andyearnshaw/Intl.js/

import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/de';
import 'intl/locale-data/jsonp/es';
import 'intl/locale-data/jsonp/pt';
import 'intl/locale-data/jsonp/pt-BR';

export { default as Intl } from 'intl';

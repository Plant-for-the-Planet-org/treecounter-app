import moment from 'moment';
import 'moment/min/locales';
import i18n from '../../../locales/i18n.js';
import { getLocale } from '../../../actions/getLocale';

const parseMonth = month => {
  moment.locale(getLocale());
  return moment.months(month);
};

export default parseMonth;

import moment from 'moment';
import 'moment/min/locales';
import i18n from '../../../locales/i18n.js';

const parseMonth = month => {
  moment.locale(i18n.language);
  return moment.months(month);
};

export default parseMonth;

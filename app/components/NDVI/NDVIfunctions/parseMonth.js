import moment from 'moment';
import 'moment/min/locales';
import i18n from '../../../locales/i18n.js';

const parseMonth = month => {
  moment.locale(
    i18n.language.indexOf('-') === -1
      ? i18n.language
      : i18n.language.substr(0, i18n.language.indexOf('-'))
  );
  return moment.months(month);
};

export default parseMonth;

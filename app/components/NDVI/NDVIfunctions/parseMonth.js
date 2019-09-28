import moment from 'moment';
import 'moment/min/locales';
import { getLocale } from '../../../actions/getLocale';

const parseMonth = month => {
  moment.locale(getLocale());
  return moment.months(month);
};

export default parseMonth;

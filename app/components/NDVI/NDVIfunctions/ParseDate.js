import moment from 'moment';
import 'moment/min/locales';
import i18n from '../../../locales/i18n.js';

const ParseDate = (month, year) => {
  moment.locale(i18n.language);
  let addingDays = 30; // multiplification day for finding the highest day of the current month
  let mockDate = ''; // build a mock date
  let minDateMonth = moment(mockDate).format('M');
  let maxDateMonth = moment(mockDate)
    .add(addingDays, 'days')
    .format('M');

  if (month < 10) {
    mockDate = year + '-0' + month + '-01';
  } else {
    mockDate = year + '-' + month + '-01';
  }

  while (maxDateMonth !== minDateMonth) {
    addingDays -= 1;
    maxDateMonth = moment(mockDate)
      .add(addingDays, 'days')
      .format('M');
  }

  let storeDateInArray = moment(mockDate)
    .add(addingDays, 'days')
    .format('LL')
    .split(' ');
  let monthInWords = storeDateInArray[0];

  return (
    monthInWords + ' 1 - ' + monthInWords + ' ' + storeDateInArray[1] + year
  );
};

export default ParseDate;

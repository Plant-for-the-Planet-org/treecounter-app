import moment from 'moment';
import 'moment/min/locales';
import { getLocale } from '../../../actions/getLocale';

const parseDate = (month, year) => {
  const saveBrowserLanguage = moment.locale(getLocale());

  let simulatedDate = simulateDate(year, month); // simulate a date
  let returnDate = returnLastDayOfTheMonth(simulatedDate); // output: ["month", "day,", "year"]

  if (saveBrowserLanguage === 'de') {
    return (
      returnDate[1] +
      ' 1 - ' +
      returnDate[0].substr(0, returnDate[0].length - 1) +
      ' ' +
      returnDate[1] +
      `, ` +
      year
    );
  } else {
    return (
      returnDate[0] + ' 1 - ' + returnDate[0] + ' ' + returnDate[1] + ` ` + year
    );
  }
};

const simulateDate = (year, month) => {
  let mockDate = ''; // build a mock date
  if (month < 10) {
    mockDate = year + '-0' + month + '-01';
  } else {
    mockDate = year + '-' + month + '-01';
  }

  return mockDate;
};

const returnLastDayOfTheMonth = simulatedDate => {
  let addingDays = 30; // multiplification day for finding the highest day of the current month
  let minDateMonth = moment(simulatedDate).format('M');
  let maxDateMonth = moment(simulatedDate)
    .add(addingDays, 'days')
    .format('M');

  while (maxDateMonth !== minDateMonth) {
    addingDays -= 1;
    maxDateMonth = moment(simulatedDate)
      .add(addingDays, 'days')
      .format('M');
  }

  return moment(simulatedDate)
    .add(addingDays, 'days')
    .format('LL')
    .split(' ');
};

export default parseDate;

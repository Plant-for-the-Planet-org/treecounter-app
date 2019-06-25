import { SuggestionsRange } from './SuggestionsRange';
//Move it to theme utils
export const getRGBColor = function(rgbColor) {
  if (rgbColor.hasOwnProperty('color')) {
    return `rgba(${rgbColor.color[0]},${rgbColor.color[1]},${
      rgbColor.color[2]
    },${rgbColor.valpha})`;
  }
  return rgbColor;
};

export const WEEK_DAYS = {
  Sunday: 'S',
  Monday: 'M',
  Tuesday: 'T',
  Wednesday: 'W',
  Thursday: 'T',
  Friday: 'F',
  Saturday: 'S'
};

export const DEFAULT_SELECTED_RANGE = {
  yesterday: 'Yesterday',
  last_7_days: 'Last 7 Days',
  last_30_days: 'Last 30 Days',
  last_90_days: 'Last 90 Days',
  last_120_days: 'Last 120 Days',
  last_365_days: 'Last 365 Days'
};
//The Array Date type we are using for dates is of size 3 where [0] : year, [1]: month, [2]: day
export const invalidDateArray = [undefined, undefined, undefined];

/**
 * A utility method to test the no of days in range are valid as per the configuration or not
 * @utility
 *
 */
export const isCorrectIntervalCount = (
  minIntervalDays,
  maxIntervalDays,
  startDate,
  endDate
) => {
  const intervalDays = Math.abs(
    dateDiff(startDate, endDate) / (60 * 60 * 24 * 1000)
  );
  if (minIntervalDays && intervalDays < minIntervalDays - 1) {
    return false;
  }
  if (maxIntervalDays && intervalDays > maxIntervalDays - 1) {
    return false;
  }
  return true;
};

export const getValidDateFormat = (dateFormat, separator = '/') => {
  let valid = 'DD/MM/YYYY';
  if (!!dateFormat) {
    dateFormat = dateFormat.toUpperCase();
    const dateSplitArray = dateFormat.split(separator);
    if (
      !!dateSplitArray &&
      dateSplitArray.length == 3 &&
      dateSplitArray.indexOf('DD') != -1 &&
      dateSplitArray.indexOf('MM') != -1 &&
      dateSplitArray.indexOf('YYYY') != -1
    ) {
      valid = dateFormat;
    } else {
      console.warn(
        'Calendar:',
        'Please enter Valid date format like DD/MM/YYYY or MM/DD/YYYY'
      );
    }
  }
  return valid;
};

export const validateStartEndDate = (props, state) => {
  let startLimit =
    props.startLimit instanceof Date
      ? props.startLimit
      : console.warn('startLimit:' + Warnings.dateType) || getRelativeDate();
  let endLimit =
    props.endLimit instanceof Date
      ? props.endLimit
      : console.warn('endDate:' + Warnings.dateType) ||
        getRelativeDate(new Date(), -5);

  if (startLimit > endLimit) {
    console.warn(Warnings.endLimit);
    startLimit = getRelativeDate();
    endLimit = getRelativeDate(new Date(), -5);
  }
  return { startLimit, endLimit };
};

export const validateAndMapAllProps = (props, state, isSingle) => {
  console.log('__validateAndMapAllProps__', state);
  return {
    ...validateStartEndDate(props, state),
    referenceDate:
      props.referenceDate instanceof Date
        ? props.referenceDate
        : console.warn('referenceDate:' + Warnings.dateType) ||
          getDateWithinRange(new Date(), props.endLimit, props.startLimit),
    isSuggestionsLeft:
      props.suggestionsPosition.toUpperCase() == 'LEFT'
        ? true
        : props.suggestionsPosition.toUpperCase() == 'RIGHT'
          ? false
          : console.warn(Warnings.suggestionsPosition) || true,
    isSingleMode: isSingle
      ? true
      : props.mode.toUpperCase() == 'INTERVAL'
        ? false
        : console.warn(Warnings.calendarMode) || true,
    highlightedDates:
      props.highlightedDates instanceof Array
        ? props.highlightedDates
        : console.warn(Warnings.highlightedDates) || [],
    disabledDates:
      props.disabledDates instanceof Array
        ? props.disabledDates
        : console.warn(Warnings.disableDates) || [],
    datePickerBorder: props.datePickerBorder
      ? props.datePickerBorder
      : state.calendarTheme.datePickerBorder,
    suggestionsEntries: isSingle
      ? []
      : props.suggestionsEntries
        ? props.suggestionsEntries
        : createDefaultSuggestionsRange(props.I18nProvider),
    collapsedDataFormat: getValidDateFormat(props.collapsedDataFormat),
    label: props.label
      ? props.label
      : props.I18nProvider.Texti18n('calendar_header_date') || 'Date',
    minIntervalDays: !props.minIntervalDays
      ? undefined
      : typeof props.minIntervalDays == 'number' && props.minIntervalDays > 0
        ? props.minIntervalDays
        : console.warn('minIntervalDays:' + Warnings.numberType) && undefined,
    maxIntervalDays: !props.maxIntervalDays
      ? undefined
      : typeof props.maxIntervalDays == 'number' && props.maxIntervalDays > 0
        ? props.maxIntervalDays
        : console.warn('maxIntervalDays:' + Warnings.numberType) && undefined
  };
};

export const Warnings = {
  dateType:
    'Invalid Date type, please provide Date Object like this new Date(2019, 1, 5)',
  calendarMode: 'Invalid mode provided, expected value SINGLE or INTERVAL',
  endLimit: 'End limit cannot be greater than startLimit',
  suggestionsPosition:
    'Invalid suggestions menu Position provided, expected value LEFT or RIGHT',
  disableDates:
    'Invalid disableDates props, expected array of {start:Date, end:Date}',
  highlightedDates:
    'Invalid highlightedDates prop, expected array of {start:Date, end:Date}',
  numberType: 'Invalid Number type, please number greater than 0'
};

export const getSuggestionRangeForLocale = (i18Provider, locale) => {
  console.log('getSuggestionRangeForLocale', i18Provider);
  const defaultSelectedRange = Object.keys(DEFAULT_SELECTED_RANGE).map(
    rkey =>
      i18Provider.Texti18n('calendar_' + rkey) || DEFAULT_SELECTED_RANGE[rkey]
  );
  return defaultSelectedRange;
};
export const firstLetterUppercase = string => {
  return string && string.replace(/^\w/, c => c.toLocaleUpperCase());
};

export const getWeekDaysForLocale = locale => {
  let format = new Intl.DateTimeFormat(locale, { weekday: 'narrow' });
  let days = [];
  let weekDays = Object.keys(WEEK_DAYS);
  for (let day = 0; day < 7; day++) {
    let testDate = new Date(Date.UTC(2017, 9, day + 1, 0, 0, 0));
    days.push(firstLetterUppercase(format.format(testDate)));
  }
  console.log('getWeekDaysForLocale', days);
  return days;
};

export const getMonthsForLocale = locale => {
  let format = new Intl.DateTimeFormat(locale, { month: 'long' });
  let months = [];
  for (let month = 0; month < 12; month++) {
    let testDate = new Date(Date.UTC(2000, month, 1, 0, 0, 0));
    months.push(firstLetterUppercase(format.format(testDate)));
  }
  return months;
};

export const CALENDAR_WEEKS = 6;

export const CALENDAR_MONTHS_30 = [4, 6, 9, 11];

//rangeDateArray should of type [DisbaleDatesrange...]
export const isWithinRange = (date, rangeDatesArray, outInfo = {}) => {
  let withinRange = false;
  if (!!date && !!rangeDatesArray && rangeDatesArray.length > 0) {
    rangeDatesArray.forEach(dateRangeObject => {
      //if no first limit is present return false,
      //if date is equal to startLimit return true,
      //if second date is also present then check
      if (!!dateRangeObject.start) {
        if (isSameDay(date, dateRangeObject.start)) {
          withinRange = true;
          outInfo.title = dateRangeObject.title;
          return;
        }
        if (!!dateRangeObject.end) {
          if (
            date <= dateRangeObject.end &&
            isAfterDay(date, dateRangeObject.start)
          ) {
            outInfo.title = dateRangeObject.title;
            withinRange = true;
            return;
          }
        }
      }
    });
  }
  return withinRange;
};

export const createDefaultSuggestionsRange = function(
  i18Provider,
  referenceDate = new Date()
) {
  const defaultSelectedRange = Object.keys(DEFAULT_SELECTED_RANGE).map(rkey => {
    const title =
      i18Provider.Texti18n('calendar_' + rkey) || DEFAULT_SELECTED_RANGE[rkey];
    switch (rkey) {
      case 'yesterday': {
        return new SuggestionsRange(
          new Date(
            referenceDate.getFullYear(),
            referenceDate.getMonth(),
            referenceDate.getDate() - 1
          ),
          referenceDate,
          title
        );
      }
      case 'last_7_days': {
        return new SuggestionsRange(
          () => {
            return getRelativeDateByDay(referenceDate, -6);
          },
          referenceDate,
          title
        );
      }
      case 'last_30_days': {
        return new SuggestionsRange(
          () => {
            return getRelativeDateByDay(referenceDate, -30);
          },
          referenceDate,
          title
        );
      }
      case 'last_90_days': {
        return new SuggestionsRange(
          () => {
            return getRelativeDateByDay(referenceDate, -90);
          },
          referenceDate,
          title
        );
      }
      case 'last_120_days': {
        return new SuggestionsRange(
          new Date(
            referenceDate.getFullYear(),
            referenceDate.getMonth(),
            referenceDate.getDate() - 120
          ),
          referenceDate,
          title
        );
      }
      case 'last_365_days': {
        return new SuggestionsRange(
          new Date(
            referenceDate.getFullYear(),
            referenceDate.getMonth(),
            referenceDate.getDate() - 365
          ),
          referenceDate,
          title
        );
      }
    }
  });
  return defaultSelectedRange;
};

export const isDate = date => {
  const isDate = Object.prototype.toString.call(date) === '[object Date]';
  const isValidDate = date && !Number.isNaN(+date);
  return isDate && isValidDate;
};

export const getDateISO = (date = new Date()) => {
  return isDate(date)
    ? [date.getFullYear(), date.getMonth() + 1, date.getDate()]
        .map(v => String(v).padStart(2, '0'))
        .join('-')
    : null;
};

export const getDateArray = (date = new Date()) => {
  const [year = null, month = null, day = null] = (getDateISO(date) || '')
    .split('-')
    .map(v => +v);
  return [year, month, day];
};

export const getMonthDays = (date = new Date()) => {
  const [year, month] = getDateArray(date);
  return month === 2
    ? year % 4 === 0
      ? 29
      : 28
    : CALENDAR_MONTHS_30.includes(month)
      ? 30
      : 31;
};

export const getMonthFirstDay = (date = new Date()) => {
  return new Date(new Date(+date).setDate(1)).getDay() + 1;
};

export const getPreviousMonth = (date = new Date()) => {
  const [year, month] = getDateArray(date);
  return {
    month: month > 1 ? month - 1 : 12,
    year: month > 1 ? year : year - 1
  };
};

export const getNextMonth = (date = new Date()) => {
  const [year, month] = getDateArray(date);
  return {
    month: month < 12 ? month + 1 : 1,
    year: month < 12 ? year : year + 1
  };
};

export const dateDiff = (date1, date2 = new Date()) => {
  return isDate(date1) && isDate(date2)
    ? new Date(+date1).setHours(0, 0, 0, 0) -
        new Date(+date2).setHours(0, 0, 0, 0)
    : null;
};

export const getDateWithinRange = (date, maxDate, minDate) => {
  if (!isDate(date)) date = new Date();
  const min = new Date(new Date(+minDate).setDate(1)).setHours(0, 0, 0, 0);
  const max = new Date(
    new Date(+maxDate).setDate(getMonthDays(maxDate))
  ).setHours(23, 59, 59, 999);

  return (date >= min || !minDate) && (date <= max || !maxDate)
    ? date
    : minDate;
};
export const isBeforeDay = (date1, date2) => +dateDiff(date1, date2) < 0;

export const isAfterDay = (date1, date2) => +dateDiff(date1, date2) > 0;

export const isSameDay = (date1, date2) => dateDiff(date1, date2) === 0;

//this will also consider the undefined dates
export const isSameDate = (newDate, oldDate) => {
  if (newDate != oldDate) {
    if (
      (newDate && (!oldDate || newDate.getTime() != oldDate.getTime())) ||
      (oldDate && !newDate)
    ) {
      return false;
    }
  }

  return true;
};

export const isSameDateRange = (intervalDate, oldIntervalDate) => {
  if (intervalDate != oldIntervalDate) {
    oldIntervalDate = oldIntervalDate || {};
    intervalDate = intervalDate || {};

    if (!isSameDate(intervalDate.start, oldIntervalDate.start)) {
      return false;
    }
    if (!isSameDate(intervalDate.end, oldIntervalDate.end)) {
      return false;
    }
  }
  return true;
};

export const isSameMonth = (date1, date2) => {
  return isDate(date1) && isDate(date2)
    ? new Date(+date1).setDate(1) - new Date(+date2).setDate(1) === 0
    : false;
};

export const getRelativeDateByDay = (date = new Date(), relative = -6) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + relative
  );
};
export const getRelativeDate = (date = new Date(), relative = 5) => {
  return new Date(
    date.getFullYear() - relative,
    date.getMonth(),
    date.getDate()
  );
};
export default (date = new Date()) => {
  const monthDays = getMonthDays(date);
  const monthFirstDay = getMonthFirstDay(date);
  const [year, month] = getDateArray(date);
  const daysFromPrevMonth = monthFirstDay - 1;
  const daysFromNextMonth =
    CALENDAR_WEEKS * 7 - (daysFromPrevMonth + monthDays);

  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(date);
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(date);

  const prevMonthDays = getMonthDays(new Date(prevMonthYear, prevMonth - 1));

  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => [
    prevMonthYear,
    prevMonth,
    index + 1 + (prevMonthDays - daysFromPrevMonth),
    index == daysFromPrevMonth - 1 ? -1 : 0
  ]);

  const thisMonthDates = [...new Array(monthDays)].map((n, index) => [
    year,
    month,
    index + 1
  ]);

  const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => [
    nextMonthYear,
    nextMonth,
    index + 1,
    index == 0 ? 1 : 0
  ]);
  const returnArray = [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
  let allDates = [];
  let weekChunks = [];
  for (let monthDay = 0; monthDay < returnArray.length; monthDay++) {
    if (monthDay > 0 && monthDay % 7 == 0) {
      allDates.push(weekChunks);
      weekChunks = [returnArray[monthDay]];
      continue;
    }
    weekChunks.push(returnArray[monthDay]);
  }
  //if last row's first date > (30-6=24) then add that row
  //eg: Dec 2018
  if (weekChunks[0][2] > 24) {
    allDates.push(weekChunks);
  }
  console.log('allDates', allDates);
  return allDates;
};

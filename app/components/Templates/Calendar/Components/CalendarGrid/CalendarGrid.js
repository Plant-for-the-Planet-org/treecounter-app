/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import calendar, {
  isAfterDay,
  isBeforeDay,
  getDateArray,
  isSameDay,
  isSameMonth,
  isDate,
  isWithinRange,
  invalidDateArray,
  getDateWithinRange,
  dateDiff
} from '../../Utils';
import { getRGBColor } from '../../Utils';
import { getStyles } from './style';
import CalendarDay from './CalendarDay';
import DropDown from '../Dropdown/Dropdown';
import { DateRange } from '../../../Calendar/Utils/DateRange';

/**
 * This component represents the Grid of all dates
 *
 */
class CalendarGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...this.stateFromProps(this.props) };
    this._allYears = {};
  }

  static getDerivedStateFromProps(props, state) {
    const { inputDateArray, dateChangeContextData = {} } = props;
    let intervalInputDateArray = {};
    let newMonth =
      (state.inputDateArray &&
        !dateChangeContextData.notChangeMonthContext &&
        inputDateArray[1] != state.inputDateArray[1] &&
        inputDateArray[1]) ||
      state.month;
    let newYear =
      (state.inputDateArray &&
        !dateChangeContextData.notChangeMonthContext &&
        inputDateArray[0] != state.inputDateArray[0] &&
        inputDateArray[0]) ||
      state.year;
    if (!props.isSingleMode && props.secondInputDateArray) {
      intervalInputDateArray['intervalDay'] = props.secondInputDateArray[2];
      intervalInputDateArray['intervalMonth'] =
        props.secondInputDateArray[1] || state.intervalMonth;
      intervalInputDateArray['intervalYear'] =
        props.secondInputDateArray[0] || state.intervalYear;
    }
    console.log('___getDerivedStateFromProps__CalendarGrid', inputDateArray);
    if (inputDateArray) {
      return {
        ...props,
        month: newMonth,
        year: newYear,
        day: inputDateArray[2],
        ...intervalInputDateArray
      };
    }
    return null;
  }

  stateFromProps({
    date = new Date(),
    min,
    max,
    inputDateArray = invalidDateArray
  } = {}) {
    const minDate = isAfterDay(min, max) ? null : min;
    const maxDate = isBeforeDay(max, min) ? null : max;

    const [year, month] = getDateArray(
      getDateWithinRange(date, maxDate, minDate)
    );

    return {
      month: inputDateArray[1] || month,
      year: inputDateArray[0] || year
    };
  }

  /**
   * it will change the current date in calendar grid by call onDateChange of root calendar component
   * for validation
   * @private
   *
   * @param {Date} newDate - A new date selected by userSelect
   * @param {boolean} inMonth - true if newDate selected by user is from month currently active on grid else false
   */
  gotoDate = (newDate, inMonth) => evt => {
    console.log('gotoDate', evt.nativeEvent);
    //removing stop event propagators call from here
    //Now, we are not changing month context on date change from date picker grid

    const { isSingleMode, date, secondInputDateArray } = this.props;
    // If it is interval date picker and user has clicked on previous or next month dates then
    // Dont change month
    let notChangeMonthContext = false;
    if (!isSingleMode && !inMonth && isDate(newDate)) {
      // newDate.setMonth(this.state.month - 1);
      notChangeMonthContext = true;
    }
    console.log(
      '__gotoDate',
      this.props,
      !isSingleMode,
      isDate(date),
      !!(date && date.getTime() != newDate.getTime())
    );
    if (
      !isSingleMode &&
      isDate(date) &&
      (!secondInputDateArray || !secondInputDateArray[2])
    ) {
      this.props.onDateChanged(newDate, false, true, false, {
        notChangeMonthContext
      });
      return;
    }
    if (
      !isSingleMode &&
      !!this.props.date &&
      secondInputDateArray &&
      secondInputDateArray[2]
    ) {
      this.props.onDateChanged(newDate, false, false, true, {
        notChangeMonthContext
      });
      return;
    }
    this.props.onDateChanged(newDate, this.props.isSingleMode, false, false, {
      notChangeMonthContext
    });
  };

  /**
   * This will will create dates list/entry based on current year and month of grid
   * @private
   *
   */
  getCalendarDates = () => {
    const { month, year } = this.state;
    const defaultDate = getDateWithinRange(
      new Date(),
      this.props.min,
      this.props.max
    );
    const calendarDate = new Date(
      year || defaultDate.getFullYear(),
      !!month ? month - 1 : defaultDate.getMonth() - 1
    );
    return calendar(calendarDate);
  };

  /**
   * Handle change in month drop down event
   * @private
   * @param {String} title - title of drop down item
   * @param {String} id= index+1- id of drop down item
   * @param {String} index - index of drop down items list
   **/
  handleMonthChange = (title, id, key) => {
    this.setState({ month: id });
  };

  /**
   * Handle change in year drop down event
   * @private
   * @param {String} title - title of drop down item
   * @param {String} id= index+1- id of drop down item
   * @param {String} index - index of drop down items list
   *
   **/
  handleYearChange = (title, id, key) => {
    this.setState({ year: title });
  };

  /**
   * A utility method that will create the entries of Year Drop down
   * keeping min and max limit of calendar
   * this will also cached the last builded entries to avoid re-creation if query remain same
   * @private
   **/
  buildYearsList = () => {
    const { min, max } = this.props;
    const diff = max.getFullYear() - min.getFullYear();

    const query = '' + diff + min.getFullYear();
    console.log(min, max, diff, query);
    if (!!this._allYears[query]) {
      return this._allYears[query];
    }
    const allYears = [...new Array(diff + 1)].map(
      (n, index) => index + min.getFullYear()
    );
    this._allYears[query] = allYears;

    return allYears;
  };

  /**
   * This will return the month and Year container UI to render in calendar grid
   * @private
   **/
  renderMonthAndYear = styles => {
    const allYears = this.buildYearsList();
    const selectedYear = allYears.indexOf(parseInt(this.state.year));
    return (
      <div style={{ ...styles.grid, marginBottom: 20 }}>
        <div style={styles.month}>
          <DropDown
            calendarTheme={this.props.calendarTheme}
            list={this.props.months}
            selected={this.state.month - 1}
            onChange={this.handleMonthChange}
          />
        </div>

        <div style={styles.month}>
          <DropDown
            calendarTheme={this.props.calendarTheme}
            list={allYears}
            selected={selectedYear >= 0 ? selectedYear : 0}
            onChange={this.handleYearChange}
            headerStyle={{ justifyContent: 'space-between' }}
          />
        </div>
      </div>
    );
  };

  /**
   * This will return the week Days Labels container UI to render in calendar grid
   * @private
   * @param {String} day - initial of day name eg S of Sunday
   * @param {number} index - index of that day
   **/
  renderDayLabels = (day, index) => {
    const dayLabel = this.props.weekDays[day].toUpperCase();
    const labelTextColor = getRGBColor(
      this.props.calendarTheme.textInputLabelColor
    );
    return (
      <CalendarDay
        key={index + dayLabel}
        calendarTheme={this.props.calendarTheme}
        enableHover={false}
        textInputColor={labelTextColor}
      >
        {dayLabel}
      </CalendarDay>
    );
  };

  /**
   * This will return true if provided date is out of min or max interval range provided by consumer
   * Eg: if user has provided min 3 days in interval range and user has selected 17th date of any month
   * the this will return false for 16 and 18th date of that month else true
   * @private
   * @param {Date} calendarDay - calendar Day as Date object
   **/
  isOutOfMinMaxIntervalRange = calendarDay => {
    const {
      isSingleMode,
      date,
      secondInputDateArray,
      minIntervalDays,
      maxIntervalDays
    } = this.props;
    if (
      !isSingleMode &&
      isDate(calendarDay) &&
      isDate(date) &&
      (!secondInputDateArray || !secondInputDateArray[2])
    ) {
      const dateDifference = Math.abs(dateDiff(date, calendarDay) / 86400000);
      console.log('dateDiff', dateDifference);
      if (maxIntervalDays > -1 && dateDifference > maxIntervalDays - 1) {
        return true;
      }
      if (minIntervalDays > -1 && dateDifference < minIntervalDays - 1) {
        return true;
      }
    }
    return false;
  };

  /**
   * This will return the UI for individual day of calendar grid
   * This is the kind of props provider of <CalendarDay></CalendarDay> component
   * The Make-up configuration provider of calendar component
   * Take care of this like a small kid, this can make you cry if not treated well
   * @private
   * @param {Date} calendarDay - calendar Day as Date object
   * @param {number} Index - index of this date in a row
   **/
  renderCalendarDate = (date, index) => {
    const {
      month,
      year,
      intervalDay,
      intervalMonth,
      intervalYear
    } = this.state;
    const { disabledDates, highlightedDates, min, max } = this.props;
    const labelTextColor = getRGBColor(
      this.props.calendarTheme.textInputLabelColor
    );
    const thisDay = new Date(date[0], date[1] - 1, date[2]);
    const validInputDate = isDate(this.props.date)
      ? this.props.date
      : new Date(year, month - 1, this.props.inputDateArray[2]);
    const intervalDate = new Date(
      intervalYear || date[0],
      !!intervalMonth ? intervalMonth - 1 : month - 1,
      intervalDay
    );
    const monthFirstDay = new Date(year, month - 1);
    const isReferenceDate =
      !!this.props.referenceDate &&
      isSameDay(thisDay, this.props.referenceDate);
    const inMonth = !!(month && year) && isSameMonth(thisDay, monthFirstDay);
    const inRange = !(isBeforeDay(thisDay, min) || isAfterDay(thisDay, max));
    let outInfo = {};
    const isSpecialDate = isWithinRange(thisDay, highlightedDates, outInfo);
    const isDisabled =
      isWithinRange(thisDay, disabledDates) ||
      !inRange ||
      (!isSameDay(thisDay, validInputDate) &&
        this.isOutOfMinMaxIntervalRange(thisDay));
    const isIntervalRange =
      !this.props.isSingleMode &&
      intervalDay &&
      !isBeforeDay(thisDay, validInputDate) &&
      !isAfterDay(thisDay, intervalDate) &&
      !isSameDay(validInputDate, intervalDate);
    const isLastRangeDate = isSameDay(thisDay, validInputDate);
    const isFirstRangeDate = isSameDay(thisDay, intervalDate);
    const isSelected =
      (!!validInputDate && isLastRangeDate) ||
      (!this.props.isSingleMode && intervalDay && isFirstRangeDate);
    const lastMontLastDate = !!date[3] && date[3] == -1; //&& !isLastRangeDate;
    const nextMonthFirstDate = !!date[3] && date[3] == 1; // && !isFirstRangeDate;
    const title = outInfo.title;

    return (
      <CalendarDay
        title={title}
        calendarTheme={this.props.calendarTheme}
        isDisabled={isDisabled}
        key={index}
        referenceDate={isReferenceDate}
        onClick={this.gotoDate(thisDay, inMonth)}
        inMonth={inMonth}
        isRange={isIntervalRange}
        lastMontLastDate={lastMontLastDate}
        nextMonthFirstDate={nextMonthFirstDate}
        selectedMode={
          !this.props.isSingleMode
            ? thisDay > validInputDate
              ? 'Right'
              : 'Left'
            : lastMontLastDate
              ? 'Right'
              : 'Left'
        }
        selected={isSelected}
        textInputColor={isDisabled ? labelTextColor : ''}
        isSpecialDate={isSpecialDate}
        isSingleMode={this.props.isSingleMode}
        showNeighborMonthDates={this.props.showNeighborMonthDates}
        index={index}
      >
        {thisDay.getDate()}
      </CalendarDay>
    );
  };

  /**
   * A React life cycle Method
   * We are rendering following things here
   * <renderMonthAndYear></renderMonthAndYear>
   * <renderDayLabels>Row of week days initial</renderDayLabels>
   * <renderCalendarDate/>
   *
   */
  render() {
    const {
      calendarTheme,
      isSingleMode,
      classes,
      weekDays,
      suggestions
    } = this.props;
    let styles = getStyles(calendarTheme, suggestions, isSingleMode);
    return (
      <div tabIndex={'-1'} style={{ ...styles.root }}>
        {this.renderMonthAndYear(styles)}
        <div style={{ ...styles.grid, marginBottom: 10 }}>
          {Object.keys(weekDays).map((date, index) =>
            this.renderDayLabels(date, index, classes)
          )}
        </div>
        <React.Fragment>
          {this.getCalendarDates().map((dates, index) => (
            <div style={{ ...styles.grid }} key={'__weekChunks' + index}>
              {dates.map((date, index1) =>
                this.renderCalendarDate(date, index1)
              )}
            </div>
          ))}
        </React.Fragment>
      </div>
    );
  }
}

CalendarGrid.defaultProps = {
  inputDateArray: invalidDateArray,
  secondInputDateArray: invalidDateArray
};
CalendarGrid.propTypes = {
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
  date: PropTypes.instanceOf(Date),
  onDateChanged: PropTypes.func,
  isSingleMode: PropTypes.bool,
  weekDays: PropTypes.any,
  referenceDate: PropTypes.instanceOf(Date),
  secondInputDate: PropTypes.instanceOf(Date),
  inputDateArray: PropTypes.array,
  secondInputDateArray: PropTypes.array,
  showNeighborMonthDates: PropTypes.bool,
  highlightedDates: PropTypes.arrayOf(PropTypes.instanceOf(DateRange)),
  disabledDates: PropTypes.arrayOf(PropTypes.instanceOf(DateRange)),
  suggestions: PropTypes.bool,
  dateChangeContextData: PropTypes.any,
  minIntervalDays: PropTypes.number,
  maxIntervalDays: PropTypes.number
};

export default CalendarGrid;

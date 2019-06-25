import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import DateInputField from './Components/DateInputField/DateInputField';
import DatePicker from './Components/DatePicker';

import {
  getMonthsForLocale,
  getWeekDaysForLocale,
  getDateArray,
  getRelativeDate,
  getDateWithinRange,
  isBeforeDay,
  isAfterDay,
  invalidDateArray,
  isDate,
  isWithinRange,
  validateAndMapAllProps,
  isCorrectIntervalCount,
  isSameDateRange
} from './Utils';
import { SuggestionsRange } from './Utils/SuggestionsRange';
import { buildCalendarThemeInfo } from './Utils/themeUtils';
import { DateRange } from './Utils/DateRange';
import { getStyles } from './style';

/**
 * A Reusable Calendar Component
 * Z-Index range of this component is -10 to 100
 *
 */
class CalendarClass extends React.PureComponent {
  /**
   * Constructor of Calendar Component
   */
  constructor(props) {
    super(props);
    console.log(typeof props.icon, 'testType');
    this.state = {
      pickerVisibility: false,
      inputDate: undefined,
      inputDateArray: invalidDateArray, //The Array Date type we are using for dates is of size 3 where [0] : year, [1]: month, [2]: day
      secondInputDateArray: invalidDateArray,
      hasError: false,
      errorMsg: '',
      calendarTheme: buildCalendarThemeInfo(props.theme)
    };
    this._calendarRef = React.createRef();
    this._dateInputRef = React.createRef();
    //Register all global event listener  here
    document.addEventListener('click', this._handleOutsideClick, false);
    document.addEventListener('keydown', this._handleKeydown, false);
    document.addEventListener('paste', this._handlePasteEvent);
    document.addEventListener('copy', this._handleCopyEvent);
    console.log('___Current__Theme__', props.theme);
  }

  static getDerivedStateFromProps(props, state) {
    console.log('___getDerivedStateFromProps', props);
    const isSingle = props.mode.toUpperCase() == 'SINGLE';
    let dateInput = {};
    if (
      isSingle &&
      props.startDate &&
      (!state.startDate ||
        props.startDate.getTime() != state.startDate.getTime())
    ) {
      dateInput.inputDate = props.startDate;
      dateInput.inputDateArray = getDateArray(props.startDate);
    }

    if (!isSingle && !isSameDateRange(props.intervalDate, state.intervalDate)) {
      dateInput.inputDate = props.intervalDate.start;
      dateInput.inputDateArray =
        (props.intervalDate.start && getDateArray(props.intervalDate.start)) ||
        invalidDateArray;
      dateInput.secondInputDate = props.intervalDate.end;
      dateInput.secondInputDateArray =
        (props.intervalDate.end && getDateArray(props.intervalDate.end)) ||
        invalidDateArray;
    }

    if (props.theme != state.theme) {
      dateInput.calendarTheme = buildCalendarThemeInfo(props.theme);
    }
    return {
      ...props,
      ...validateAndMapAllProps(props, state, isSingle),
      ...dateInput
    };
  }

  /**
   * This will reset the dates of calendar to initial state
   * @private
   */
  _resetDateState = (forced = false) => {
    const { inputDate, secondInputDate } = this.state;
    const bothDatesAreAlreadyFalse = !inputDate && !secondInputDate;

    //this method will reset only if it is forced reset or
    //both dates should not be in reset state i.e undefined
    if (forced || !(!inputDate && !secondInputDate)) {
      this.setState(
        {
          inputDate: undefined,
          inputDateArray: invalidDateArray,
          hasError: false,
          errorMsg: '',
          secondInputDate: undefined,
          secondInputDateArray: invalidDateArray
        },
        this.handleOnDateChange
      );
    }
  };

  /**
   * This will hide the date picker
   * @private
   * @param {event} date - triggering native event to close the picker, could be undefined
   *
   */
  _hideDatePicker = event => {
    this.showPicker(false);
    this._dateInputRef.current.handleBlur(event);
    const { secondInputDate, inputDate } = this.state;
    //if it is interval date range and end date or start dates are invalid then just reset the dates
    if (
      !this.state.isSingleMode &&
      (!isDate(secondInputDate) || !isDate(inputDate))
    ) {
      this._resetDateState();
    }
  };

  /**
   * The global key down event handler
   * @private
   * @param {event} event - a key down event
   *
   */
  _handleKeydown = event => {
    event = event || window.event;
    this._dateInputRef.current.handleGlobalKeyPress &&
      this._dateInputRef.current.handleGlobalKeyPress(event);
    if (event.keyCode == 27 || event.key == 'Escape') {
      this._hideDatePicker(event);
    }
  };

  /**
   * The global click event handler
   * @private
   * @param {event} event - a click event
   *
   */
  _handleOutsideClick = event => {
    //ignore all event happing inside calendar widget
    //TODO we should use path property of event to iterate all elements but as of now,
    //it is non-standard property
    if (this._calendarRef.current.contains(event.target)) {
      return;
    }
    console.log(
      '___handleOutsideClick',
      event.target,
      this._calendarRef.current
    );
    this._hideDatePicker(event);
  };

  /**
   * The global paste event handler
   * @private
   * @param {event} event - a paste event
   *
   */
  _handlePasteEvent = event => {
    //if this event is not intended for this calender then do nothing
    if (!this._calendarRef.current.contains(event.target)) {
      return;
    }
    this._dateInputRef.current.handlePasteEvent &&
      this._dateInputRef.current.handlePasteEvent(event);
  };

  /**
   * The global copy event handler
   * @private
   * @param {event} event - a paste event
   *
   */
  _handleCopyEvent = event => {
    //if this event is not intended for this calender then do nothing
    if (!this._calendarRef.current.contains(event.target)) {
      return;
    }
    this._dateInputRef.current.handleCopyEvent &&
      this._dateInputRef.current.handleCopyEvent(event);
  };

  /**
   * This will change the visibility state of date Picker
   * @param {boolean} pickerVisibility - true to show the date picker else hide date picker
   *
   */
  showPicker = pickerVisibility => {
    if (this.state.pickerVisibility != pickerVisibility) {
      setTimeout(() => this.setState({ pickerVisibility }), 0);
    }
  };

  /**
   *A utility to normalize the date Array according to previous state dateArray
   *i.e if date input range is invalidate then we will switch the date with each other i.e
   *if user enter second date smaller than first date then we will normalize the second input as
   *per last state of first date and update the first date input
   * @param {boolean} dateArray - true to show the date picker else hide date picker
   * @deprecated see file history for earlier requirements and usage
   *
   */
  normalizeDateArray = (dateArray, date, referenceDateArray) => {
    dateArray[0] = !!referenceDateArray[0] ? date.getFullYear() : dateArray[0];

    dateArray[1] = !!referenceDateArray[1] ? date.getMonth() + 1 : dateArray[1];

    dateArray[2] = !!referenceDateArray[2] ? date.getDate() : dateArray[2];
  };

  /**
   * A Date change handler: It will Validate and change in from Date inputs or Date picker
   * This is one of the critical section of this widgets
   * @param {Date | Array} date - A New date it could be Date or Array of [Year, Month, Day]
   * @param {Boolean} hidePicker - Show or hide date picker after date change
   * @param {Boolean} isIntervalRange - true if it is second date input of interval range else false
   * @param {Boolean} invalidateIntervalRange - if true it will clear the second date of interval range
   * @param {any} returnContextData - any context related info callee want to receive in props after dateChange
   * @param {Boolean} fromPicker - true if date picker pop up is calling onDateChange,
   */
  onDateChanged = (
    date,
    hidePicker = true,
    isIntervalRange = false,
    invalidateIntervalRange = false,
    returnContextData = {},
    //Always keep this formPicker as last parameter this should be unknown to other components
    fromPicker = false
  ) => {
    const {
      secondInputDate,
      inputDate,
      secondInputDateArray,
      inputDateArray,
      disabledDates,
      isSingleMode,
      minIntervalDays,
      maxIntervalDays
    } = this.state;
    console.log('__ChangeDate', date);
    let hasError = false;
    let errorMsg = '';
    let isSecondDateLessThanFirstDate = false;
    //Not sure  need to confirm, situation is if user try to enter anything in second input date but
    //first date is empty then show error
    if (isIntervalRange && !isDate(inputDate)) {
      hasError = true;
      errorMsg =
        this.props.I18nProvider.Texti18n('calendar_err_invalid_first_date') ||
        'Please enter the start date of interval first';
    }
    const lastDateArray = isIntervalRange
      ? secondInputDateArray
      : inputDateArray;
    const defaultDate = getDateWithinRange(
      new Date(),
      this.props.endLimit,
      this.props.startLimit
    );
    if (hidePicker) {
      this._hideDatePicker();
    }
    let dateArray = [];
    if (date instanceof Date) {
      dateArray = getDateArray(date);
    }

    if (date instanceof Array) {
      for (
        let calendarArrayIndex = 0;
        calendarArrayIndex < 3; //The Array Date type we are using for dates is of size 3 where [0] : year, [1]: month, [2]: day
        calendarArrayIndex++
      ) {
        dateArray[calendarArrayIndex] = date[calendarArrayIndex]
          ? date[calendarArrayIndex] != -1 //if updated date value is -1 thats mean reset it to undefined
            ? date[calendarArrayIndex]
            : undefined
          : lastDateArray[calendarArrayIndex];
      }
      //This is new date could be invalid or auto-correct
      //valid date i.e If we pass 30 Feb 2019 it will get converted into 2 March 2019
      date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    }
    //if date is invalid either due to incomplete inputs then show error
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      hasError = true;
      errorMsg =
        this.props.I18nProvider.Texti18n('calendar_err_incomplete_date') ||
        'Please enter valid value, this field is incomplete or has invalid value';
    } else {
      //If Date array Month is not equal to valid Date month or
      //If Date array Day is not equal to valid Date
      //i.e If we pass 30 Feb 2019 it will get converted into 2 March 2019
      if (
        (dateArray[1] && dateArray[1] - 1 != date.getMonth()) ||
        ((dateArray[2] && dateArray[2] != date.getDate()) ||
          (dateArray[0] && dateArray[0] != date.getFullYear()))
      ) {
        hasError = true;
        errorMsg =
          this.props.I18nProvider.Texti18n('calendar_err_invalid_date') ||
          'Please enter valid value, this field has invalid value';
      }
      //if date is not within provided date limits
      else if (
        isBeforeDay(date, this.props.startLimit) ||
        isAfterDay(date, this.props.endLimit)
      ) {
        hasError = true;
        errorMsg =
          this.props.I18nProvider.Texti18n('calendar_err_invalid_date_limit') ||
          'Please enter valid value, date is not within start and end limit';
      } else if (
        isWithinRange(date, disabledDates) ||
        (!isSingleMode && isWithinRange(secondInputDate, disabledDates))
      ) {
        hasError = true;
        errorMsg =
          this.props.I18nProvider.Texti18n(
            'calendar_err_invalid_date_disabled'
          ) || 'Please enter valid value, you have selected disabled date';
      }
      //if its a interval calendar mode
      else if (!isSingleMode) {
        //if this is second date input change but second input date is less than first date Input
        if (isIntervalRange) {
          isSecondDateLessThanFirstDate =
            !!inputDate && date.getTime() < inputDate.getTime();
          if (
            !isCorrectIntervalCount(
              minIntervalDays,
              maxIntervalDays,
              inputDate,
              date
            )
          ) {
            hasError = true;
            errorMsg =
              this.props.I18nProvider.Texti18n(
                'calendar_err_interval_range_count'
              ) ||
              `Please select valid range, currently min range should be ${minIntervalDays} and
                 max range should be ${maxIntervalDays}`;
          }

          if (
            isWithinRange(date, disabledDates) ||
            isWithinRange(inputDate, disabledDates)
          ) {
            hasError = true;
            errorMsg =
              this.props.I18nProvider.Texti18n(
                'calendar_err_invalid_date_disabled'
              ) || 'Please enter valid value, you have selected disabled date';
          }
        }
        //if this is first date input change but first input date is greater than first date Input
        else {
          invalidateIntervalRange =
            (!!secondInputDate && isAfterDay(date, secondInputDate)) ||
            invalidateIntervalRange;
        }
      }
    }

    if (isSecondDateLessThanFirstDate) {
      //reverse date inputs
      if (fromPicker) {
        this.setState(
          {
            inputDate: date,
            inputDateArray: dateArray,
            hasError,
            errorMsg,
            secondInputDate: inputDate,
            secondInputDateArray: inputDateArray,
            dateChangeContextData: returnContextData
          },
          this.handleOnDateChange
        );
        return;
      }
      hasError = true;
      errorMsg =
        this.props.I18nProvider.Texti18n('calendar_err_incomplete_date') ||
        'Please enter valid value, this field is incomplete or has invalid value';
    }
    if (isIntervalRange && !invalidateIntervalRange) {
      this.setState(
        {
          secondInputDate: date,
          secondInputDateArray: dateArray,
          hasError,
          errorMsg,
          dateChangeContextData: returnContextData
        },
        this.handleOnDateChange
      );
      return;
    }

    if (invalidateIntervalRange) {
      this.setState(
        {
          inputDate: date,
          inputDateArray: dateArray,
          hasError,
          errorMsg,
          secondInputDate: undefined,
          secondInputDateArray: invalidDateArray,
          dateChangeContextData: returnContextData
        },
        this.handleOnDateChange
      );
      return;
    }

    this.setState(
      {
        inputDate: date,
        inputDateArray: dateArray,
        hasError,
        errorMsg,
        dateChangeContextData: returnContextData
      },
      this.handleOnDateChange
    );
  };

  /**
   * A date change handler
   * Should pass this as reference in setState method whenever we are changing date, or dateArray state of component
   * so that it can communicate change in dates to Consumer
   *
   */
  handleOnDateChange = () => {
    this.props.onChange &&
      this.props.onChange({
        startDate: this.state.inputDate,
        endDate: this.state.secondInputDate,
        startDateArray: this.state.inputDateArray,
        endDateArray: this.state.secondInputDateArray,
        valid: !this.state.hasError && isDate(this.state.inputDate)
      });
  };

  /**
   * A blur handler
   * Passing this method as callback to DateInputFiled component
   * Here we are depending on date input field for blur, which has exposed its
   * public API for other components to communicate
   *
   */
  handleOnBlur = () => {
    this.props.onBlur &&
      //State update might be pending on blur so putting 100ms timeout although i can
      //handle all blur even at different location but this is better, here we are depending on
      //date input field for blur, which has exposed its public API for other components to communicate
      setTimeout(() => {
        this.props.onBlur({
          startDate: this.state.inputDate,
          endDate: this.state.secondInputDate,
          startDateArray: this.state.inputDateArray,
          endDateArray: this.state.secondInputDateArray,
          valid: !this.state.hasError && isDate(this.state.inputDate)
        });
      }, 100);
  };

  /**
   * A React life cycle Method
   * We are rendering following things here
   * <Style>{basic css for calendar}</Style>
   * <DateInputFiled/>
   * <DatePicker>
   * <ErrorUI>
   *
   */
  render() {
    console.log('__suggestionsEntries__', this.state.suggestionsEntries);
    const {
      theme,
      I18nProvider,
      lang,
      periodSeparator,
      disabledDates,
      icon
    } = this.props;

    const weekDays = getWeekDaysForLocale(this.props.lang);
    const months = getMonthsForLocale(this.props.lang);
    let styles = getStyles(theme, this.state.calendarTheme);
    const style = `.wizzio-component-calendar-container ::selection {
      background-color: ${this.state.calendarTheme.primary};
      color: ${this.state.calendarTheme.modalBackgroundColor};
    } `;
    return (
      <div
        style={{ ...styles.root, ...this.props.style }}
        ref={this._calendarRef}
        className={'wizzio-component-calendar-container'}
      >
        <style>{style}</style>
        <DateInputField
          ref={this._dateInputRef}
          label={this.state.label}
          dateFormat={this.state.collapsedDataFormat}
          showPicker={this.showPicker}
          isSingleMode={this.state.isSingleMode}
          onDateChanged={this.onDateChanged}
          inputDateArray={this.state.inputDateArray}
          secondInputDateArray={this.state.secondInputDateArray}
          periodSeparator={periodSeparator}
          startLimit={this.state.startLimit}
          endLimit={this.state.endLimit}
          hasError={this.state.hasError}
          errorMsg={this.state.errorMsg}
          disabledDates={disabledDates}
          calendarTheme={this.state.calendarTheme}
          onBlur={this.handleOnBlur}
          icon={icon}
          openDatePickerOnClick={this.state.openDatePickerOnClick}
          clearDates={this._resetDateState.bind(this, true)}
        />
        <DatePicker
          visible={this.state.pickerVisibility}
          mode={this.props.mode}
          isSingleMode={this.state.isSingleMode}
          onDateChanged={(
            date,
            hidePicker = true,
            isIntervalRange = false,
            invalidateIntervalRange = false,
            dateChangeContextData
          ) => {
            this.onDateChanged(
              date,
              hidePicker,
              isIntervalRange,
              invalidateIntervalRange,
              dateChangeContextData,
              true
            );
          }}
          months={months}
          weekDays={weekDays}
          lang={lang}
          date={this.state.inputDate}
          I18nProvider={I18nProvider}
          referenceDate={this.state.referenceDate}
          inputDateArray={this.state.inputDateArray}
          secondInputDate={this.state.secondInputDate}
          secondInputDateArray={this.state.secondInputDateArray}
          startLimit={this.state.startLimit}
          endLimit={this.state.endLimit}
          hasError={this.state.hasError}
          errorMsg={this.state.errorMsg}
          header={this.state.header}
          suggestions={this.state.suggestions}
          isSuggestionsLeft={this.state.isSuggestionsLeft}
          showNeighborMonthDates={this.state.showNeighborMonthDates}
          disabledDates={disabledDates}
          highlightedDates={this.state.highlightedDates}
          datePickerBorder={this.state.datePickerBorder}
          datePickerBorderRadius={this.state.datePickerBorderRadius}
          calendarTheme={this.state.calendarTheme}
          suggestionsEntries={this.state.suggestionsEntries}
          dateChangeContextData={this.state.dateChangeContextData}
          minIntervalDays={this.state.minIntervalDays}
          maxIntervalDays={this.state.maxIntervalDays}
        />
        {this.state.errorMsg &&
          this.state.hasError && (
            <div style={styles.errorMsg} title={this.state.errorMsg}>
              {this.state.errorMsg}
            </div>
          )}
      </div>
    );
  }

  /**
   * A React life cycle Method
   * Unsubscribe all Global Event here
   *
   */
  componentWillUnmount() {
    document.removeEventListener('click', this._handleOutsideClick, false);
    document.removeEventListener('keydown', this._handleKeydown, false);
    document.removeEventListener('paste', this._handlePasteEvent, false);
    document.removeEventListener('copy', this._handleCopyEvent, false);
  }
}

CalendarClass.defaultProps = {
  mode: 'SINGLE',
  lang: 'en-us',
  referenceDate: new Date(),
  startDate: null,
  periodSeparator: '-',
  startLimit: getRelativeDate(),
  endLimit: getRelativeDate(new Date(), -5),
  suggestions: true,
  header: true,
  suggestionsPosition: 'RIGHT',
  showNeighborMonthDates: true,
  highlightedDates: [],
  disabledDates: [],
  datePickerBorderRadius: '0',
  openDatePickerOnClick: false,
  style: {},
  I18nProvider: {
    Texti18n: () => {
      undefined;
    }
  }
};
CalendarClass.propTypes = {
  /** Text Label of the calendar eg:DOB. */
  label: PropTypes.string,
  /**  Date format of the input field of the calendar (which will also affect the placeholder). */
  collapsedDataFormat: PropTypes.string,
  /** Determines if the date is a 'Single Date Picker' [SINGLE] or an 'Interval Date Picker' [INTERVAL]. **/
  mode: PropTypes.string,
  /** Date to be marked as a reference date on the calendar. **/
  referenceDate: PropTypes.instanceOf(Date),
  /** Default picked date when the component is load (applies to Single Date Picker only). **/
  startDate: PropTypes.instanceOf(Date),
  /** Label of the start and end date separators in the input field of the calendar (if interval). **/
  periodSeparator: PropTypes.string,
  /**  Minimum date available to pick in the calendar. **/
  startLimit: PropTypes.instanceOf(Date),
  /**  Maximum date available to pick in the calendar. **/
  endLimit: PropTypes.instanceOf(Date),
  /**  Determines if the dates header should be displayed (only if the component  is an interval date picker). **/
  header: PropTypes.bool,
  /** Determines if the suggestions menu should be displayed (only if the component  is an interval date picker). **/
  suggestions: PropTypes.bool,
  /** Determines if the suggestions menu should appear on the LEFT or RIGHT side. **/
  suggestionsPosition: PropTypes.string,
  /** Determines if the Neighbor Months dates should appear or not in date picker pop up. **/
  showNeighborMonthDates: PropTypes.bool,
  /**  List of the intervals to be marked as disabled on the calendar. **/
  disabledDates: PropTypes.arrayOf(PropTypes.instanceOf(DateRange)),
  /**  List of the intervals to be marked as highlighted on the calendar. **/
  highlightedDates: PropTypes.arrayOf(PropTypes.instanceOf(DateRange)),
  /**  Border width of date picker with Units eg: 20px. **/
  datePickerBorder: PropTypes.string,
  /**  Border radius of date picker with Units eg: 20px. **/
  datePickerBorderRadius: PropTypes.string,
  /**  Callback function which get triggered upon changes in the calendar or text input.
   * function (newDate)=> newDate will bea object with start, end and valid (a.start && a.end && a.valid)
   * **/
  onChange: PropTypes.func,
  /**  Callback function which get triggered upon closing the calendar or removing focus from the text input.
   * function (newDate)=> newDate will bea object with start, end and valid (a.start && a.end && a.valid)
   * **/
  onBlur: PropTypes.func,
  /**    List of entries that should be displayed in the suggestions menu **/
  suggestionsEntries: PropTypes.arrayOf(PropTypes.instanceOf(SuggestionsRange)),
  /**   Icon next to the input field of the calendar **/
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /** Determines if Date picker pop-up will appear or not on clicking date input field. **/
  openDatePickerOnClick: PropTypes.bool,
  /** Minimum Number of dates user can select in interval. **/
  minIntervalDays: PropTypes.number,
  /** Maximum Number of dates user can select in interval. **/
  maxIntervalDays: PropTypes.number,
  /** Regular style object which gets applied to the root container of calendar. **/
  style: PropTypes.object,
  /** I18nProvider service provider. **/
  I18nProvider: PropTypes.object.isRequired,
  /** calendar language  **/
  lang: PropTypes.string,
  /** Default picked date interval when the component is load (applies to Interval Date Picker) **/
  intervalDate: PropTypes.instanceOf(DateRange),
  theme: PropTypes.any
};

export default CalendarClass;

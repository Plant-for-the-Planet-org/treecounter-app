/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import CalendarGrid from './CalendarGrid/CalendarGrid';
import DateIntervalHeader from './DateInterval/Header';
import SuggestionsMenu from './DateInterval/SuggestionsMenu';
import { SuggestionsRange } from '../Utils/SuggestionsRange';

const getStyles = (calendarTheme, hasError) => {
  return {
    root: {
      outline: 'none',
      width: '256px',
      height: '290px',
      backgroundColor: calendarTheme.modalBackgroundColor,
      color: '#555',
      textAlign: 'center',
      position: 'absolute',
      boxSizing: 'border-box',
      zIndex: 90,
      marginTop: -2,
      border: !hasError
        ? '1px solid' + calendarTheme.textInputFocusedBorderColor
        : '1px solid' + calendarTheme.textInputErrorBorderColor,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  };
};

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }
  render() {
    const {
      visible,
      isSingleMode,
      months,
      date,
      I18nProvider,
      weekDays,
      lang,
      referenceDate,
      inputDateArray,
      secondInputDateArray,
      secondInputDate,
      startLimit,
      endLimit,
      hasError,
      header,
      suggestions,
      isSuggestionsLeft,
      showNeighborMonthDates,
      disabledDates,
      calendarTheme,
      datePickerBorder,
      datePickerBorderRadius,
      suggestionsEntries,
      onDateChanged,
      dateChangeContextData,
      minIntervalDays,
      maxIntervalDays
    } = this.props;
    console.log('DatePicker', date);
    let styles = getStyles(calendarTheme, hasError);
    const suggestionsMenuProps = {
      calendarTheme,
      I18nProvider,
      lang,
      isSuggestionsLeft,
      suggestionsEntries,
      onDateChanged,
      date,
      secondInputDate,
      minIntervalDays,
      maxIntervalDays
    };
    return visible ? (
      <div
        tabIndex={'-1'}
        style={{
          ...styles.root,
          visibility: visible ? 'visible' : 'hidden',
          width: isSingleMode ? 326 : suggestions ? 502 : 358,
          height: isSingleMode || (!isSingleMode && !header) ? 382 : 448,
          borderWidth: datePickerBorder,
          borderRadius: datePickerBorderRadius
        }}
      >
        {!isSingleMode &&
          header && (
            <DateIntervalHeader
              calendarTheme={calendarTheme}
              I18nProvider={I18nProvider}
              selectFromDate={date}
              selectToDate={secondInputDate}
              lang={lang}
            />
          )}
        <div style={{ display: 'flex', height: '100%' }}>
          {!isSingleMode &&
            suggestions &&
            isSuggestionsLeft && <SuggestionsMenu {...suggestionsMenuProps} />}
          <CalendarGrid
            date={date}
            isSingleMode={isSingleMode}
            months={months}
            weekDays={weekDays}
            inputDateArray={inputDateArray}
            referenceDate={referenceDate}
            onDateChanged={this.props.onDateChanged}
            secondInputDateArray={secondInputDateArray}
            secondInputDate={secondInputDate}
            min={startLimit}
            max={endLimit}
            showNeighborMonthDates={showNeighborMonthDates}
            disabledDates={disabledDates}
            highlightedDates={this.props.highlightedDates}
            calendarTheme={calendarTheme}
            suggestions={suggestions}
            dateChangeContextData={dateChangeContextData}
            minIntervalDays={minIntervalDays}
            maxIntervalDays={maxIntervalDays}
          />
          {!isSingleMode &&
            suggestions &&
            !isSuggestionsLeft && <SuggestionsMenu {...suggestionsMenuProps} />}
        </div>
      </div>
    ) : null;
  }
}

DatePicker.defaultProps = {
  visible: false
};
DatePicker.propTypes = {
  visible: PropTypes.bool,
  isSingleMode: PropTypes.bool,
  onDateChanged: PropTypes.func,
  months: PropTypes.array,
  I18nProvider: PropTypes.any,
  weekDays: PropTypes.any,
  lang: PropTypes.string,
  referenceDate: PropTypes.instanceOf(Date),
  inputDateArray: PropTypes.array,
  secondInputDateArray: PropTypes.array,
  secondInputDate: PropTypes.instanceOf(Date),
  date: PropTypes.instanceOf(Date),
  startLimit: PropTypes.instanceOf(Date),
  endLimit: PropTypes.instanceOf(Date),
  hasError: PropTypes.bool,
  header: PropTypes.bool,
  suggestions: PropTypes.bool,
  isSuggestionsLeft: PropTypes.bool,
  showNeighborMonthDates: PropTypes.bool,
  disabledDates: PropTypes.array,
  highlightedDates: PropTypes.array,
  datePickerBorder: PropTypes.string,
  datePickerBorderRadius: PropTypes.string,
  calendarTheme: PropTypes.object,
  suggestionsEntries: PropTypes.arrayOf(PropTypes.instanceOf(SuggestionsRange)),
  dateChangeContextData: PropTypes.any,
  minIntervalDays: PropTypes.number,
  maxIntervalDays: PropTypes.number
};

export default DatePicker;

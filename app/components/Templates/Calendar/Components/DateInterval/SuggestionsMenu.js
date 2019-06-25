/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { getStyles } from './style';
import { isSameDay, dateDiff } from '../../Utils';
import SuggestionMenuitem from './SuggestionMenuitem';
import { SuggestionsRange } from '../../Utils/SuggestionsRange';

/**
 * Side menu Component of Date picker
 *
 */
class SuggestionsMenu extends React.Component {
  /**
   * it will get the start and end date from suggested range.
   * This ine efficent one instead of accessing start and end date directly
   * @param {SuggestionsRange} item - A suggested Range Item
   */
  getStartEndDateFromMenuItem = item => {
    const startDate =
      (item.getStartDate && item.getStartDate()) ||
      SuggestionsRange.getDate(item.start);
    const endDate =
      (item.getEndDate && item.getEndDate()) ||
      SuggestionsRange.getDate(item.end);
    return { startDate, endDate };
  };

  /**
   * A  utility method to test the equality of current selected date range with provided SuggestionRange item
   * @param {SuggestionsRange} item - A suggested Range Item
   */
  isDateSelected = item => {
    const { startDate, endDate } = this.getStartEndDateFromMenuItem(item);
    if (this.props.date && this.props.secondInputDate && item) {
      if (
        startDate &&
        isSameDay(startDate, this.props.date) &&
        endDate &&
        isSameDay(endDate, this.props.secondInputDate)
      ) {
        return true;
      }
    }
    return false;
  };

  /**
   * A  utility to disable or enable the range based on the max and min interval range provided by the consumer
   * @param {SuggestionsRange} item - A suggested Range Item
   */
  isDateDisabled = item => {
    const { maxIntervalDays, minIntervalDays } = this.props;
    const { startDate, endDate } = this.getStartEndDateFromMenuItem(item);
    const dateDifference = Math.abs(dateDiff(startDate, endDate) / 86400000);
    console.log('dateDiff', dateDifference);
    if (maxIntervalDays > -1 && dateDifference > maxIntervalDays - 1) {
      return true;
    }
    if (minIntervalDays > -1 && dateDifference < minIntervalDays - 1) {
      return true;
    }
    return false;
  };

  /**
   * Render : React life cycle method
   * Here we are List of SuggestionMenuitem {@link SuggestionMenuitem}
   */
  render() {
    const { isSuggestionsLeft, calendarTheme, I18nProvider } = this.props;
    const suggestedRange = this.props.suggestionsEntries;
    const styles = getStyles(calendarTheme);
    const borderColor = calendarTheme.textInputFocusedBorderColor;
    return (
      <div
        style={{
          ...styles.suggestionsRoot,
          borderLeft: !isSuggestionsLeft ? `1px solid ${borderColor}` : '0px',
          borderRight: !isSuggestionsLeft ? '0px' : `1px solid ${borderColor}`
        }}
      >
        <span style={{ fontSize: 18, marginBottom: 15, paddingLeft: 15 }}>
          {I18nProvider.Texti18n('calendar_suggested_range') ||
            'Suggested Range'}
        </span>
        {suggestedRange.map((item, index) => (
          <SuggestionMenuitem
            calendarTheme={calendarTheme}
            selected={this.isDateSelected(item)}
            disabled={this.isDateDisabled(item)}
            key={item.title + index}
            onClick={() => {
              this.props.onDateChanged(
                (item && item.getStartDate && item.getStartDate()) ||
                  SuggestionsRange.getDate(item.start),
                false,
                false,
                true
              );
              //Call second date change request after some time so that
              //It will work like natural interval selection
              setTimeout(
                () =>
                  this.props.onDateChanged(
                    (item && item.getEndDate && item.getEndDate()) ||
                      SuggestionsRange.getDate(item.end),
                    false,
                    true
                  ),
                0
              );
            }}
          >
            {item.title}
          </SuggestionMenuitem>
        ))}
      </div>
    );
  }
}

SuggestionsMenu.defaultProps = {};
SuggestionsMenu.propTypes = {
  label: PropTypes.string,
  suggestedRange: PropTypes.array,
  lang: PropTypes.string,
  i18Provider: PropTypes.any,
  isSuggestionsLeft: PropTypes.bool,
  calendarTheme: PropTypes.object,
  suggestionsEntries: PropTypes.arrayOf(PropTypes.instanceOf(SuggestionsRange)),
  onDateChanged: PropTypes.func,
  date: PropTypes.instanceOf(Date),
  secondInputDate: PropTypes.instanceOf(Date),
  minIntervalDays: PropTypes.number,
  maxIntervalDays: PropTypes.number
};

export default SuggestionsMenu;

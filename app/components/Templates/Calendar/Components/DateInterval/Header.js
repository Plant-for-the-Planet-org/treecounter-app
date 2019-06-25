/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { getStyles } from './style';
import { isDate, firstLetterUppercase } from '../../Utils/index';

const getFormattedDate = (date, format) => {
  console.log('getFormattedDate__', date, format);
  if (!isDate(date)) {
    return '  \t\t';
  }
  return format.format(date);
};

/**
 * A stateless Component
 * It Render the dates in prescribe format
 *
 */
class DateIntervalHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * A static utility method to create JS standard format based on option supplied
   * Here we are rendering From and to date
   * @param {String} lang - lang code like en-us
   * @param {Object} formatOption - format Options : see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat#Parameters|Option}
   */
  static getDateFormat = (
    lang,
    option = {
      weekday: 'long',
      year: 'numeric',
      day: '2-digit',
      month: 'short',
      lang: lang
    }
  ) => {
    return new Intl.DateTimeFormat(lang, option);
  };

  /**
   * Render : React life cycle method
   * Here we are rendering From and to date
   */
  render() {
    const { I18nProvider, calendarTheme, lang } = this.props;
    const styles = getStyles(calendarTheme);
    return (
      <div style={styles.root}>
        <div style={{ ...styles.headerInfo }}>
          <span style={{ color: calendarTheme.primary }}>
            {I18nProvider.Texti18n('calendar_from') || 'From'}
          </span>
          <span>
            {getFormattedDate(
              this.props.selectFromDate,
              DateIntervalHeader.getDateFormat(lang)
            )}
          </span>
        </div>
        <div style={{ ...styles.headerInfo, minWidth: '45%' }}>
          <span style={{ color: calendarTheme.primary }}>
            {I18nProvider.Texti18n('calendar_to') || 'To'}
          </span>
          <span>
            {getFormattedDate(
              this.props.selectToDate,
              DateIntervalHeader.getDateFormat(lang)
            )}
          </span>
        </div>
      </div>
    );
  }
}

DateIntervalHeader.propTypes = {
  selectFromDate: PropTypes.instanceOf(Date),
  selectToDate: PropTypes.instanceOf(Date),
  I18nProvider: PropTypes.any,
  calendarTheme: PropTypes.object
};

export default DateIntervalHeader;

import { getRelativeDateByDay } from './index';

/**
 * SuggestionsRange: A utility Class to provide suggestionRange entries
 *
 */
export class SuggestionsRange {
  /**
   * Represents a SuggestionsRange.
   * @constructor
   * @param {Date | Function} startDate - the start date of range.
   * @param {Date | Function} endDate - The end date of the range.
   * @param {string=""} title - title for suggestions range.
   */
  constructor(startDate, endDate, title = '') {
    this.start = startDate;
    this.end = endDate;
    this.title = title;
  }
  /**
   * A internal utility function this will return the last computed start date if this.start is of type function
   * preferable for performance gain
   */
  getStartDate = () => {
    if (!this.computedStartDate) {
      this.computedStartDate = this._getDate(this.start);
    }
    return this.computedStartDate;
  };
  /**
   * A internal utility function this will return the last computed end date if this.end is of type function
   * preferable for performance gain
   */
  getEndDate = () => {
    if (!this.computedEndDate) {
      this.computedEndDate = this._getDate(this.end);
    }
    return this.computedEndDate;
  };

  /**
   * A private non-static wrapper of getDate()
   * @private
   */
  _getDate = date => {
    return SuggestionsRange.getDate(date);
  };

  /**
   * A utility function to get date based on Type.
   * if date is of type function it will execute that function to get result
   * else if date is of type Date it will return that date else it will return undefined
   * @param {Date | Function | undefined} date - the date to fetch.
   */
  static getDate = date => {
    if (date) {
      let result = date;
      if (typeof date == 'function') {
        result = date();
      }
      if (result instanceof Date) {
        return result;
      }
    }
    return undefined;
  };
  /**
   * A utility function to get specific date relative to reference date.
   * @param {Date} referenceDate - date to consider as reference date to calculate a new relative date
   * @param {number} relativeDayCount - relative day count, negative if need date less than reference date else positive.
   * @return {Date} date - the date to fetch.
   * @example getRelativeDateByDay(new Date(), -5) return new date 5 days before current day
   */
  static getRelativeDateByDay = (referenceDate, relativeDayCount) => {
    return getRelativeDateByDay(referenceDate, relativeDayCount);
  };
}

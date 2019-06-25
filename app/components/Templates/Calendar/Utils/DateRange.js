/**
 * DateRange: A utility Class to provide range entries
 * @see SuggestionRange for SuggestionMenu range
 *
 */
export class DateRange {
  /**
   * Represents a Date Range.
   * @constructor
   * @param {Date} startDate - the start date of range.
   * @param {Date} endDate - The end date of the range.
   * @param {string=""} title - title for suggestions range.
   */
  constructor(startDate, endDate, title = '') {
    this.start = startDate;
    this.end = endDate;
    this.title = title;
  }
}

import React from 'react';
import i18n from '../../locales/i18n';
import { formatDateToMySQL, getDateFromMySQL } from '../../helpers/utils';
import { getLocale } from '../../actions/getLocale';
// import { compCalendar } from '../../assets';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export function DatePickerTemplate(locals) {
  const locale = getLocale();
  const containerStyle = { width: '100%' };
  const calendarStyle = { marginBottom: 20 };

  return locals.type !== 'hidden' ? (
    <div
      style={containerStyle}
      className={'pftp-date-picker__container'}
      tabIndex="0"
    >
      <DatePicker
        placeholderText={i18n.t(locals.label)}
        style={calendarStyle}
        disabled={locals.disabled}
        openDatePickerOnClick
        selected={locals.value ? getDateFromMySQL(locals.value) : undefined}
        maxDate={locals.config.maxDate ? new Date() : null}
        minDate={locals.config.minDate ? new Date() : null}
        locale={locale}
        dateFormat="dd MMM yyyy"
        key={101}
        onChange={newDate => {
          locals.onChange(formatDateToMySQL(newDate));
        }}
      />

      {locals.error ? locals.error : null}
    </div>
  ) : null;
}

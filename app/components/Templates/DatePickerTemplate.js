import React from 'react';
import i18n from '../../locales/i18n';
import { formatDate, getDateFromMySQL } from '../../helpers/utils';
import { getLocale } from '../../actions/getLocale';
// import { compCalendar } from '../../assets';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export function DatePickerTemplate(locals) {
  const locale = getLocale();
  let error = locals.hasError;
  const containerStyle = { width: '100%' };
  const calendarStyle = { marginBottom: 20 };
  return locals.type !== 'hidden' ? (
    <div
      style={containerStyle}
      className={'pftp-date-picker__container'}
      tabIndex="0"
    >
      {/* <label className={locals.value !== '' ? 'float-label' : ''}>
        {i18n.t(locals.label)}
      </label> */}
      <DatePicker
        placeholderText={i18n.t(locals.label)}
        style={calendarStyle}
        openDatePickerOnClick={true}
        selected={!!locals.value ? getDateFromMySQL(locals.value) : undefined}
        // startDate={!!locals.value ? getDateFromMySQL(locals.value) : undefined}
        // startLimit={new Date(1700, 0)}
        // endLimit={new Date()}
        locale={locale}
        key={101}
        onChange={newDate => {
          console.log('___onChangeDate___', newDate);

          locals.onChange(formatDate(newDate));
        }}
      />

      {locals.error ? locals.error : null}
    </div>
  ) : null;
}

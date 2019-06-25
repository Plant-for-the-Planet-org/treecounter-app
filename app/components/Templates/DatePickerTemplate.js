import React from 'react';
import i18n from '../../locales/i18n';
import { formatDate, getDateFromMySQL } from '../../helpers/utils';
import { getLocale } from '../../actions/getLocale';
import { compCalendar } from '../../assets';
import Calendar from './Calendar';

export function DatePickerTemplate(locals) {
  const locale = getLocale();
  let error = locals.hasError;
  const containerStyle = { width: '100%' };
  const calendarStyle = { marginBottom: 20 };
  return locals.type !== 'hidden' ? (
    <div style={containerStyle}>
      <Calendar
        style={calendarStyle}
        openDatePickerOnClick={true}
        icon={compCalendar}
        startDate={!!locals.value ? getDateFromMySQL(locals.value) : undefined}
        startLimit={new Date(1700, 0)}
        endLimit={new Date()}
        I18nProvider={{
          Texti18n: label => {
            return i18n.t(`label.${label}`);
          }
        }}
        lang={locale}
        key={101}
        label={i18n.t(locals.label)}
        onChange={newDate => {
          console.log('___onChangeDate___', newDate);
          if (newDate.valid) {
            locals.hasError = false;
            locals.onChange(formatDate(newDate.startDate));
          } else {
            locals.hasError = true;
            locals.onChange('');
          }
        }}
      />
      {locals.error ? locals.error : null}
    </div>
  ) : null;
}

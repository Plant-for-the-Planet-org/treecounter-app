import React from 'react';
import i18n from '../../locales/i18n';
import { formatDate } from '../../helpers/utils';

export function TextInputTemplate(locals) {
  const locale = getLocale();
  function onChange($event) {
    let value =
      locals.type === 'number' && $event.target.value
        ? parseInt($event.target.value)
        : $event.target.value;
    locals.onChange(value);
  }
  function todayDate() {
    let today = new Date();
    today = formatDate(today);
    return today;
  }
  let error = locals.hasError;
  let className;

  if (!error) {
    className = 'pftp-textfield__inputgroup';
  } else {
    className = 'pftp-textfield__error-inputgroup';
  }
  const isDate = locals.type === 'date';
  return locals.type !== 'hidden' ? (
    <div className="pftp-textfield-container">
      <div className="pftp-textfield">
        {locals.config.iconUrl ? (
          <img className="pftp-textfield__icon" src={locals.config.iconUrl} />
        ) : null}
        <div className={className}>
          {isDate ? (
            <input
              date-format="dd/mm/yyyy"
              lang={locale}
              type={locals.type}
              autoComplete="new-password"
              max={todayDate()}
              value={locals.value}
              onChange={onChange}
            />
          ) : (
            <input
              type={locals.type}
              autoComplete="new-password"
              value={locals.value}
              onChange={onChange}
            />
          )}

          <span
            className={
              !error
                ? 'pftp-textfield__inputgroup--highlight'
                : 'pftp-textfield__inputgroup--highlightr-error'
            }
          />
          <span
            className={
              !error
                ? 'pftp-textfield__inputgroup--bar'
                : 'pftp-textfield__inputgroup--error-bar'
            }
          />
          <label className={locals.value || isDate ? 'float-label' : ''}>
            {i18n.t(locals.label)}
          </label>
        </div>
      </div>
      {error && locals.error ? locals.error : null}
    </div>
  ) : null;
}

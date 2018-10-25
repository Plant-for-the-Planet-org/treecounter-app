import React from 'react';
import i18n from '../../locales/i18n';
import { formatDate } from '../../helpers/utils';

export function TextInputTemplate(locals) {
  console.log(locals);
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
  if (locals.help === 'redeem') {
    className = 'pftp-textfield_redeeminput';
  } else {
    if (!error) {
      className = 'pftp-textfield__inputgroup';
    } else {
      className = 'pftp-textfield__error-inputgroup';
    }
  }
  return locals.type !== 'hidden' ? (
    <div className="pftp-textfield-container">
      <div className="pftp-textfield">
        {locals.config.iconUrl ? (
          <img className="pftp-textfield__icon" src={locals.config.iconUrl} />
        ) : null}
        <div className={className}>
          {locals.type === 'date' ? (
            <input
              type={locals.type}
              autoComplete="new-password"
              required="required"
              max={todayDate()}
              value={locals.value}
              onChange={onChange}
            />
          ) : (
            <input
              type={locals.type}
              autoComplete="new-password"
              required="required"
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
          <label>{i18n.t(locals.label)}</label>
        </div>
      </div>
      {error && locals.error ? locals.error : null}
    </div>
  ) : null;
}

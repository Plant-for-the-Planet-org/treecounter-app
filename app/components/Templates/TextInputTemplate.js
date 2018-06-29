import React from 'react';
import i18n from '../../locales/i18n';

export function TextInputTemplate(locals) {
  function onChange($event) {
    let value =
      locals.type === 'number'
        ? parseInt($event.target.value)
        : $event.target.value;
    locals.onChange(value);
  }

  function todayDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;
    return today;
  }
  return locals.type !== 'hidden' ? (
    <div className="pftp-textfield">
      {locals.config.iconUrl ? (
        <img className="pftp-textfield__icon" src={locals.config.iconUrl} />
      ) : null}
      <div className="pftp-textfield__inputgroup">
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
        <span className="pftp-textfield__inputgroup--highlight" />
        <span className="pftp-textfield__inputgroup--bar" />
        <label>{i18n.t(locals.label)}</label>
      </div>
    </div>
  ) : null;
}

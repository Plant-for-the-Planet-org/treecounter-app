import React from 'react';
import i18n from '../../locales/i18n';

export function TextInputTemplate(locals) {
  function onChange($event) {
    locals.onChange($event.target.value);
  }
  return (
    <div className="pftp-textfield">
      {locals.config.iconUrl ? (
        <img className="pftp-textfield__icon" src={locals.config.iconUrl} />
      ) : null}
      <div className="pftp-textfield__inputgroup">
        <input
          type={locals.type}
          required="required"
          value={locals.value}
          onChange={onChange}
        />
        <span className="pftp-textfield__inputgroup--highlight" />
        <span className="pftp-textfield__inputgroup--bar" />
        <label>{i18n.t(locals.label)}</label>
      </div>
    </div>
  );
}

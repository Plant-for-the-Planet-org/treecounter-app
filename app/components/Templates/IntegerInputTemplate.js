import React from 'react';
import i18n from '../../locales/i18n';

export function IntegerInputTemplate(locals) {
  function onChange($event) {
    locals.onChange($event.target.value);
  }
  return (
    <div className="pftp-intfield">
      {locals.config.iconUrl ? (
        <img className="pftp-intfield__icon" src={locals.config.iconUrl} />
      ) : null}
      <div className="pftp-intfield__inputgroup">
        <input
          type="number"
          autoComplete="new-password"
          required="required"
          value={locals.value}
          onChange={onChange}
          placeholder={i18n.t(locals.label)}
        />
      </div>
    </div>
  );
}

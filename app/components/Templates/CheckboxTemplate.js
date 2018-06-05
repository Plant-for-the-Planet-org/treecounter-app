import React from 'react';
import i18n from '../../locales/i18n';

export function CheckboxTemplate(locals) {
  function onChange($event) {
    locals.onChange(!$event.target.value);
  }
  return (
    <div className="pftp-checkbox">
      <input
        className="pftp-checkbox__input"
        type={'checkbox'}
        required="required"
        value={locals.value}
        onChange={onChange}
      />
      <label className={'pftp-text-span'}>{i18n.t(locals.label)}</label>
    </div>
  );
}

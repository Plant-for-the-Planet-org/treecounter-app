import React from 'react';
import i18n from '../../locales/i18n';

export function TextAreaTemplate(locals) {
  function onChange($event) {
    locals.onChange($event.target.value);
  }
  return (
    <div className="pftp-textfield">
      <div className="pftp-textfield__inputgroup">
        <textarea
          rows="6"
          cols="50"
          value={locals.value}
          required="required"
          onChange={onChange}
        />
        <span className="pftp-textfield__inputgroup--highlight" />
        <span className="pftp-textfield__inputgroup--bar" />
        <label>{i18n.t(locals.label)}</label>
      </div>
    </div>
  );
}

import React from 'react';
import i18n from '../../locales/i18n';

export function SelectTemplate(locals) {
  function onChange($event) {
    locals.onChange($event.target.value);
  }
  return (
    <div className="pftp-selectfield">
      <select
        key={locals.attrs.id}
        className="pftp-selectfield__select"
        required="required"
        onChange={onChange}
        value={locals.value}
      >
        {locals.options.map(option => (
          <option
            key={option.value}
            className="pftp-selectfield__option"
            value={option.value}
          >
            {i18n.t(option.text)}
          </option>
        ))}
      </select>
    </div>
  );
}

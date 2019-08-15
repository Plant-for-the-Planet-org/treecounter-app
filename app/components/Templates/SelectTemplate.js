import React from 'react';
import i18n from '../../locales/i18n';

export function getSelectTemplate(enumOption) {
  return function SelectTemplate(locals) {
    function onChange($event) {
      locals.onChange($event.target.value);
    }
    const options = enumOption ? enumOption : locals.options;
    return (
      <div className="pftp-selectfield">
        <select
          key={locals.attrs.id}
          className={
            locals.hasError
              ? 'pftp-selectfield__select-error'
              : 'pftp-selectfield__select'
          }
          required="required"
          onChange={onChange}
          value={locals.value}
        >
          {options.map(option => (
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
  };
}

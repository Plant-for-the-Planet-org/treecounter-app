import React from 'react';
import i18n from '../../locales/i18n';

export function getSelectTemplate(enumOption) {
  return function SelectTemplate(locals) {
    function onChange($event) {
      locals.onChange($event.target.value);
    }
    const options = enumOption ? enumOption : locals.options;

    options.sort(function(a,b) {
      if (!b.value) return 1;
      if (!a.value) return -1;

      let nameA = i18n.t(a.text).toLowerCase(),
        nameB = i18n.t(b.text).toLowerCase();
        if (nameA < nameB)
          //sort string ascending
          return -1;
        if (nameA > nameB) return 1;
        return 0; //default return value (no sorting)
    });

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

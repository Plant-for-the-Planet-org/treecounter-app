import React from 'react';
import i18n from '../../locales/i18n';

export function TextAreaTemplate(locals) {
  function onChange($event) {
    locals.onChange($event.target.value);
  }
  return (
    <div className="pftp-textfield-container">
      <div className="pftp-textfield">
        <div
          className={
            !locals.hasError
              ? 'pftp-textfield__inputgroup'
              : 'pftp-textfield__error-inputgroup'
          }
        >
          <textarea
            rows="6"
            cols="50"
            value={locals.value}
            required="required"
            onChange={onChange}
          />
          <span
            className={
              !locals.hasError
                ? 'pftp-textfield__inputgroup--highlight'
                : 'pftp-textfield__inputgroup--highlightr-error'
            }
            className=""
          />
          <span
            className={
              !locals.hasError
                ? 'pftp-textfield__inputgroup--bar'
                : 'pftp-textfield__inputgroup--error-bar'
            }
          />
          <label
            className={
              (locals.hasError ? 'error-label' : '') + locals.value
                ? 'float-label'
                : ''
            }
          >
            {i18n.t(locals.label)}
          </label>
        </div>
      </div>
      {locals.hasError && locals.error ? locals.error : null}
    </div>
  );
}

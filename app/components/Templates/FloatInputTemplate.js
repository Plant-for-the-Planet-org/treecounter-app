import React from 'react';
import i18n from '../../locales/i18n';

export function FloatInputTemplate(locals) {
  function onChange($event) {
    let value =
      locals.type === 'number'
        ? parseFloat($event.target.value)
        : $event.target.value;
    locals.onChange(value);
  }
  return locals.type !== 'hidden' ? (
    <div>
      <div className="pftp-textfield">
        {locals.config.iconUrl ? (
          <img className="pftp-textfield__icon" src={locals.config.iconUrl} />
        ) : null}
        <div
          className={
            !locals.hasError
              ? 'pftp-textfield__inputgroup'
              : 'pftp-textfield__error-inputgroup'
          }
        >
          <input
            type={locals.type}
            step="0.01"
            autoComplete="new-password"
            required="required"
            value={locals.value}
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
          <label className={locals.hasError ? 'error-label' : ''}>
            {i18n.t(locals.label)}
          </label>
        </div>
      </div>
      {locals.hasError && locals.error ? locals.error : null}
    </div>
  ) : null;
}

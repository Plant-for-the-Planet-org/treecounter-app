import React from 'react';
import i18n from '../../locales/i18n';

export function TextInputTemplate(locals) {
  // let errorBlockStyle = locals.stylesheet.errorBlock;
  let hasErr =
    locals.hasError && locals.error ? (
      <div accessibilityLiveRegion="polite">{locals.error}</div>
    ) : null;

  function onChange($event) {
    let value =
      locals.type === 'number'
        ? parseInt($event.target.value)
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
            autoComplete="new-password"
            required="required"
            value={locals.value}
            onChange={onChange}
          />
          <span className="pftp-textfield__inputgroup--highlight" />
          <span className="pftp-textfield__inputgroup--bar" />
          <label>{i18n.t(locals.label)}</label>
        </div>
      </div>
      {/* {Error} */}
    </div>
  ) : null;
}

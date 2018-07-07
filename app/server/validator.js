import React from 'react';
import i18n from '../locales/i18n.js';

export const commonValidator = function(value, path, context) {
  let hasConfig = context && context.options.config;
  console.log('validation errir');
  if (!value && hasConfig && hasConfig.required) {
    console.log('TEST_ERROR', value, path, context);
    return (
      <div className="error-msg">
        {i18n.t(context.options.label) + i18n.t('label.isRequired')}
      </div>
    );
  } else if (value && hasConfig) {
    if (hasConfig.email && !/(.)+@(.)+/.test(value)) {
      return <div className="error-msg">{i18n.t('label.enterValidEmail')}</div>;
    } else if (hasConfig.attr && hasConfig.attr.maxlength) {
      if (value.length > hasConfig.attr.maxlength) {
        return (
          <div className="error-msg">
            {i18n.t('label.invalidLength') + hasConfig.attr.maxlength}
          </div>
        );
      }
    }
  } else {
    return (
      <div className="error-msg">
        {i18n.t('label.invalidValueMsg') + i18n.t(context.options.label)}
      </div>
    );
  }
};

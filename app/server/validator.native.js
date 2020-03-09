import i18n from '../locales/i18n.js';

export const commonValidator = function(value, path, context) {
  let hasConfig = context && context.options.config;
  if (!value && hasConfig && hasConfig.required) {
    // debug('TEST_ERROR', value, path, context);
    return i18n.t('label.isRequired', {
      context: i18n.t(context.options.label)
    });
  } else if (value && hasConfig) {
    if (hasConfig.email && !/(.)+@(.)+/.test(value)) {
      return i18n.t('label.enterValidEmail');
    } else if (hasConfig.attr && hasConfig.attr.maxlength) {
      if (value.length > hasConfig.attr.maxlength) {
        return i18n.t('label.invalidLength', {
          length: hasConfig.attr.maxlength
        });
      }
    }
  } else {
    {
      i18n.t('label.invalidValueMsg', {
        context: i18n.t(context.options.label)
      });
    }
  }
};
export const getErrorView = function(text) {
  return text;
};

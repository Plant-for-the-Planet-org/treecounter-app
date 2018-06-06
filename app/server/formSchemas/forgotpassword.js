import i18n from '../../locales/i18n.js';
let lng = 'en';

export default {
  title: 'forgot_password',
  type: 'object',
  properties: {
    email: {
      type: 'string',
      title: i18n.t('label.forgotPasswordlabels.email', { lng }),
      icon: 'email',
      propertyOrder: 1
    }
  },
  required: ['email'],
  submit_url: '/app_dev.php/auth/en/forgotPassword',
  submit_method: 'POST'
};

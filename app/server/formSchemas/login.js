import i18n from '../../locales/i18n.js';
let lng = 'en';

export default {
  title: 'login',
  type: 'object',
  properties: {
    _username: {
      type: 'string',
      title: i18n.t('label.loginlabels.email', { lng }),
      icon: 'email',
      propertyOrder: 1
    },
    _password: {
      type: 'string',
      title: i18n.t('label.loginlabels.password', { lng }),
      icon: 'key',
      widget: 'password',
      propertyOrder: 2
    }
  },
  required: ['_username', '_password'],
  submit_url: '/api/login_check',
  submit_method: 'POST'
};

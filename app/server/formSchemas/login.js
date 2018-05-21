export default {
  title: 'login',
  type: 'object',
  properties: {
    _username: {
      type: 'string',
      title: 'label.email',
      icon: 'mail',
      propertyOrder: 1
    },
    _password: {
      type: 'string',
      title: 'label.password',
      icon: 'key',
      widget: 'password',
      propertyOrder: 2
    }
  },
  required: ['_username', '_password'],
  submit_url: '/api/login_check',
  submit_method: 'POST'
};

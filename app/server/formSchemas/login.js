export default {
  title: 'login',
  type: 'object',
  properties: {
    _username: {
      type: 'string',
      title: 'label.email',
      icon: 'email',
      help: null,
      propertyOrder: 1
    },
    _password: {
      type: 'string',
      title: 'label.password',
      widget: 'password',
      icon: 'key',
      help: null,
      propertyOrder: 2
    }
  },
  // required: ['_username', '_password'],
  submit_url: '/api/login_check',
  submit_method: 'POST'
};

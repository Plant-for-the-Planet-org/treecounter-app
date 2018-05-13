export default {
  title: 'login',
  type: 'object',
  properties: {
    _username: {
      type: 'string',
      title: 'label.username',
      propertyOrder: 1
    },
    _password: {
      type: 'string',
      title: 'Password',
      widget: 'password',
      propertyOrder: 2
    }
  },
  required: ['_username', '_password'],
  submit_url: '/api/login_check',
  submit_method: 'POST'
};

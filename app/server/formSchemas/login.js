export default {
  title: 'login',
  type: 'object',
  properties: {
    _username: {
      type: 'string',
      title: 'label.email',
      icon: 'email',
      propertyOrder: 1
    }
  },
  required: ['_username'],
  submit_url: '/api/login_check',
  submit_method: 'POST'
};

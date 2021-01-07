export default {
  title: 'otpcode',
  type: 'object',
  properties: {
    _username: {
      type: 'string',
      title: 'label.code',
      icon: 'email',
      propertyOrder: 1
    }
  },
  required: ['_username'],
  submit_url: '/api/login_check',
  submit_method: 'POST'
};

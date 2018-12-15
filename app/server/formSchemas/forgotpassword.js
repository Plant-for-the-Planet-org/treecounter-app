export default {
  title: 'forgot_password',
  type: 'object',
  properties: {
    email: {
      type: 'string',
      title: 'label.email',
      icon: 'email',
      help: null,
      propertyOrder: 1
    }
  },
  required: ['email'],
  submit_url: '/auth/v1.0/en/forgotPassword',
  submit_method: 'POST'
};

export default {
  title: 'forgot_password',
  type: 'object',
  properties: {
    email: {
      type: 'string',
      title: 'Email',
      propertyOrder: 1
    }
  },
  required: ['email'],
  submit_url: '/app_dev.php/auth/en/forgotPassword',
  submit_method: 'POST'
};

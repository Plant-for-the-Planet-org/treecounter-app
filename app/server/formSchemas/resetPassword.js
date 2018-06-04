export default {
  title: 'forgot_password',
  type: 'object',
  properties: {
    token: {
      type: 'string',
      title: 'token',
      propertyOrder: 1
    },
    password: {
      title: 'password',
      type: 'object',
      properties: {
        first: {
          type: 'string',
          title: 'label.password',
          attr: {
            class: 'password-field'
          },
          widget: 'password',
          icon: 'key',
          propertyOrder: 1
        },
        second: {
          type: 'string',
          title: 'label.password_repeat',
          attr: {
            class: 'password-field'
          },
          widget: 'password',
          icon: 'key',
          propertyOrder: 2
        }
      },
      required: ['first', 'second'],
      propertyOrder: 2
    }
  },
  required: ['token', 'password'],
  submit_url: '/app_dev.php/auth/en/resetPassword',
  submit_method: 'POST'
};

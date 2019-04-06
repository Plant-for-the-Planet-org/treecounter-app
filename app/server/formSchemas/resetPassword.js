export default {
  title: 'forgot_password',
  type: 'object',
  properties: {
    token: {
      type: 'string',
      title: null,
      widget: 'hidden',
      icon: null,
      help: null,
      propertyOrder: 1
    },
    password: {
      title: null,
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
          help: null,
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
          help: null,
          propertyOrder: 2
        }
      },
      required: ['first', 'second'],
      icon: null,
      help: null,
      propertyOrder: 2
    }
  },
  required: ['token', 'password'],
  submit_url: '/auth/v1.0/en/resetPassword',
  submit_method: 'POST'
};

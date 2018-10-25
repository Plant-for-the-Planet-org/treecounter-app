export default {
  title: 'redemption',
  type: 'object',
  properties: {
    code: {
      type: 'string',
      placeholder: 'label.code',
      propertyOrder: 1,
      help: 'redeem'
    }
  },
  required: ['code'],
  submit_url: '/app_dev.php/auth/en/forgotPassword',
  submit_method: 'POST'
};

export default {
  title: 'redemption',
  type: 'object',
  properties: {
    code: {
      type: 'string',
      title: 'label.code',
      propertyOrder: 1
    }
  },
  required: ['code'],
  submit_url: '/app_dev.php/auth/en/forgotPassword',
  submit_method: 'POST'
};

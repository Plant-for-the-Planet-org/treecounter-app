export default {
  title: 'currency',
  type: 'object',
  properties: {
    currency: {
      enum: [],
      enum_title: [],
      type: 'string',
      title: 'Currency',
      attr: {
        maxlength: 2
      },
      icon: null,
      help: null,
      propertyOrder: 5
    }
  },
  required: ['currency']
};

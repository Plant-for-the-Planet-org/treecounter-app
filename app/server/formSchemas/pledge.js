export default {
  title: 'eventpledge',
  type: 'object',
  properties: {
    firstname: {
      type: 'string',
      title: 'firstname',
      attr: {
        maxlength: 255
      },
      maxLength: 255,
      propertyOrder: 1
    },
    lastname: {
      type: 'string',
      title: 'lastname',
      attr: {
        maxlength: 255
      },
      maxLength: 255,
      propertyOrder: 2
    },
    email: {
      type: 'string',
      title: 'email',
      attr: {
        maxlength: 255
      },
      maxLength: 255,
      propertyOrder: 3
    },
    treeCount: {
      type: 'integer',
      title: 'treeCount',
      propertyOrder: 4
    }
  },
  required: ['firstname', 'lastname', 'email', 'treeCount'],
  submit_url: '',
  submit_method: 'POST'
};

export default {
  title: 'eventpledge',
  type: 'object',
  properties: {
    firstname: {
      type: 'string',
      title: 'label.firstname',
      attr: {
        maxlength: 255
      },
      maxLength: 255,
      propertyOrder: 1
    },
    lastname: {
      type: 'string',
      title: 'label.lastname',
      attr: {
        maxlength: 255
      },
      maxLength: 255,
      propertyOrder: 2
    },
    email: {
      type: 'string',
      title: 'label.email',
      attr: {
        maxlength: 255
      },
      maxLength: 255,
      propertyOrder: 3
    },
    treeCount: {
      type: 'integer',
      title: 'label.treecount',
      propertyOrder: 4
    }
  },
  required: ['firstname', 'lastname', 'email', 'treeCount'],
  submit_url: '',
  submit_method: 'POST'
};

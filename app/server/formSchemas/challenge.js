export default {
  title: 'challenge',
  type: 'object',
  properties: {
    invitee: {
      title: null,
      type: 'object',
      properties: {
        firstname: {
          type: 'string',
          title: 'label.firstname',
          icon: null,
          help: null,
          propertyOrder: 1
        },
        lastname: {
          type: 'string',
          title: 'label.lastname',
          icon: null,
          help: null,
          propertyOrder: 2
        },
        email: {
          type: 'string',
          title: 'label.email',
          widget: 'email',
          icon: null,
          help: null,
          propertyOrder: 3
        }
      },
      required: ['firstname', 'lastname', 'email'],
      icon: null,
      help: null,
      propertyOrder: 6
    }
  },
  required: ['goal', 'endDate', 'challengeMethod', 'invitee'],
  submit_url: '',
  submit_method: 'POST'
};

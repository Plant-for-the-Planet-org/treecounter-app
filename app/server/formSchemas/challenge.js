export default {
  title: 'challenge',
  type: 'object',
  properties: {
    goal: {
      type: 'number',
      title: null,
      icon: null,
      help: null,
      propertyOrder: 1
    },
    endDate: {
      type: 'integer',
      title: null,
      icon: null,
      help: null,
      propertyOrder: 2
    },
    message: {
      type: 'string',
      title: null,
      widget: 'textarea',
      icon: null,
      help: null,
      propertyOrder: 3
    },
    challengeMethod: {
      type: 'string',
      title: 'label.challenge_method',
      attr: {
        maxlength: 20
      },
      icon: null,
      help: null,
      maxLength: 20,
      propertyOrder: 4
    },
    challenged: {
      type: 'hidden',
      title: null,
      widget: 'hidden',
      icon: null,
      help: null,
      propertyOrder: 5
    },
    invitee: {
      title: null,
      type: 'object',
      properties: {
        firstname: {
          type: 'string',
          title: null,
          icon: null,
          help: null,
          propertyOrder: 1
        },
        lastname: {
          type: 'string',
          title: null,
          icon: null,
          help: null,
          propertyOrder: 2
        },
        email: {
          type: 'string',
          title: null,
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

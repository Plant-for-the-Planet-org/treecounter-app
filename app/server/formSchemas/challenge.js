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
    firstname: {
      type: 'string',
      title: null,
      attr: {
        maxlength: 50
      },
      icon: null,
      help: null,
      maxLength: 50,
      propertyOrder: 6
    },
    lastname: {
      type: 'string',
      title: null,
      attr: {
        maxlength: 50
      },
      icon: null,
      help: null,
      maxLength: 50,
      propertyOrder: 7
    },
    email: {
      type: 'string',
      title: null,
      widget: 'email',
      icon: null,
      help: null,
      propertyOrder: 8
    }
  },
  required: [
    'goal',
    'endDate',
    'challengeMethod',
    'firstname',
    'lastname',
    'email'
  ],
  submit_url: '',
  submit_method: 'POST'
};

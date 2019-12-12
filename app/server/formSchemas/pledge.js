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
      icon: null,
      help: null,
      maxLength: 255,
      propertyOrder: 1
    },
    lastname: {
      type: 'string',
      title: 'label.lastname',
      attr: {
        maxlength: 255
      },
      icon: null,
      help: null,
      maxLength: 255,
      propertyOrder: 2
    },
    email: {
      type: 'string',
      title: 'label.email',
      attr: {
        maxlength: 255
      },
      widget: 'email',
      icon: null,
      help: null,
      maxLength: 255,
      propertyOrder: 3
    },
    treeCount: {
      type: 'integer',
      title: 'label.tree_count',
      attr: {
        pattern: '.{1,}'
      },
      pattern: '.{1,}',
      icon: null,
      help: null,
      propertyOrder: 4
    },
    isAnonymous: {
      type: 'boolean',
      title: 'label.is_anonymous',
      widget: 'checkbox',
      icon: null,
      help: null,
      propertyOrder: 5
    }
  },
  required: ['firstname', 'lastname', 'email', 'treeCount'],
  submit_url: '',
  submit_method: 'POST'
};

// export default {
//   title: 'eventpledge',
//   type: 'object',
//   properties: {
//     firstname: {
//       type: 'string',
//       title: 'label.firstname',
//       attr: {
//         maxlength: 255
//       },
//       icon: null,
//       help: null,
//       maxLength: 255,
//       propertyOrder: 1
//     },
//     lastname: {
//       type: 'string',
//       title: 'label.lastname',
//       attr: {
//         maxlength: 255
//       },
//       icon: null,
//       help: null,
//       maxLength: 255,
//       propertyOrder: 2
//     },
//     email: {
//       type: 'string',
//       title: 'label.email',
//       attr: {
//         maxlength: 255
//       },
//       widget: 'email',
//       icon: null,
//       help: null,
//       maxLength: 255,
//       propertyOrder: 3
//     },
//     treeCount: {
//       type: 'integer',
//       title: 'label.tree_count',
//       attr: {
//         pattern: '.{1,}'
//       },
//       pattern: '.{1,}',
//       icon: null,
//       help: null,
//       propertyOrder: 4,
//       minimum: 1
//     }
//   },
//   required: ['firstname', 'lastname', 'email', 'treeCount'],
//   submit_url: '',
//   submit_method: 'POST'
// };

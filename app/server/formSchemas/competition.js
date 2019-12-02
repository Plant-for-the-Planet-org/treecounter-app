export default {
  title: 'competition',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'label.competition_name',
      attr: { maxlength: 255 },
      icon: null,
      help: null,
      maxLength: 255,
      propertyOrder: 1
    },
    goal: {
      type: 'string',
      title: 'label.competition_goal',
      icon: null,
      help: null,
      propertyOrder: 2
    },
    endDate: {
      type: 'string',
      title: 'label.competition_end_date',
      widget: 'date',
      minDate: true,
      icon: null,
      help: null,
      propertyOrder: 3
    },
    access: {
      enum: ['immediate', 'request', 'invitation'],
      enum_titles: [
        'label.competition_access_immediate',
        'label.competition_access_request',
        'label.competition_access_invitation'
      ],
      type: 'string',
      title: 'label.competition_access',
      icon: null,
      help: null,
      propertyOrder: 4
    },
    imageFile: {
      type: 'string',
      title: 'label.competition_image',
      widget: 'file',
      icon: null,
      help: null,
      propertyOrder: 5
    },
    description: {
      type: 'string',
      title: 'label.competition_description',
      widget: 'textarea',
      icon: null,
      help: null,
      propertyOrder: 6
    }
    // contact: {
    //   type: 'string',
    //   title: 'label.competition.contact',
    //   attr: { maxlength: 255 },
    //   icon: null,
    //   help: null,
    //   maxLength: 255,
    //   propertyOrder: 7
    // },
    // email: {
    //   type: 'string',
    //   title: 'label.competition.email',
    //   attr: { maxlength: 50 },
    //   widget: 'email',
    //   icon: null,
    //   help: null,
    //   maxLength: 50,
    //   propertyOrder: 8
    // }
  },
  required: ['name', 'goal', 'endDate', 'access'],
  submit_url: '',
  submit_method: 'POST'
};

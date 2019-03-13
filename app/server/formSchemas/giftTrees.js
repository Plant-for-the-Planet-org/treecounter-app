export default {
  title: 'gift_donation_contribution',
  type: 'object',
  properties: {
    treeCount: {
      type: 'integer',
      title: 'label.tree_count',
      attr: {
        pattern: '.{1,}'
      },
      pattern: '.{1,}',
      propertyOrder: 1
    },
    giftMethod: {
      type: 'string',
      title: 'label.gift_method',
      attr: {
        maxlength: 20
      },
      maxLength: 20,
      propertyOrder: 3
    },
    giftTreecounter: {
      type: 'string',
      title: 'label.gift_treecounter',
      propertyOrder: 4
    },
    giftInvitation: {
      title: 'giftInvitation',
      type: 'object',
      properties: {
        firstname: {
          type: 'string',
          title: 'label.firstname',
          attr: {
            maxlength: 50
          },
          maxLength: 50,
          propertyOrder: 1
        },
        lastname: {
          type: 'string',
          title: 'label.lastname',
          attr: {
            maxlength: 50
          },
          maxLength: 50,
          propertyOrder: 2
        },
        email: {
          type: 'string',
          title: 'label.email',
          widget: 'email',
          attr: {
            maxlength: 50
          },
          maxLength: 50,
          propertyOrder: 3
        },
        message: {
          type: 'string',
          title: 'label.message',
          widget: 'textarea',
          icon: null,
          propertyOrder: 4
        }
      },
      required: ['firstname', 'lastname', 'email'],
      propertyOrder: 5
    }
  },
  required: ['giftMethod', 'giftInvitation'],
  submit_url: '',
  submit_method: 'POST'
};

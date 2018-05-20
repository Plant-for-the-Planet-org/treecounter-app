export default {
  title: 'plant_contribution',
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
    plantDate: {
      type: 'string',
      title: 'label.plant_date',
      widget: 'date',
      propertyOrder: 2
    },
    treeType: {
      type: 'string',
      title: 'label.tree_type',
      attr: {
        maxlength: 255
      },
      maxLength: 255,
      propertyOrder: 3
    }
  },
  required: ['plantDate'],
  submit_url: '',
  submit_method: 'POST',
  showLabel: false
};

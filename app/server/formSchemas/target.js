export default {
  title: 'treecounter_target',
  type: 'object',
  properties: {
    countTarget: {
      type: 'integer',
      title: 'label.target_count',
      propertyOrder: 1
    },
    targetYear: {
      type: 'integer',
      title: 'label.target_year',
      widget: 'year',
      propertyOrder: 2
    },
    targetComment: {
      type: 'string',
      title: 'label.target_comment',
      widget: 'textarea',
      propertyOrder: 3
    }
  },
  required: ['countTarget'],
  submit_url: '/app_dev.php/api/en/targets/2',
  submit_method: 'PUT'
};

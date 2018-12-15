export default {
  title: 'treecounter_target',
  type: 'object',
  properties: {
    countTarget: {
      type: 'integer',
      title: 'label.target_count',
      icon: null,
      help: null,
      propertyOrder: 1
    },
    targetYear: {
      type: 'integer',
      title: 'label.target_year',
      icon: null,
      help: null,
      propertyOrder: 2
    }
  },
  required: ['countTarget'],
  submit_url: '/api/v1.0/en/targets',
  submit_method: 'PUT'
};

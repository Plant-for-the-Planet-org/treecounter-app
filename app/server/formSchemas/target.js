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
      pattern: '[0-9]{4}',
      icon: null,
      help: null,
      propertyOrder: 2
    }
  },
  required: ['countTarget'],
  submit_url: '/api/v1.0/en/targets',
  submit_method: 'PUT'
};

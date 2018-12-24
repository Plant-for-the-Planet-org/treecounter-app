export default {
  title: 'treecounter_target',
  type: 'object',
  properties: {
    countTarget: {
      type: 'integer',
      title: 'label.target_count',
      propertyOrder: 1,
      icon: null,
      help: null
    },
    targetYear: {
      type: 'integer',
      title: 'label.target_year',
      pattern: '[0-9]{4}',
      propertyOrder: 2,
      minimum: 1000,
      maximum: 9999,
      icon: null,
      help: null
    }
  },
  required: ['countTarget'],
  submit_url: '/app_dev.php/api/en/targets/2',
  submit_method: 'PUT'
};

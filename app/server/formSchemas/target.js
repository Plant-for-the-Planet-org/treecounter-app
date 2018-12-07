export default {
  title: 'treecounter_target',
  type: 'object',
  properties: {
    countTarget: {
      type: 'integer',
      title: 'Total Tree Target',
      icon: null,
      help: null,
      propertyOrder: 1
    },
    targetYear: {
      type: 'integer',
      title: 'Target Year',
      icon: null,
      help: null,
      propertyOrder: 2
    }
  },
  required: ['countTarget'],
  submit_url: '/api/v1.0/en/targets',
  submit_method: 'PUT'
};

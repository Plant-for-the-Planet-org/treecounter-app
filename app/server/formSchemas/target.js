import i18n from '../../locales/i18n.js';
let lng = 'en';

export default {
  title: 'treecounter_target',
  type: 'object',
  properties: {
    countTarget: {
      type: 'integer',
      title: i18n.t('label.targetlabels.target_count', { lng }),
      propertyOrder: 1
    },
    targetYear: {
      type: 'integer',
      title: i18n.t('label.targetlabels.target_year', { lng }),
      propertyOrder: 2
    },
    targetComment: {
      type: 'string',
      title: i18n.t('label.targetlabels.target_comment', { lng }),
      widget: 'textarea',
      propertyOrder: 3
    }
  },
  required: ['countTarget'],
  submit_url: '/app_dev.php/api/en/targets/2',
  submit_method: 'PUT'
};

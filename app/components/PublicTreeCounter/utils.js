import i18n from '../../locales/i18n';

export const getProfileTypeName = function(profileType) {
  switch (profileType) {
    case 'tpo': {
      return i18n.t('label.tpo_title');
    }
    case 'company': {
      return i18n.t('label.company_title');
    }
    case 'individual': {
      return i18n.t('label.individual_name');
    }
    case 'education': {
      return i18n.t('label.education');
    }
  }
};

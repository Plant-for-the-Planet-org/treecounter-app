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
    case 'organization': {
      return i18n.t('label.organization');
    }
  }
};

export const isMyself = function(treecounter, currentUserProfile) {
  return (
    null !== currentUserProfile &&
    currentUserProfile.treecounter.id === treecounter.id
  );
};

export const isUserFollower = function(treecounter, currentUserProfile) {
  const followeeIds =
    currentUserProfile && currentUserProfile.treecounter.followeeIds
      ? currentUserProfile.treecounter.followeeIds
          .split(',')
          .map(s => parseInt(s))
      : [];
  return followeeIds.includes(treecounter.id);
};

export const amISupporting = function(treecounter, currentUserProfile) {
  return currentUserProfile
    ? currentUserProfile.supported_treecounter &&
        currentUserProfile.supported_treecounter.id === treecounter.id
    : false;
};

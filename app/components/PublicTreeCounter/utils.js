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

export function isMyself(treecounter, currentUserProfile) {
  return (
    null !== currentUserProfile &&
    currentUserProfile.treecounter.id === treecounter.id
  );
}

export function isUserFollower(treecounter, currentUserProfile) {
  const followeeIds =
    currentUserProfile && currentUserProfile.treecounter.followeeIds
      ? currentUserProfile.treecounter.followeeIds
          .split(',')
          .map(s => parseInt(s))
      : [];
  return followeeIds.includes(treecounter.id);
}

export function amISupporting(treecounter, currentUserProfile) {
  return currentUserProfile
    ? currentUserProfile.supported_treecounter &&
        currentUserProfile.supported_treecounter.id === treecounter.id
    : false;
}

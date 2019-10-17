import React from 'react';
import PropTypes from 'prop-types';

import ContributionCard from './ContributionCard';
import i18n from '../../locales/i18n.js';

const UserContributions = ({
  // eslint-disable-next-line no-unused-vars
  userProfileId,
  userContributions,
  deleteContribution,
  isPublic
}) => {
  return (
    <div className="grid2x2">
      {Object.keys(userContributions).length > 0 ? (
        userContributions
          .sort(
            (a, b) =>
              new Date(b.registrationDate) - new Date(a.registrationDate)
          )
          .map(contribution => (
            <ContributionCard
              contribution={contribution}
              deleteContribution={deleteContribution}
              key={contribution.id}
            />
          ))
      ) : (
        <div className="no-contribution-wrapper">
          {isPublic
            ? i18n.t('label.no_contributions_public')
            : i18n.t('label.no_contributions')}
        </div>
      )}
    </div>
  );
};

UserContributions.propTypes = {
  userProfileId: PropTypes.number.isRequired,
  userContributions: PropTypes.array.isRequired,
  deleteContribution: PropTypes.func,
  isPublic: PropTypes.bool
};

export default UserContributions;

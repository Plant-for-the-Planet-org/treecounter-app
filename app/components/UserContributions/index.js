import React from 'react';
import PropTypes from 'prop-types';

import ContributionCardList from './ContributionCardList';
import ContributionsMapLegend from './ContributionsMapLegend';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card';
import InlineLink from '../Common/InlineLink';
import i18n from '../../locales/i18n.js';
import ArcGISContributionsMap from '../Map/ArcGISContributionsMap';

const UserContributions = ({
  userProfileId,
  userContributions,
  deleteContribution
}) => {
  return (
    <div className="app-container__content--center sidenav-wrapper">
      <TextHeading>{i18n.t('label.my_trees')}</TextHeading>
      <CardLayout>
        {Object.keys(userContributions).length > 0 ? (
          <div>
            <ArcGISContributionsMap userId={userProfileId} />
            <ContributionsMapLegend />
            <div className="contribution-container">
              <ContributionCardList
                contributions={userContributions}
                deleteContribution={deleteContribution}
              />
            </div>
            <div className="contribution-buttons">
              <InlineLink
                caption={i18n.t('label.registerFurther')}
                uri={'app_registerTrees'}
              />
              <InlineLink
                caption={i18n.t('label.donate_trees')}
                uri={'app_donateTrees'}
              />
            </div>
          </div>
        ) : (
          <div className="no-contribution-wrapper">
            {i18n.t('label.no_contributions')}
          </div>
        )}
      </CardLayout>
    </div>
  );
};

UserContributions.propTypes = {
  userProfileId: PropTypes.number.isRequired,
  userContributions: PropTypes.array.isRequired,
  deleteContribution: PropTypes.func
};

export default UserContributions;

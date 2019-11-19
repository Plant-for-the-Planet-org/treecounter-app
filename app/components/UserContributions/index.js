import React, { lazy } from 'react';
import PropTypes from 'prop-types';

const ContributionCardList = lazy(() => import('./ContributionCardList'));
const ContributionsMapLegend = lazy(() => import('./ContributionsMapLegend'));
const TextHeading = lazy(() => import('../Common/Heading/TextHeading'));
const CardLayout = lazy(() => import('../Common/Card'));
const InlineLink = lazy(() => import('../Common/InlineLink'));
const ArcGISContributionsMap = lazy(() =>
  import('../Map/ArcGISContributionsMap')
);

import i18n from '../../locales/i18n.js';

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

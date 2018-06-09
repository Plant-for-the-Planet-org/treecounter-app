import React from 'react';
import PropTypes from 'prop-types';

import ContributionCardList from './ContributionCardList';
import ContributionsMapLegend from './ContributionsMapLegend';
import * as constants from '../../SupportedLanguages/en';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import InlineLink from '../Common/InlineLink';
import ArcGISContributionsMap from '../Map/ArcGISContributionsMap';

const UserContributions = ({ userProfileId, userContributions }) => {
  return (
    <div className="app-container__content--center sidenav-wrapper">
      <TextHeading>My Trees</TextHeading>
      <CardLayout>
        {Object.keys(userContributions).length > 0 ? (
          <div>
            <ArcGISContributionsMap
              webMapId={'d601683709dc415b99ddc1bc66a6d8eb'}
              userId={userProfileId}
            />
            <ContributionsMapLegend />
            <div className="contribution-container">
              <ContributionCardList contributions={userContributions} />
            </div>
            <div className="contribution-buttons">
              <InlineLink
                caption={constants.formStrings.registerFurther}
                uri={'app_registerTrees'}
              />
              <InlineLink
                caption={constants.formStrings.DONATETREES}
                uri={'app_donateTrees'}
              />
            </div>
          </div>
        ) : (
          <div className="sidenav-wrapper">
            <div className="registeration-successfull">
              {constants.formStrings.noContributions}
            </div>
          </div>
        )}
      </CardLayout>
    </div>
  );
};

UserContributions.propTypes = {
  userProfileId: PropTypes.number.isRequired,
  userContributions: PropTypes.array.isRequired
};

export default UserContributions;

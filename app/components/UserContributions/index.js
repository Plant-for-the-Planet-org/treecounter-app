import React from 'react';
import PropTypes from 'prop-types';

import ContributionCardList from './ContributionCardList';
import ContributionsMapLegend from './ContributionsMapLegend';
import Map from '../Common/EsriMap/Map';
import * as constants from '../../SupportedLanguages/en';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import InlineLink from '../Common/InlineLink';

const UserContributions = ({ userContributions }) => {
  let mPins = userContributions.map(element => {
    let color = '';
    if (element.contributionType === 'donated') color = 'green';
    else if (element.treeCount > 1) color = 'blue';
    else color = 'orange';
    return {
      lat: element.geoLatitude,
      long: element.geoLongitude,
      color: color
    };
  });

  return (
    <div className="app-container__content--center sidenav-wrapper">
      <TextHeading>My Trees</TextHeading>
      <CardLayout>
        {Object.keys(userContributions).length > 0 ? (
          <div>
            <Map pins={mPins} />
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
  userContributions: PropTypes.array.isRequired
};

export default UserContributions;

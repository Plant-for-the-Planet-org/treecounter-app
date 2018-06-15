import React from 'react';
import PropTypes from 'prop-types';

import ContributionCardList from './ContributionCardList';
import ContributionsMapLegend from './ContributionsMapLegend';
import Map from '../Common/EsriMap/Map';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import InlineLink from '../Common/InlineLink';
import i18n from '../../locales/i18n.js';
import ArcGISContributionsMap from '../Map/ArcGISContributionsMap';

const UserContributions = ({ userProfileId, userContributions }) => {
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
      <TextHeading>{i18n.t('label.my_trees')}</TextHeading>
      <CardLayout>
        {Object.keys(userContributions).length > 0 ? (
          <div>
            <ArcGISContributionsMap
              webMapId={'d601683709dc415b99ddc1bc66a6d8eb'}
              userId={userProfileId}
            />
            <Map pins={mPins} />
            <ContributionsMapLegend />
            <div className="contribution-container">
              <ContributionCardList contributions={userContributions} />
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
          <div className="sidenav-wrapper">
            <div className="registeration-successfull">
              {i18n.t('label.no_contributions')}
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

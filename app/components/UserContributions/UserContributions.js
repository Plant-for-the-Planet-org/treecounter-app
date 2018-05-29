import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { history } from '../Common/BrowserRouter';
import { sortedUserContributionsSelector } from '../../selectors/index';
import ContributionCardList from './ContributionCardList';
import ContributionsMapLegend from './ContributionsMapLegend';
import PageHeader from '../Common/PageHeader';
import Map from '../Common/EsriMap/Map';
import * as constants from '../../SupportedLanguages/en';
import TextHeading from '../Common/Text/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import InlineLink from '../Common/InlineLink';

const UserContributions = ({ userContributions }) => {
  const updateContribution = contributionId =>
    history.push(`/some/link/${contributionId}`);

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
    <div className="app-container__content--center">
      <TextHeading>My Trees</TextHeading>
      <CardLayout>
        {Object.keys(userContributions).length > 0 ? (
          <div>
            <Map pins={mPins} />
            <ContributionsMapLegend />
            <div className="contribution-container">
              <ContributionCardList
                contributions={userContributions}
                updateContribution={() => updateContribution}
              />
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

const mapStateToProps = state => ({
  userContributions: sortedUserContributionsSelector(state)
});

export default connect(mapStateToProps)(UserContributions);

UserContributions.propTypes = {
  userContributions: PropTypes.array.isRequired
};

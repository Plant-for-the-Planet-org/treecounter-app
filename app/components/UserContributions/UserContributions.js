import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { history } from '../Common/BrowserRouter';
import { sortedUserContributionsSelector } from '../../selectors/index';
import ContributionCardList from './ContributionCardList';
import ContributionsMapLegend from './ContributionsMapLegend';
import PageHeader from '../Common/PageHeader';
import Map from '../Common/EsriMap/Map';
import * as constants from '../../SupportedLanguages/en';

const UserContributions = ({ userContributions }) => {
  const updateContribution = contributionId =>
    history.push(`/some/link/${contributionId}`);

  let mPins = userContributions.map(element => {
    let color = '';
    if (element.contribution_type === 'donated') color = 'green';
    else if (element.tree_count > 1) color = 'blue';
    else color = 'orange';
    return {
      lat: element.geo_latitude,
      long: element.geo_longitude,
      color: color
    };
  });

  console.log(userContributions);
  return (
    <div className="page-container my-trees">
      <PageHeader caption="My Trees" />
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
            <div className="pull-left">
              <Link to="/registerTrees">
                {constants.formStrings.registerFurther}
              </Link>
            </div>
            {/*<div className="pull-right"><a href="/donateTrees">{constants.formStrings.DONATETREES}</a></div>*/}
          </div>
        </div>
      ) : (
        <div className="sidenav-wrapper">
          <div className="registeration-successfull">
            {constants.formStrings.noContributions}
          </div>
        </div>
      )}
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

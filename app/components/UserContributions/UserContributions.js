import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import {history} from "../Common/BrowserRouter";
import {sortedUserContributionsSelector} from "../../selectors/index";
import ContributionCardList from "./ContributionCardList";
import ContributionsMap from "./ContributionsMap";
import ContributionsMapLegend from "./ContributionsMapLegend";
import PageHeader from "../Common/PageHeader";
import InlineLink from "../Common/InlineLink";
import ActionButton from "../Common/ActionButton";
import Map from '../RegisterTrees/map';
import * as constants from '../../SupportedLanguages/en';

const UserContributions = props => {

  const updateContribution = (contributionId) => (
    history.push(`/some/link/${contributionId}`)
  );

  const contributions = props.userContributions;

  let mPins = contributions.map(element => {
    let color = "";
    if (element.contribution_type === "donated") color = "green";
    else if (element.tree_count > 1) color = "blue";
    else color = "orange";
    return {lat: element.geo_latitude, long: element.geo_longitude, color: color};
  });

  console.log(contributions);
  return (
    <div className="page-container my-trees">
      <PageHeader caption="My Trees"/>
      {Object.keys(contributions).length > 0 ?
        <div>
          <Map pins={mPins}/>
          <ContributionsMapLegend/>
          <div className="contribution-container">
            <ContributionCardList contributions={contributions}
                                  updateContribution={contributionId => updateContribution}/>
          </div>
          <div className="contribution-buttons">
            <div className="pull-left"><Link to="/registerTrees">{constants.formStrings.registerFurther}</Link></div>
            {/*<div className="pull-right"><a href="/donateTrees">{constants.formStrings.DONATETREES}</a></div>*/}
          </div>
        </div>
        :
        <div className="sidenav-wrapper">
          <div className="registeration-successfull">
            {constants.formStrings.noContributions}
          </div>
        </div>}
    </div>
  );

};

const mapStateToProps = state => ({
  userContributions: sortedUserContributionsSelector(state),
});

export default connect(mapStateToProps)(UserContributions);

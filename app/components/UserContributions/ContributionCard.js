import React from 'react';
import PropTypes from 'prop-types';

const ContributionCard = ({ contribution }) => (
  <div
    style={{
      borderLeft:
        '5px solid ' +
        (contribution.contributionType == 'donated'
          ? 'lightgreen'
          : contribution.treeCount > 1
            ? 'orange'
            : 'lightblue')
    }}
    key={`contribution-${contribution.id}`}
    className={`contribution-container__card ${contribution.contributionType}`}
  >
    <div className="contribution-container__card--header">
      <div>
        <b className="cx-card-head">
          {contribution.treeCount} {contribution.treeType}{' '}
        </b>
      </div>
    </div>
    <div className="contribution-container__card--info">
      <div>
        {contribution.geoLatitude},{contribution.geoLongitude}
      </div>
      <div>{contribution.plantDate}</div>
    </div>
    <div className="contribution-container__card--tag">
      <div>{contribution.contributionType}</div>
    </div>
    <div className="contribution-container__card--footer">&nbsp;</div>
  </div>
);

ContributionCard.propTypes = {
  contribution: PropTypes.object.isRequired
};

export default ContributionCard;

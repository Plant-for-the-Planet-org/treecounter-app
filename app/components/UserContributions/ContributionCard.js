import React from 'react';
import PropTypes from 'prop-types';

const ContributionCard = ({ contribution }) => (
  <div
    style={{
      borderLeft:
        '5px solid ' +
        (contribution.contribution_type == 'donated'
          ? 'lightgreen'
          : contribution.tree_count > 1
            ? 'orange'
            : 'lightblue')
    }}
    key={`contribution-${contribution.id}`}
    className={`contribution-container__card ${
      contribution.contribution_type
      }`}
  >
    <div className="contribution-container__card--header">
      <div>
        <b className="cx-card-head">
          {contribution.tree_count} {contribution.tree_type}{' '}
        </b>
      </div>
    </div>
    <div className="contribution-container__card--info">
      <div>
        {contribution.geo_latitude},{contribution.geo_longitude}
      </div>
      <div>{contribution.plant_date}</div>
    </div>
    <div className="contribution-container__card--tag">
      <div>{contribution.contribution_type}</div>
    </div>
    <div className="contribution-container__card--footer">&nbsp;</div>
  </div>
);

ContributionCard.propTypes = {
  contribution: PropTypes.object.isRequired
};

export default ContributionCard;

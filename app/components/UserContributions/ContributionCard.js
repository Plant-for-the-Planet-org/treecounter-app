import React from 'react';
import PropTypes from 'prop-types';
import TextSpan from '../Common/Text/TextSpan';

const ContributionCard = ({ contribution }) => (
  <div>
    <div
      style={{
        borderLeft:
          '5px solid ' +
          (contribution.contributionType == 'donation'
            ? '#95c243'
            : contribution.treeCount > 1
              ? '#68aeec'
              : '#ec6453')
      }}
      key={`contribution-${contribution.id}`}
      className={`contribution-container__card ${
        contribution.contributionType
      }`}
    >
      <div className="contribution-container__left-column">
        <TextSpan strong={true}>
          {contribution.treeCount + ' ' + contribution.treeType + ' tree'}
        </TextSpan>
        <TextSpan>
          {contribution.geoLatitude + ', ' + contribution.geoLongitude}
        </TextSpan>
        <TextSpan>{contribution.plantDate}</TextSpan>
      </div>
    </div>
    <hr className="contribution-container__partition" />
  </div>
);

ContributionCard.propTypes = {
  contribution: PropTypes.object.isRequired
};

export default ContributionCard;

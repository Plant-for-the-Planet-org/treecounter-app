import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

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
        <TextSpan>
          {moment(new Date(contribution.plantDate)).format('DD MMM YYYY')}
        </TextSpan>
      </div>
      <div className="contribution-container__right-column">
        {contribution.contributionMeasurements.map(measurement => (
          <TextSpan>
            {contribution.plantDate === measurement.measurementDate
              ? 'Planting Day'
              : new Date(measurement.measurementDate).toLocaleDateString() +
                (measurement.diameter + 'cm').padStart(10) +
                ((measurement.height / 100).toFixed(1) + 'm').padStart(10)}
          </TextSpan>
        ))}
      </div>
    </div>
    <hr className="contribution-container__partition" />
  </div>
);

ContributionCard.propTypes = {
  contribution: PropTypes.object.isRequired
};

export default ContributionCard;

import React from 'react';
import PropTypes from 'prop-types';

import ChallengeCard from './challengeCard';

const ChallengeList = props => {
  const { challenges } = props;

  return challenges.map(
    challenge =>
      challenge && (
        <ChallengeCard
          challenge={challenge}
          challengeStatus={this.props.challengeStatus}
        />
      )
  );
};

ChallengeList.propTypes = {
  challenges: PropTypes.array.isRequired,
  challengeStatus: PropTypes.func
};

export default ChallengeList;

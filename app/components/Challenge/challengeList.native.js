import React from 'react';
import PropTypes from 'prop-types';

import ChallengeCard from './ChallengeCard';

const ChallengeList = props => {
  const { challenges } = props;

  return challenges.map(
    challenge => challenge && <ChallengeCard challenge={challenge} />
  );
};

ChallengeList.propTypes = {
  challenges: PropTypes.array.isRequired
};

export default ChallengeList;

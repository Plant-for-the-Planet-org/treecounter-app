import React from 'react';
import PropTypes from 'prop-types';

import ContributionCard from './ContributionCard';

const ContributionCardList = props => {
  const { contributions } = props;

  return contributions.map(contribution => (
    <ContributionCard contribution={contribution} key={contribution.id} />
  ));
};

ContributionCardList.propTypes = {
  contributions: PropTypes.array.isRequired
};

export default ContributionCardList;

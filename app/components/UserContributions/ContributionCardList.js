import React from 'react';
import PropTypes from 'prop-types';

import ContributionCard from './ContributionCard';

const ContributionCardList = props => {
  const { contributions, updateContribution } = props;

  return contributions.map(contribution => (
    <ContributionCard
      contribution={contribution}
      key={contribution.id}
      updateContribution={updateContribution}
    />
  ));
};

ContributionCardList.propTypes = {
  contributions: PropTypes.array.isRequired,
  updateContribution: PropTypes.func.isRequired
};

export default ContributionCardList;

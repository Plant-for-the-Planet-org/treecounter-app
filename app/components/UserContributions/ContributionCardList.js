import React from 'react';
import PropTypes, { object } from 'prop-types';

import ContributionCard from './ContributionCard';

const ContributionCardList = props => {
  const { contributions, deleteContribution } = props;
  return contributions
    .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
    .map(
      contribution =>
        contribution && (
          <ContributionCard
            contribution={contribution}
            deleteContribution={deleteContribution}
            key={contribution.id}
          />
        )
    );
};

ContributionCardList.propTypes = {
  contributions: PropTypes.array.isRequired,
  deleteContribution: PropTypes.func
};

export default ContributionCardList;

import React from 'react';
import PropTypes from 'prop-types';

import ContributionCard from './ContributionCard';

const ContributionCardList = props => {
  const { contributions, deleteContribution, showAllContributions } = props;

  return contributions.length > 3 && showAllContributions
    ? contributions.map(
        contribution =>
          contribution && (
            <ContributionCard
              contribution={contribution}
              deleteContribution={deleteContribution}
              key={contribution.id}
            />
          )
      )
    : contributions
        .slice(0, 3)
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

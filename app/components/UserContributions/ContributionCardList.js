import React, { lazy } from 'react';
import PropTypes from 'prop-types';

const ContributionCard = lazy(() => import('./ContributionCard'));
const ContributionCardList = props => {
  const { contributions, deleteContribution } = props;

  return contributions.map(
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

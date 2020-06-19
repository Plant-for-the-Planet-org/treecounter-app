import React from 'react';
import PropTypes from 'prop-types';

import ContributionCard from './ContributionCard';

const ContributionCardList = props => {
  const {deleteContribution } = props;
  let { contributions } = props;
  // console.table({ contributions })
  contributions = contributions.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.plantDate ? b.plantDate : b.redemptionDate) - new Date(a.plantDate ? a.plantDate : a.redemptionDate);
  });
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

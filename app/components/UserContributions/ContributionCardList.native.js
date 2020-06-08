import PropTypes from 'prop-types';
import React from 'react';
import { FlatList } from 'react-native';
import ContributionCard from './ContributionCard';
import { convertNumIdToString } from '../../utils/utils';

const ContributionCardList = props => {
  const {
    deleteContribution,
    showAllContributions,
    onPressSingleContribution,
    isCardPressed
  } = props;
  let { contributions } = props;
  console.table({ contributions })
  contributions = contributions.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.plantDate ? b.plantDate : b.redemptionDate) - new Date(a.plantDate ? a.plantDate : a.redemptionDate);
  });
  return (
    <FlatList
      data={convertNumIdToString(contributions.length > 3 && showAllContributions ? contributions : contributions.slice(0, 3))}
      renderItem={({ item }) => (
        <ContributionCard
          isCardPressed={isCardPressed}
          onPressSingleContribution={onPressSingleContribution}
          contribution={item}
          deleteContribution={deleteContribution}
          key={item.id}
          navigation={props.navigation}
        />
      )}
    />
  )
};

ContributionCardList.propTypes = {
  contributions: PropTypes.array.isRequired,
  deleteContribution: PropTypes.func
};

export default ContributionCardList;

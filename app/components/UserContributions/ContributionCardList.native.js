import PropTypes from 'prop-types';
import React from 'react';
import { FlatList } from 'react-native';
import ContributionCard from './ContributionCard';

const ContributionCardList = props => {
  const {
    contributions,
    deleteContribution,
    showAllContributions,
    onPressSingleContribution,
    isCardPressed
  } = props;
  return (
    <FlatList
      data={contributions.length > 3 && showAllContributions ? contributions : contributions.slice(0, 3)}
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

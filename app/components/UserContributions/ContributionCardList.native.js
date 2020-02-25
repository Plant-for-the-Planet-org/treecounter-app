import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import ContributionCard from './ContributionCard';

const ContributionCardList = props => {
  const { contributions, deleteContribution, showAllContributions } = props;

  return contributions.length > 3 && showAllContributions ? (
    <FlatList
      data={contributions}
      renderItem={({ item }) => (
        <ContributionCard
          contribution={item}
          deleteContribution={deleteContribution}
          key={item.id}
          navigation={props.navigation}
        />
      )}
    />
  ) : (
    <FlatList
      data={contributions.slice(0, 3)}
      renderItem={({ item }) => (
        <ContributionCard
          contribution={item}
          deleteContribution={deleteContribution}
          key={item.id}
          navigation={props.navigation}
        />
      )}
    />
  );
};

ContributionCardList.propTypes = {
  contributions: PropTypes.array.isRequired,
  deleteContribution: PropTypes.func
};

export default ContributionCardList;

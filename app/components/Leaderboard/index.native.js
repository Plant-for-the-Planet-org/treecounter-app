import React, { Component } from 'react';
import { Text } from 'react-native';
import { PropTypes } from 'prop-types';

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Text>Leader Board UnderConstruction !!</Text>;
  }
}

Leaderboard.propTypes = {
  categoryInfo: PropTypes.object,
  orderByOptionsInfo: PropTypes.object,
  timePeriodsInfo: PropTypes.object,
  sectionInfo: PropTypes.object,
  tabInfo: PropTypes.object,
  handleSectionChange: PropTypes.func,
  handleTabChange: PropTypes.func,
  queryResult: PropTypes.array,
  mapInfo: PropTypes.object,
  sortingQuery: PropTypes.object
};

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { PropTypes } from 'prop-types';
import CategoryTypes from './categoryType.native';

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CategoryTypes
          categoryInfo={this.props.categoryInfo}
          sectionInfo={this.props.sectionInfo}
        />
      </View>
    );
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

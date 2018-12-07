import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { PropTypes } from 'prop-types';
import CategoryTypes from './categoryTypes';
import LoadingIndicator from '../Common/LoadingIndicator';

export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
  }

  handleCategoryChange = section => {
    this.props.handleSectionChange(section);
  };

  getTableView = () => {
    console.log(this.props.queryResult);
    let listItemsUI = <LoadingIndicator />;
    const { categoryInfo, sectionInfo } = this.props;
    if (this.props.queryResult)
      listItemsUI = (
        <View>
          <Text>Query Results</Text>
        </View>
      );

    return listItemsUI;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <CategoryTypes
          categoryInfo={this.props.categoryInfo}
          sectionInfo={this.props.sectionInfo}
          handleCategoryChange={this.handleCategoryChange}
        />
        {this.getTableView()}
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

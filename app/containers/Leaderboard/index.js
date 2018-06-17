import React from 'react';
import Leaderboard from '../../components/Leaderboard';
import {
  ExploreDataAction,
  LeaderBoardDataAction
} from '../../actions/exploreAction';

class LeaderBoardContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      exploreData: {},
      queryResults: undefined
    };
  }

  sendSearchQuery(params) {
    if (!params) {
      params = {
        category: this.state.categoryInfo.categoryKeys[0],
        orderBy: this.state.orderByOptionsInfo.orderByOptionsKeys[0],
        period: this.state.timePeriodsInfo.timePeriodsKeys[0]
      };
    }

    LeaderBoardDataAction(params).then(
      success => {
        console.log('Response Success categories');
        console.log(success.data);
        if (success.data && success.data instanceof Object) {
          let listItems = [];
          for (let key in success.data) {
            if (success.data.hasOwnProperty(key)) {
              listItems.push(success.data[key]);
            }
          }
          this.setState({
            queryResults: listItems
          });
        }
      },
      error => console.log(error)
    );
  }

  searchQuery = params => {
    this.sendSearchQuery(params);
  };

  componentWillMount() {
    ExploreDataAction().then(
      success => {
        console.log('Response Success');
        console.log(success.data);
        let categoryInfo = {};
        let orderByOptionsInfo = {};
        let timePeriodsInfo = {};
        let exploreData = success.data;

        if (exploreData && exploreData.categories) {
          categoryInfo.categories = exploreData.categories;
          categoryInfo.categoryKeys = Object.keys(categoryInfo.categories);
        }
        if (exploreData && exploreData.orderByOptions) {
          orderByOptionsInfo.orderByOptions = exploreData.orderByOptions;
          orderByOptionsInfo.orderByOptionsKeys = Object.keys(
            orderByOptionsInfo.orderByOptions
          );
        }
        if (exploreData && exploreData.timePeriods) {
          timePeriodsInfo.timePeriods = exploreData.timePeriods;
          timePeriodsInfo.timePeriodsKeys = Object.keys(
            timePeriodsInfo.timePeriods
          );
        }
        this.setState({
          exploreData,
          categoryInfo,
          orderByOptionsInfo,
          timePeriodsInfo
        });
        this.sendSearchQuery();
      },
      error => console.log(error)
    );
  }

  render() {
    return (
      <Leaderboard
        ref={'leaderBoard'}
        categoryInfo={this.state.categoryInfo}
        orderByOptionsInfo={this.state.orderByOptionsInfo}
        timePeriodsInfo={this.state.timePeriodsInfo}
        queryResult={this.state.queryResults}
        sendSearchQuery={this.searchQuery}
      />
    );
  }
}
export default LeaderBoardContainer;

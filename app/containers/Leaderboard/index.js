import React from 'react';
import Leaderboard from '../../components/Leaderboard';
import {
  ExploreDataAction,
  LeaderBoardDataAction
} from '../../actions/exploreAction';
import PropTypes from 'prop-types';

class LeaderBoardContainer extends React.Component {
  constructor(props) {
    super(props);
    const { match } = props;
    // if (this.matchpar.path.con)
    console.log('route_match', match);
    this.state = {
      exploreData: {},
      match
    };
  }

  sendSearchQuery({
    section = this.state.categoryInfo.categoryKeys[0],
    subSection,
    orderBy = this.state.orderByOptionsInfo.orderByOptionsKeys[0],
    period = this.state.timePeriodsInfo.timePeriodsKeys[0]
  }) {
    return new Promise(function(resolve, reject) {
      LeaderBoardDataAction({ section, orderBy, period, subSection }).then(
        success => {
          console.log('Response Success categories');
          console.log(success.data);
          if (
            success.data &&
            success.data instanceof Object &&
            success.data.data
          ) {
            resolve(success.data.data);
          }
        },
        error => {
          console.log(error);
          reject(error);
        }
      );
    });
  }

  searchQuery = params => {
    return this.sendSearchQuery(params);
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

        if (exploreData && exploreData.sections) {
          categoryInfo.categories = exploreData.sections;
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
        // this.sendSearchQuery();
      },
      error => console.log(error)
    );
  }

  render() {
    return (
      <Leaderboard
        ref={'leaderBoard'}
        match={this.props.match}
        categoryInfo={this.state.categoryInfo}
        orderByOptionsInfo={this.state.orderByOptionsInfo}
        timePeriodsInfo={this.state.timePeriodsInfo}
        sendSearchQuery={this.searchQuery}
      />
    );
  }
}
export default LeaderBoardContainer;

LeaderBoardContainer.propTypes = {
  match: PropTypes.object
};

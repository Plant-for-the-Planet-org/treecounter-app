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
      mapData: []
    };
  }
  componentWillMount() {
    ExploreDataAction().then(
      success => {
        console.log('Response Success');
        console.log(success.data);
        this.setState({
          exploreData: success.data
        });
      },
      error => console.log(error)
    );
    let paramObj = {};
    paramObj.category = 'country';
    paramObj.orderBy = 'planted';
    paramObj.period = 'all';
    LeaderBoardDataAction(paramObj).then(
      success => {
        console.log('Response Success categories');
        console.log(success.data);
        let listItems = [];
        for (let key in success.data) {
          if (success.data.hasOwnProperty(key)) {
            listItems.push(success.data[key]);
          }
        }
        this.setState({
          mapData: listItems
        });
      },
      error => console.log(error)
    );
  }

  render() {
    return (
      <Leaderboard
        ref={'leaderBoard'}
        exploreData={this.state.exploreData}
        mapData={this.state.mapData}
      />
    );
  }
}
export default LeaderBoardContainer;

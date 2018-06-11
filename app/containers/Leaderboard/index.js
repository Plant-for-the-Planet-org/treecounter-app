import React from 'react';
import Leaderboard from '../../components/Leaderboard';

export default class LeaderboardContainer extends React.Component {
  render() {
    console.log('___render___LeaderboardContainer');
    return <Leaderboard ref={'EditUserProfileContainer'} exploreData={{}} />;
  }
}

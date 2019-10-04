import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

import ChallengeCard from './challengeCard';

class ChallengeList extends Component {
  render() {
    const { challenges } = this.props;
    return (
      <FlatList
        data={challenges}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
  _keyExtractor = item => item.id.toString();

  _renderItem = ({ item }) => (
    <ChallengeCard
      key={item.id}
      challenge={item}
      challengeStatus={this.props.challengeStatus}
    />
  );
}

ChallengeList.propTypes = {
  challenges: PropTypes.array.isRequired,
  challengeStatus: PropTypes.func
};

export default ChallengeList;

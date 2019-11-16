import React, { Component, Suspense, lazy } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';

const ChallengeCard = lazy(() => import('./challengeCard'));

class ChallengeList extends Component {
  render() {
    const { challenges } = this.props;
    return (
      <FlatList
        data={challenges}
        // eslint-disable-next-line no-underscore-dangle
        keyExtractor={this._keyExtractor}
        // eslint-disable-next-line no-underscore-dangle
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

import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../locales/i18n.js';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList
} from 'react-native';
import TouchableItem from '../../components/Common/TouchableItem';
import challengesStyle from '../../styles/challenge';

import CardLayout from '../Common/Card';

export default class ChallengeCard extends React.Component {
  render() {
    let { challenge } = this.props;
    console.log(challenge);
    let { direction, goal, end_date, status, created, fullname } = challenge;
    return (
      <CardLayout>
        <Text style={challengesStyle.goalStyle}>
          {goal + ' Trees by ' + end_date}
        </Text>
        <Text>{direction === 'target' ? 'from' : 'to'}</Text>
        <Text>{created}</Text>
        <Text>{fullname}</Text>
        {direction === 'target' ? (
          <Text>Dummy</Text>
        ) : (
          <Text style={challengesStyle.statusLabel}>{status}</Text>
        )}
      </CardLayout>
    );
  }
}

ChallengeCard.propTypes = {
  challenge: PropTypes.object.isRequired
};

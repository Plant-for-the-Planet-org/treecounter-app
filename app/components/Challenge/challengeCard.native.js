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

import challengesStyle from '../../styles/challenge';

import CardLayout from '../Common/Card';
import UserProfileImage from '../Common/UserProfileImage';

export default class ChallengeCard extends React.Component {
  render() {
    let { challenge } = this.props;
    console.log(challenge);
    let {
      direction,
      goal,
      avatar,
      end_date,
      status,
      created,
      fullname
    } = challenge;
    return (
      <CardLayout>
        <Text style={challengesStyle.goalStyle}>
          {goal + ' Trees by ' + end_date}
        </Text>
        <View style={challengesStyle.flexStyle}>
          <UserProfileImage profileImage={avatar} />
          <View>
            <Text>{direction === 'target' ? 'from' : 'to'}</Text>
            <Text>{fullname}</Text>
          </View>
        </View>
        <Text>{created}</Text>
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

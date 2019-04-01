import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

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
import PrimaryButton from '../Common/Button/PrimaryButton';
import SecondaryButton from '../Common/Button/SecondaryButton';
import { upwardArrow, downwardArrow } from '../../assets/index.js';

export default class ChallengeCard extends React.Component {
  render() {
    let { challenge } = this.props;
    //console.log(challenge);
    let {
      direction,
      goal,
      avatar,
      end_date,
      status,
      created,
      fullname,
      token
    } = challenge;
    return (
      <CardLayout>
        <View style={challengesStyle.flexStyle}>
          <View style={challengesStyle.limitWidth}>
            <Text style={challengesStyle.goalStyle}>
              {goal.toLocaleString() +
                ' Trees' +
                (end_date !== null ? ' by ' + end_date : '')}
            </Text>
            <View style={challengesStyle.flexStyle}>
              <UserProfileImage profileImage={avatar} />
              <View>
                <View
                  style={[
                    challengesStyle.flexStyle,
                    challengesStyle.textPadding
                  ]}
                >
                  <Text style={challengesStyle.textStyle}>
                    {direction === 'target' ? 'from ' : 'to '}
                  </Text>
                  <Text style={challengesStyle.textStyle}>{fullname}</Text>
                </View>
                <View style={challengesStyle.flexStyle}>
                  <Image
                    style={challengesStyle.imageStyle}
                    resizeMode="contain"
                    source={
                      direction === 'target' ? downwardArrow : upwardArrow
                    }
                  />
                  <Text
                    style={[
                      challengesStyle.textStyle,
                      challengesStyle.textPadding
                    ]}
                  >
                    {moment(created).format('D MMM, YYYY')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {direction === 'target' && status === 'pending' ? (
            <View>
              <PrimaryButton
                buttonStyle={challengesStyle.buttonStyle}
                textStyle={challengesStyle.textStyle}
                onClick={() =>
                  this.props.challengeStatus({ status: 'accept' }, token)
                }
              >
                Accept
              </PrimaryButton>
              <SecondaryButton
                buttonStyle={challengesStyle.buttonStyle}
                textStyle={challengesStyle.textStyle}
                onClick={() =>
                  this.props.challengeStatus({ status: 'declined' }, token)
                }
              >
                Reject
              </SecondaryButton>
            </View>
          ) : (
            <Text style={challengesStyle.statusLabel}>{status}</Text>
          )}
        </View>
      </CardLayout>
    );
  }
}

ChallengeCard.propTypes = {
  challenge: PropTypes.object.isRequired
};

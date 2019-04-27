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
import { delimitNumbers } from '../../utils/utils';
import { upwardArrow, downwardArrow } from '../../assets/index.js';

export default class ChallengeCard extends React.Component {
  render() {
    let { challenge } = this.props;
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
      <CardLayout style={[challengesStyle.challengeContainer]}>
        <View style={challengesStyle.challengeViewContainer}>
          <View style={challengesStyle.limitWidth}>
            <Text style={challengesStyle.goalStyle}>
              {delimitNumbers(goal) + i18n.t('label.trees')} + (end_date !==
              null ? ' {i18n.t('label.by')} ' + end_date : '')}
            </Text>
            <View style={challengesStyle.flexStyle}>
              <UserProfileImage
                profileImage={avatar}
                style={challengesStyle.profileImage}
                imageStyle={{ borderRadius: 15 }}
              />
              <View>
                <View style={challengesStyle.textPadding}>
                  <Text style={challengesStyle.textStyle}>
                    {direction === 'target'
                      ? i18n.t('label.from') + ' '
                      : i18n.t('label.to') + ' '}{' '}
                    {fullname}
                  </Text>
                </View>
                <View style={challengesStyle.challengeDate}>
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
                      challengesStyle.textChallengePadding
                    ]}
                  >
                    {moment(created).format('D MMM, YYYY')}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {direction === 'target' && status === 'pending' ? (
            <View style={challengesStyle.buttonContainer}>
              <PrimaryButton
                buttonStyle={challengesStyle.buttonStyle}
                textStyle={challengesStyle.buttonTextStyle}
                onClick={() =>
                  this.props.challengeStatus({ status: 'active' }, token)
                }
              >
                {i18n.t('label.accept')}
              </PrimaryButton>
              <SecondaryButton
                buttonStyle={challengesStyle.buttonStyle}
                textStyle={challengesStyle.buttonTextStyle}
                onClick={() =>
                  this.props.challengeStatus({ status: 'declined' }, token)
                }
              >
                {i18n.t('label.reject')}
              </SecondaryButton>
            </View>
          ) : (
            <View style={challengesStyle.buttonContainer}>
              <PrimaryButton
                buttonStyle={challengesStyle.moreButtonStyle}
                textStyle={challengesStyle.moreButtonTextStyle}
                onClick={() => {}}
              >
                {status && status.toUpperCase()}
              </PrimaryButton>
            </View>
          )}
        </View>
      </CardLayout>
    );
  }
}

ChallengeCard.propTypes = {
  challenge: PropTypes.object.isRequired
};

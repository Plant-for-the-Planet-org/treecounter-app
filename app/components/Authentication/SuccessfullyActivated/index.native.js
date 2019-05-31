import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '../../../locales/i18n.js';
import { Text, View, Image, ScrollView } from 'react-native';

import styles from '../../../styles/accountActivate';

import { check_green, redeemSignIn } from '../../../assets';
import InlineLink from '../../Common/InlineLink';

export default class SuccessfullyActivatedAccount extends Component {
  render() {
    const setTarget = (
      <InlineLink uri={'app_userHome'} caption="set a target" />
    );
    const customizeProfile = (
      <InlineLink uri={'app_userHome'} caption="customize your profile" />
    );
    const login = <InlineLink caption="login" uri={'app_login'} />;

    return (
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <View style={styles.container}>
          {this.props.success ? (
            <Image
              source={check_green}
              resizeMode="contain"
              style={styles.imageStyle}
            />
          ) : (
            <Image
              source={redeemSignIn}
              resizeMode="contain"
              style={styles.imageStyle}
            />
          )}
          {this.props.success ? (
            <Text style={styles.textStyle}>
              You have successfully activated your account.
            </Text>
          ) : (
            <Text style={styles.textStyle}>
              Your account has already been activated previously.
            </Text>
          )}
          {this.props.success ? (
            <View>
              <Text style={styles.textStyle}>You can</Text>
              {customizeProfile}
              <Text>now or </Text>
              {setTarget}
            </View>
          ) : (
            <View style={styles.textStyle}>
              <Text>You can</Text>
              {login}
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}

SuccessfullyActivatedAccount.propTypes = {
  success: PropTypes.any
};

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
      <InlineLink uri={'app_userHome'} caption={i18n.t('label.set_a_target')} />
    );
    const customizeProfile = (
      <InlineLink
        uri={'app_userHome'}
        caption={i18n.t('label.customize_your_profile')}
      />
    );
    const login = (
      <InlineLink caption={i18n.t('label.login')} uri={'app_login'} />
    );

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
              {i18n.t('label.successfully_activated')}
            </Text>
          ) : (
            <Text style={styles.textStyle}>
              {i18n.t('label.already_activated')}
            </Text>
          )}
          <View>
            {this.props.success ? (
              <Text style={styles.textStyle}>
                {
                  i18n.t('label.do_profile_or_target',
                  {
                    customizeProfile: customizeProfile,
                    setTarget: setTarget
                  })
                }
              </Text>
            ) : (
              <Text style={styles.textStyle}>
                {
                  i18n.t('label.do_login',
                  {
                    login: login
                  })
                }
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    );
  }
}

SuccessfullyActivatedAccount.propTypes = {
  success: PropTypes.any
};

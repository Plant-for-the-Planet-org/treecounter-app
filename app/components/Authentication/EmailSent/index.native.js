import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '../../../locales/i18n.js';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

import styles from '../../../styles/login';
import { updateRoute } from '../../../helpers/routerHelper/routerHelper.native';

import { GreenEmail, emailSent } from '../../../assets';
import HeaderNew from './../../Header/HeaderNew.native';

export default class ActivateAccount extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderNew title={''} navigation={this.props.navigation} />
        <View
          style={{
            backgroundColor: 'white',
            padding: 24,
            paddingTop: 120,
            height: '100%'
          }}
        >
          <Image
            source={emailSent}
            resizeMode={'contain'}
            style={styles.emailSentImage}
          />
          <Text style={[styles.actionButtonText, { color: '#4d5153' }]}>
            {i18n.t('label.mail_sent')}
          </Text>
          <Text
            style={[
              styles.actionButtonText,
              {
                color: '#4d5153',
                fontFamily: 'OpenSans-Regular',
                marginTop: 20
              }
            ]}
          >
            {i18n.t('label.secure_link')}
          </Text>

          <TouchableOpacity
            style={[
              styles.actionButtonTouchable,
              { marginLeft: 24, marginRight: 24 }
            ]}
            onPress={() => updateRoute('app_login', this.props.navigation)}
          >
            <View style={[styles.actionButtonView]}>
              <Text style={styles.actionButtonText}>
                {i18n.t('label.try_again_login')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

ActivateAccount.propTypes = {
  sendEmail: PropTypes.func,
  email: PropTypes.string
};

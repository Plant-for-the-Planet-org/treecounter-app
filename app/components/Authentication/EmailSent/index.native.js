import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '../../../locales/i18n.js';
import { Text, View, Image, ScrollView } from 'react-native';

import styles from '../../../styles/accountActivate';

import { GreenEmail } from '../../../assets';
import InlineLink from '../../Common/InlineLink';

export default class ActivateAccount extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <View style={styles.container}>
          <Image source={GreenEmail} style={styles.imageStyle} />
          <Text style={styles.boldText}>{i18n.t('label.mail_sent')}</Text>
          <Text style={styles.textStyle}>{i18n.t('label.secure_link')}</Text>
          <InlineLink
            uri={'app_login'}
            caption={i18n.t('label.try_again_login')}
          />
        </View>
      </ScrollView>
    );
  }
}

ActivateAccount.propTypes = {
  sendEmail: PropTypes.func,
  email: PropTypes.string
};

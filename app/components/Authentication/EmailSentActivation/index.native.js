import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '../../../locales/i18n.js';
import { Text, View, Image, ScrollView } from 'react-native';

import styles from '../../../styles/accountActivate';

import { RedEmail } from '../../../assets';
import SecondaryButton from '../../Common/Button/SecondaryButton';

export default class EmailSentActivation extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <View style={styles.container}>
          <Image source={RedEmail} style={styles.imageStyle} />
          <Text style={styles.textStyle}>
            {i18n.t('label.mail_sent_activation')}
          </Text>
          <Text style={styles.textStyle}>
            {i18n.t('label.complete_sigup_process')}
          </Text>
          <Text style={styles.textStyle}>
            {i18n.t('label.resend_email_text')}
          </Text>
          <SecondaryButton onClick={() => this.props.sendEmail()}>
            {i18n.t('label.resent_email')}
          </SecondaryButton>
        </View>
      </ScrollView>
    );
  }
}

EmailSentActivation.propTypes = {
  sendEmail: PropTypes.func
};

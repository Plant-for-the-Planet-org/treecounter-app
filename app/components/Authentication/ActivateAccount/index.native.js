import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '../../../locales/i18n.js';
import { Text, View, Image, ScrollView } from 'react-native';

import styles from '../../../styles/accountActivate';

import { RedEmail } from '../../../assets';
import SecondaryButton from '../../Common/Button/SecondaryButton';

export default class ActivateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sentClicked: false
    };
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        {this.state.sentClicked ? (
          <View style={styles.container}>
            <Image
              source={RedEmail}
              resizeMode={'contain'}
              style={styles.imageStyle}
            />
            <Text style={styles.textStyle}>
              {i18n.t('label.mail_sent_activation')}
            </Text>
            <Text style={styles.textStyle}>
              {i18n.t('label.complete_sigup_process')}
            </Text>
            <Text style={styles.textStyle}>
              {i18n.t('label.resend_email_text')}
            </Text>
            <SecondaryButton
              onClick={() => {
                this.setState({ sentClicked: true });
                this.props.sendEmail();
              }}
            >
              {i18n.t('label.resent_email')}
            </SecondaryButton>
          </View>
        ) : (
          <View style={styles.container}>
            <Image
              source={RedEmail}
              resizeMode={'contain'}
              style={styles.imageStyle}
            />
            <Text style={styles.boldText}>
              {i18n.t('label.not_yet_activated')}
            </Text>
            <Text style={styles.textStyle}>
              {i18n.t('label.received_email')}
            </Text>
            <Text style={styles.textStyle}>
              {i18n.t('label.not_received_email')}
            </Text>
            <SecondaryButton
              onClick={() => {
                this.setState({ sentClicked: true });
                this.props.sendEmail();
              }}
            >
              {i18n.t('label.resent_email')}
            </SecondaryButton>
          </View>
        )}
      </ScrollView>
    );
  }
}

ActivateAccount.propTypes = {
  sendEmail: PropTypes.func,
  email: PropTypes.string
};

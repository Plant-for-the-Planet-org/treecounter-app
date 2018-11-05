import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from '../../../locales/i18n.js';
import { Text, View, Image, ScrollView } from 'react-native';

import styles from '../../../styles/forgetpassword';

import { RedEmail } from '../../../assets';
import SecondaryButton from '../../Common/Button/SecondaryButton';
import TextBlock from '../../Common/Text/TextBlock';

export default class ActivateAccount extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollViewStyle}>
        <Image source={RedEmail} style={styles.imageStyle} />
        <Text strong={true}>{i18n.t('label.not_yet_activated')}</Text>
        <Text>{i18n.t('label.received_email')}</Text>
        <Text>{i18n.t('label.not_received_email')}</Text>
        <SecondaryButton onClick={() => sendEmail()}>
          {i18n.t('label.resent_email')}
        </SecondaryButton>
      </ScrollView>
    );
  }
}

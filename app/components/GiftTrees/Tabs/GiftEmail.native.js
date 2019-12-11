/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, Component } from 'react';

import { View, Image, Text, Keyboard, TouchableOpacity } from 'react-native';
import { iosInformation } from '../../../assets';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import i18n from '../../../locales/i18n';
import styles from '../../../styles/gifttrees/giftrees';
import buttonStyles from '../../../styles/common/button.native';
import { forward } from './../../../assets';
import FormikFormGift from './FormikFormGift.native';

export default class GiftEmail extends Component {
  constructor(props) {
    super(props);

    this.state = { buttonType: 'next' };
  }
  render() {
    const style = { backgroundColor: 'white', flex: 1 };
    return (
      <View style={style}>
        <FormikFormGift
          initialValues={{
            firstName: '',
            lastname: '',
            email: '',
            message: ''
          }}
          openProjects={this.props.openProjects}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { View } from 'react-native';
import HeaderNew from '../../Header/HeaderNew.native';
import FormikFormGift from './FormikFormGift.native';
import styles from './../../../styles/gifttrees/giftrees';

export default class GiftEmail extends Component {
  constructor(props) {
    super(props);
    this.state = { buttonType: 'next' };
  }
  render() {
    return (
      <View style={styles.view_container}>
        <HeaderNew title={''} navigation={this.props.navigation} />
        <FormikFormGift
          initialValues={{
            firstname: '',
            lastname: '',
            email: '',
            message: ''
          }}
          openProjects={this.props.openProjects}
          navigation={this.props.navigation}
          setGiftContextDetails={this.props.navigation.getParam(
            'setGiftContextDetails'
          )}
        />
      </View>
    );
  }
}

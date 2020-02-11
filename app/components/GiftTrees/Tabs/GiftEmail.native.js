/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';

import { View } from 'react-native';
import FormikFormGift from './FormikFormGift.native';

export default class GiftEmail extends Component {
  constructor(props) {
    super(props);

    this.state = { buttonType: 'next' };
  }
  render() {
    const style = { backgroundColor: 'white', flex: 1, marginTop: 20 };
    return (
      <View style={style}>
        <FormikFormGift
          initialValues={{
            firstname: '',
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

/* eslint-disable no-underscore-dangle */
import React from 'react';

import { View } from 'react-native';
import FormikFormGift from './FormikFormGift';

export default (GiftEmail = props => {
  const style = { backgroundColor: 'white', flex: 1 };
  return (
    <View style={style}>
      <FormikFormGift
        initialValues={{
          firstname: '',
          lastname: '',
          email: '',
          message: ''
        }}
        openProjects={props.openProjects}
        navigation={props.navigation}
      />
    </View>
  );
});

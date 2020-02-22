import React, { useState, useEffect } from 'react';
import { View, Keyboard } from 'react-native';
import { FormikForm } from './formComponents.native';
import HeaderNew from './../../Header/HeaderNew.native';

export default function createCompetition(props) {
  const [buttonType, setButtonType] = useState('competition');

  const keyboardDidShow = () => {
    setButtonType('>');
  };

  const keyboardDidHide = () => {
    setButtonType('competition');
  };

  let keyboardDidShowListener;
  let keyboardDidHideListener;
  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow
    );
    keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide
    );
    // clean up
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const style = { backgroundColor: 'white', flex: 1 };

  return (
    <View style={style}>
      <HeaderNew title={''} navigation={props.navigation} />
      <View style={{ marginTop: Platform.OS === 'ios' ? 80 : 40 }} />
      <FormikForm
        buttonType={buttonType}
        onCreateCompetition={props.navigation.getParam('onCreateCompetition')}
        initialValues={{
          name: '',
          goal: '',
          description: '',
          access: '',
          endDate: new Date(new Date().valueOf() + 1000 * 3600 * 24),
          imageFile: ''
        }}
      />
    </View>
  );
}

import React, { useState, useEffect } from 'react';
import { View, Keyboard } from 'react-native';
import { FormikForm } from './formComponents.native';

export default function createCompetition(props) {
  const [buttonType, setButtonType] = useState('competition');

  const keyboardDidShow = () => {
    setButtonType('>');
  };

  const keyboardDidHide = () => {
    setButtonType('competition');
  };

  useEffect(() => {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide
    );
    // clean up
    return () => {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    };
  }, []);
  const style = { backgroundColor: 'white', flex: 1 };

  return (
    <View style={style}>
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

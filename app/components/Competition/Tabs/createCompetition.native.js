import React, { useState, useEffect } from 'react';
import { View, Keyboard } from 'react-native';
import { FormikForm } from './formComponents.native';

export default function createCompetition(props) {
  const [buttonType, setButtonType] = useState('competition');

  _keyboardDidShow = () => {
    setButtonType('>');
  };

  _keyboardDidHide = () => {
    setButtonType('competition');
  };

  useEffect(() => {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    );
    // clean up
    return () => {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <FormikForm
        buttonType={buttonType}
        onCreateCompetition={props.navigation.getParam('onCreateCompetition')}
        initialValues={{
          name: '',
          goal: '',
          description: '',
          access: '',
          endDate: new Date(),
          imageFile: null
        }}
      />
    </View>
  );
}

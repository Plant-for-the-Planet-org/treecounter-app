import React from 'react';
import i18n from '../../locales/i18n';
import { View } from 'react-native';
export function SelectTemplate(locals) {
  function onChange($event) {
    locals.onChange($event.target.value);
  }
  return <View />;
}

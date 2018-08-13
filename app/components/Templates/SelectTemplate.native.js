import { Text, View, Picker } from 'react-native';
import React from 'react';
import i18n from '../../locales/i18n';
// import { Dropdown } from 'react-native-material-dropdown';
import EStyleSheet from 'react-native-extended-stylesheet';

export function SelectTemplate(locals) {
  let pickerStyle = {
    marginLeft: 20,
    borderColor: '#cecece',
    borderBottomWidth: 1,
    height: 35
  };
  let itemStyle = {
    color: EStyleSheet.value('$textColor'),
    height: 35,
    textAlign: 'left',
    fontSize: 13
  };
  return (
    <View>
      <Picker
        mode="dropdown"
        selectedValue={locals.value}
        onValueChange={(itemValue, itemIndex) => locals.onChange(itemValue)}
        style={pickerStyle}
        itemStyle={itemStyle}
      >
        {locals.options.map(option => (
          <Picker.Item
            key={option.value}
            label={i18n.t(option.text)}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
  );
}

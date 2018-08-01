import { Text, View, Picker } from 'react-native';
import React from 'react';
import i18n from '../../locales/i18n';
// import { Dropdown } from 'react-native-material-dropdown';

export function SelectTemplate(locals) {
  let containerStyle = {
    paddingBottom: 20
  };
  let pickerStyle = {
    marginLeft: 36,
    borderColor: '#cecece',
    borderBottomWidth: 1,
    height: 40
  };
  let itemStyle = {
    color: '#686060',
    height: 40,
    textAlign: 'left',
    fontSize: 16
  };
  return (
    <View style={containerStyle}>
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

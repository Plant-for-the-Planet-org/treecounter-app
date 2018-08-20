import { Text, View, Picker } from 'react-native';
import React from 'react';
import i18n from '../../locales/i18n';
// import { Dropdown } from 'react-native-material-dropdown';
import EStyleSheet from 'react-native-extended-stylesheet';
import styles from '../../styles/forms/select';

export function SelectTemplate(locals) {
  return (
    <View style={styles.pickerViewStyle}>
      <Picker
        mode="dropdown"
        selectedValue={locals.value}
        onValueChange={(itemValue, itemIndex) => locals.onChange(itemValue)}
        style={styles.pickerStyle}
        //  itemStyle={styles.itemStyle}
      >
        {locals.options.map(option => (
          <Picker.Item
            itemStyle={styles.itemStyle}
            key={option.value}
            label={i18n.t(option.text)}
            color={'#686060'}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
  );
}

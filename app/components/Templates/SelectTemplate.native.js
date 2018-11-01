import { Text, View, Picker } from 'react-native';
import React from 'react';
import i18n from '../../locales/i18n';
import styles from '../../styles/forms/select';
export function getSelectTemplate(enumOption) {
  return function SelectTemplate(locals) {
    const options = enumOption ? enumOption : locals.options;
    return (
      <View style={styles.containerStyle}>
        <Picker
          mode="dropdown"
          selectedValue={locals.value}
          onValueChange={(itemValue, itemIndex) => locals.onChange(itemValue)}
          style={styles.pickerStyle}
          itemStyle={styles.itemStyle}
        >
          {options.map(option => (
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
  };
}

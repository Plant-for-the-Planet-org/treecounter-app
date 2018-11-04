import { Text, View, Image, TextInput } from 'react-native';
import React from 'react';
import i18n from '../../locales/i18n';

export function TextAreaTemplate(locals) {
  let containerStyle = {
    paddingTop: 20,
    paddingBottom: 20,
    height: 150
  };
  let textboxStyle = {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
    borderBottomWidth: 1,
    borderColor: '#cecece',
    height: 150
  };
  let errorBlockStyle = locals.stylesheet && locals.stylesheet.errorBlock;
  let error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null;
  return (
    <View>
      <View style={containerStyle}>
        <TextInput
          style={textboxStyle}
          secureTextEntry={locals.secureTextEntry}
          placeholder={i18n.t(locals.placeholder)}
          keyboardType={locals.keyboardType}
          maxLength={locals.maxLength}
          multiline={6}
          value={locals.value}
          onChangeText={value => locals.onChange(value)}
          onChange={locals.onChangeNative}
          onKeyPress={locals.onKeyPress}
          returnKeyType={locals.returnKeyType}
          autoCapitalize={locals.autoCapitalize}
        />
      </View>
      {error}
    </View>
  );
}

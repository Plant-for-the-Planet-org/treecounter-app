import t from 'tcomb-form-native';
import { Text, View, Image, TextInput } from 'react-native';
import React from 'react';

export function TextInputTemplate(locals) {
  let containerStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20
  };
  let imageStyle = { width: 26, height: 26, resizeMode: 'center' };
  let textboxStyle = {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
    borderBottomWidth: 1,
    borderColor: '#cecece'
  };
  let errorBlockStyle = locals.stylesheet.errorBlock;
  let error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null;
  return (
    <View>
      <View style={containerStyle}>
        <Image style={imageStyle} source={locals.config.iconUrl} />
        <TextInput
          style={textboxStyle}
          secureTextEntry={locals.secureTextEntry}
          placeholder={locals.placeholder}
          keyboardType={locals.keyboardType}
          maxLength={locals.maxLength}
          multiline={locals.multiline}
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

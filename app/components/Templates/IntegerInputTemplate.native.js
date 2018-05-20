import { Text, View, Image, TextInput } from 'react-native';
import React from 'react';
import i18n from '../../locales/i18n';

export function IntegerInputTemplate(locals) {
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

  function onChanged(text) {
    let newText = '';
    let numbers = '0123456789';

    for (let i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      }
    }
    locals.onChange(newText);
  }

  let error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null;

  return (
    <View>
      <View style={containerStyle}>
        {locals.config.iconUrl ? (
          <Image style={imageStyle} source={locals.config.iconUrl} />
        ) : null}
        <TextInput
          style={textboxStyle}
          secureTextEntry={locals.secureTextEntry}
          placeholder={i18n.t(locals.placeholder)}
          keyboardType={locals.keyboardType}
          maxLength={locals.maxLength}
          multiline={locals.multiline}
          value={locals.value}
          onChangeText={value => onChanged(value)}
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

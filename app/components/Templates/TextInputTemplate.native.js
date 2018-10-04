import { Text, View, Image, TextInput } from 'react-native';
import React from 'react';
import i18n from '../../locales/i18n';
import styles from '../../styles/forms/textinput';
export function TextInputTemplate(locals) {
  if (locals.hidden) {
    return null;
  }
  function onChange(value) {
    value =
      locals.keyboardType === 'numeric' && value ? parseInt(value) : value;
    locals.onChange(value);
  }

  let errorBlockStyle = locals.stylesheet && locals.stylesheet.errorBlock;
  let error =
    locals.hasError && locals.error ? (
      <Text style={[errorBlockStyle, styles.errorTextStyle]}>
        {locals.error}
      </Text>
    ) : null;
  return (
    <View style={[styles.container]}>
      <View style={[styles.containerStyle, locals.config.style]}>
        {locals.config.iconUrl ? (
          <View style={styles.imageContainerStyle}>
            <Image style={styles.imageStyle} source={locals.config.iconUrl} />
          </View>
        ) : null}
        <TextInput
          style={styles.textboxStyle}
          secureTextEntry={locals.secureTextEntry}
          placeholder={i18n.t(locals.placeholder)}
          placeholderTextColor={'#686060'}
          keyboardType={locals.keyboardType}
          underlineColorAndroid={'transparent'}
          maxLength={locals.maxLength}
          multiline={locals.multiline}
          value={String(locals.value)}
          onChangeText={value => onChange(value)}
          onChange={locals.onChangeNative}
          onKeyPress={locals.onKeyPress}
          returnKeyType={locals.returnKeyType}
          autoCapitalize={locals.autoCapitalize}
          allowFontScaling={true}
        />
      </View>
      <View style={styles.errorStyle}>{error}</View>
    </View>
  );
}

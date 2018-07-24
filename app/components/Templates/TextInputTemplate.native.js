import { Text, View, Image, TextInput } from 'react-native';
import React from 'react';
import i18n from '../../locales/i18n';
import styles from '../../styles/forms/textinput';
export function TextInputTemplate(locals) {
  function onChange(value) {
    value =
      locals.keyboardType === 'numeric' && value ? parseInt(value) : value;
    locals.onChange(value);
  }

  let errorBlockStyle = locals.stylesheet && locals.stylesheet.errorBlock;
  let error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null;
  return (
    <View style={styles.container}>
      <View style={styles.containerStyle}>
        {locals.config.iconUrl ? (
          <Image style={styles.imageStyle} source={locals.config.iconUrl} />
        ) : null}
        <TextInput
          style={styles.textboxStyle}
          secureTextEntry={locals.secureTextEntry}
          placeholder={i18n.t(locals.placeholder)}
          keyboardType={locals.keyboardType}
          maxLength={locals.maxLength}
          multiline={locals.multiline}
          value={locals.value}
          onChangeText={value => onChange(value)}
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

import { TouchableOpacity, Text, View, Image } from 'react-native';
import React from 'react';

import i18n from '../../locales/i18n';
import { checkedIcon, uncheckedIcon } from '../../assets';

export function CheckboxTemplate(locals) {
  let containerStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20
  };
  let imageStyle = {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'center'
  };

  let textboxStyle = {
    flex: 1
  };

  function checkboxClicked() {
    locals.onChange(!locals.value);
  }
  return (
    <View style={containerStyle}>
      <TouchableOpacity onPress={checkboxClicked}>
        {locals.value ? (
          <Image style={imageStyle} source={checkedIcon} />
        ) : (
          <Image style={imageStyle} source={uncheckedIcon} />
        )}
      </TouchableOpacity>
      <Text style={textboxStyle}>{i18n.t(locals.label)}</Text>
    </View>
  );
}

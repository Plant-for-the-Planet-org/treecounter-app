import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { imageUpload } from '../../assets';
import i18n from '../../locales/i18n';

const ImagePicker = require('react-native-image-picker');
const options = {
  title: 'Add Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export function FilePickerTemplate(locals) {
  return (
    <View>
      <TouchableOpacity
        onPress={event => {
          ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              let source = { uri: response.uri };
              locals.onChange('data:image/jpeg;base64,' + response.data);
            }
          });
        }}
      >
        <Image source={imageUpload} style={{ height: 100, width: 100 }} />
        {!locals.value ? (
          <Text>{i18n.t('label.select_file')}</Text>
        ) : (
          <Image
            source={{ uri: locals.value }}
            style={{ height: 100, width: 100, marginLeft: 20 }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}

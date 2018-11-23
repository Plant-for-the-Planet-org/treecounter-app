import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { imageUpload } from '../../assets';
import i18n from '../../locales/i18n';
import styles from '../../styles/file_picker.native';
import { getImageUrl } from '../../actions/apiRouting';

const ImagePicker = require('react-native-image-picker');
const options = {
  title: 'Add Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export function FilePickerTemplate(locals) {
  let { category, variant } = locals.config || {};

  return (
    <View style={styles.filePickerContainer}>
      <TouchableOpacity
        onPress={event => {
          ImagePicker.showImagePicker(options, response => {
            //console.log('Response = ', response);

            if (response.didCancel) {
              //console.log('User cancelled image picker');
            } else if (response.error) {
              // console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              // console.log('User tapped custom button: ', response.customButton);
            } else {
              let source = { uri: response.uri };
              locals.onChange('data:image/jpeg;base64,' + response.data);
            }
          });
        }}
      >
        <Image source={imageUpload} style={{ height: 100, width: 100 }} />
      </TouchableOpacity>
      {!locals.value ? null : (
        <Image
          source={{
            uri: !locals.value.includes('base64')
              ? getImageUrl(category, variant, locals.value)
              : locals.value
          }}
          style={{ height: 80, width: 80, marginLeft: 20 }}
        />
      )}
    </View>
  );
}

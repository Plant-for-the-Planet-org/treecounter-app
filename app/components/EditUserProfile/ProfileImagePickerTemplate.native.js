import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from '../../styles/file_picker.native';
import UserProfileImage from '../Common/UserProfileImage';
import { close_green } from '../../assets';

const ImagePicker = require('react-native-image-picker');
const options = {
  title: 'Add Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export function ProfileImagePickerTemplate(locals) {
  let { category, variant } = locals.config || {};
  //console.log('ProfileImagePickerTemplate', locals);
  return (
    <View style={styles.filePickerContainer}>
      <TouchableOpacity
        onPress={event => {
          ImagePicker.showImagePicker(options, response => {
            // console.log('Response = ', response);

            if (response.didCancel) {
              //console.log('User cancelled image picker');
            } else if (response.error) {
              //console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              // console.log('User tapped custom button: ', response.customButton);
            } else {
              let source = { uri: response.uri };
              locals.onChange('data:image/jpeg;base64,' + response.data);
            }
          });
        }}
      >
        <UserProfileImage profileImage={locals.value} />
        <Image
          resizeMode="contain"
          style={styles.addIcon}
          source={close_green}
        />
      </TouchableOpacity>
    </View>
  );
}

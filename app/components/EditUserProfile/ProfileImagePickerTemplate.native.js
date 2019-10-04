import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from '../../styles/file_picker.native';
import UserProfileImage from '../Common/UserProfileImage';
import { close_green } from '../../assets';
import ImagePicker from 'react-native-image-picker';
import i18n from '../../locales/i18n';

export function ProfileImagePickerTemplate(locals) {
  // eslint-disable-next-line no-unused-vars
  let { category, variant } = locals.config || {};

  const options = {
    title: i18n.t('label.add_image_title'),
    cancelButtonTitle: i18n.t('label.cancel'),
    takePhotoButtonTitle: i18n.t('label.take_photo'),
    chooseFromLibraryButtonTitle: i18n.t('label.choose_from_library'),
    'permissionDenied.title': i18n.t('label.permission_denied_title'),
    'permissionDenied.text': i18n.t('label.permission_denied_text'),
    'permissionDenied.reTryTitle': i18n.t(
      'label.permission_denied_retry_title'
    ),
    'permissionDenied.okTitle': i18n.t('label.permission_denied_ok_title'),
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

  //console.log('ProfileImagePickerTemplate', locals);
  return (
    <View style={styles.filePickerContainer}>
      <TouchableOpacity
        onPress={
          (/* event */) => {
            ImagePicker.showImagePicker(options, response => {
              // console.log('Response = ', response);

              if (response.didCancel) {
                //console.log('User cancelled image picker');
              } else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
              } else {
                // eslint-disable-next-line no-unused-vars
                let source = { uri: response.uri };
                locals.onChange('data:image/jpeg;base64,' + response.data);
              }
            });
          }
        }
      >
        <UserProfileImage profileImage={locals.value} />
        <View style={styles.profileImageBackground}>
          <Image
            resizeMode="contain"
            style={styles.addIcon}
            source={close_green}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

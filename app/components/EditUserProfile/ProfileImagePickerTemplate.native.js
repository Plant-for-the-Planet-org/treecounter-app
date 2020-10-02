import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
// import { debug } from '../../debug';
import styles from '../../styles/file_picker.native';
import UserProfileImage from '../Common/UserProfileImage';
import { close_green } from '../../assets';
import { debug } from '../../debug';
import i18n from '../../locales/i18n';

export function ProfileImagePickerTemplate(locals) {
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

  //debug('ProfileImagePickerTemplate', locals);
  return (
    <View style={styles.filePickerContainer}>
      <TouchableOpacity
        onPress={
          (/* event */) => {
            ImagePicker.showImagePicker(options, response => {
              //debug('Response = ', response);

              if (response.didCancel) {
                //debug('User cancelled image picker');
              } else if (response.error) {
                debug('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                //debug('User tapped custom button: ', response.customButton);
              } else {
                // let source = { uri: response.uri };
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

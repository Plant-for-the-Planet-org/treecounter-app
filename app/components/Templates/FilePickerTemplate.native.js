import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { imageUpload } from '../../assets';
import i18n from '../../locales/i18n';
import styles from '../../styles/file_picker.native';
import { getImageUrl } from '../../actions/apiRouting';
import ImagePicker from 'react-native-image-picker';

export function FilePickerTemplate(locals) {
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

  return (
    <View style={styles.filePickerContainer}>
      <TouchableOpacity
        // eslint-disable-next-line no-unused-vars
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
              // eslint-disable-next-line no-unused-vars
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

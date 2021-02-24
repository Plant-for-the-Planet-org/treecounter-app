import React from 'react';
import { Alert, View, Image, Text, TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS, request } from 'react-native-permissions';
import RBSheet from 'react-native-raw-bottom-sheet';
import { debug } from '../../debug';
import { imageUpload } from '../../assets';
import i18n from '../../locales/i18n';
import styles from '../../styles/file_picker.native';
import buttonStyles from '../../styles/common/button.native';
import { getImageUrl } from '../../actions/apiRouting';

export function FilePickerTemplate(locals) {
  let { category, variant } = locals.config || {};

  const options = {
    // title: i18n.t('label.add_image_title'),
    // cancelButtonTitle: i18n.t('label.cancel'),
    // takePhotoButtonTitle: i18n.t('label.take_photo'),
    // chooseFromLibraryButtonTitle: i18n.t('label.choose_from_library'),
    // 'permissionDenied.title': i18n.t('label.permission_denied_title'),
    // 'permissionDenied.text': i18n.t('label.permission_denied_text'),
    // 'permissionDenied.reTryTitle': i18n.t(
    //   'label.permission_denied_retry_title'
    // ),
    // 'permissionDenied.okTitle': i18n.t('label.permission_denied_ok_title'),
    // storageOptions: {
    //   skipBackup: true,
    //   path: 'images'
    // }
    mediaType: 'photo',
    includeBase64: true,
  };


  const openCamera = () => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA
      })
    ).then((/*response*/) => {
      launchCamera(options, response => {
        if (response.didCancel) {
          RBSheetRef.close();
          //debug('User cancelled image picker');
        } else if (response.errorCode) {
          RBSheetRef.close();
          debug('ImagePicker Error: ', response.errorCode, response.errorMessage);
          Alert.alert(
            i18n.t('label.permission_denied_title'),
            i18n.t('label.permission_denied_text'),
          );
        } else {
          RBSheetRef.close();
          locals.onChange('data:image/jpeg;base64,' + response.base64);
        }
      });
    });
  };

  const openImageLibrary = () => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY
      })
    ).then((/*response*/) => {
      launchImageLibrary(options, response => {
        if (response.didCancel) {
          RBSheetRef.close();
          //debug('User cancelled image picker');
        } else if (response.errorCode) {
          RBSheetRef.close();
          debug('ImagePicker Error: ', response.errorCode, response.errorMessage);
          Alert.alert(
            i18n.t('label.permission_denied_title'),
            i18n.t('label.permission_denied_text'),
          );
        } else {
          RBSheetRef.close();
          locals.onChange('data:image/jpeg;base64,' + response.base64);
        }
      });
    });
  };

  let RBSheetRef = null;

  return (
    <View style={styles.filePickerContainer}>
      <TouchableOpacity
        onPress={
          (/* event */) => {
            RBSheetRef.open();
          }
        }
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

      <RBSheet
        ref={ref => {
          RBSheetRef = ref;
        }}
        height={300}
        duration={250}
        customStyles={{
          container: {
            justifyContent: 'center'
          }
        }}
      >
        <View>
          <Text style={buttonStyles.bottomSheetTitle}>
             {i18n.t('label.add_image_title')}
          </Text>
          <View>
            <TouchableOpacity onPress={openCamera}>
              <Text style={buttonStyles.bottomSheetItem}>
                {i18n.t('label.take_photo')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={openImageLibrary}>
              <Text style={buttonStyles.bottomSheetItem}>
                {i18n.t('label.choose_from_library')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { RBSheetRef.close(); }}>
              <Text style={buttonStyles.bottomSheetItem}>
                {i18n.t('label.cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </View>
  );
}

import React from 'react';
import { Alert, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { debug } from '../../../debug';
import { cameraSolid, imageGallery, circleDelete } from '../../../assets';
import styles from '../../../styles/competition/competition-form.native';
import i18n from '../../../locales/i18n';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS, request } from 'react-native-permissions';

const AddImage = props => {
  const images = props.images;

  const options = {
    // title: props.title || i18n.t('label.add_image'),
    // cancelButtonTitle: i18n.t('label.cancel'),
    // takePhotoButtonTitle: i18n.t('label.take_photo'),
    // chooseFromLibraryButtonTitle: i18n.t('label.choose_from_library'),
    // 'permissionDenied.title': i18n.t('label.permission_denied_title'),
    // 'permissionDenied.text': i18n.t('label.permission_denied_text'),
    // 'permissionDenied.reTryTitle': i18n.t(
    //   'label.permission_denied_retry_title'
    // ),
    // 'permissionDenied.okTitle': i18n.t('label.permission_denied_ok_title'),
    // allowsEditing: true,
    // mediaType: 'photo',
    // multiple: true,
    // storageOptions: {
    //   skipBackup: true,
    //   path: 'images'
    // }
    mediaType: 'photo',
    includeBase64: true,
  };

  const renderAsset = (image, index) => {
    //debug(image);
    return (
      <View
        key={index}
        style={[{ borderRadius: 4, position: 'relative', marginRight: 8 }]}
      >
        <Image
          style={[styles.teaser__projectImage, { width: 200, height: 150 }]}
          source={{ uri: image }}
          // resizeMode={'cover'}
        />
        <TouchableOpacity
          style={[styles.competitionDeleteButton]}
          onPress={() => props.deleteImage(index)}
        >
          <Image style={styles.competitionDeleteImage} source={circleDelete} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={styles.addImageTitle}>
        {props.title ? props.title : i18n.t('label.add_image')}
      </Text>
      <ScrollView horizontal>
        {images && images != 'null' ? images.reverse().map(renderAsset) : null}
      </ScrollView>
      <View style={styles.addImageButtonContainer}>
        <TouchableOpacity
          style={styles.addImageButton1}
          onPress={() => {
            request(
              Platform.select({
                android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
                ios: PERMISSIONS.IOS.PHOTO_LIBRARY
              })
            ).then((/*response*/) => {
              launchImageLibrary(options, response => {
                if (response.didCancel) {
                  //debug('User cancelled image picker');
                } else if (response.errorCode) {
                  debug('ImagePicker Error: ', response.errorCode, response.errorMessage);
                  Alert.alert(
                    i18n.t('label.permission_denied_title'),
                    i18n.t('label.permission_denied_text'),
                  );
                } else {
                  props.updateImages('data:image/jpeg;base64,' + response.base64);
                }
              });
            });
          }}
        >
          <Image style={styles.addImageButtonIcon} source={imageGallery} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            request(
              Platform.select({
                android: PERMISSIONS.ANDROID.CAMERA,
                ios: PERMISSIONS.IOS.CAMERA
              })
            ).then((/*response*/) => {
              launchCamera(options, response => {
                if (response.didCancel) {
                  //debug('User cancelled image picker');
                } else if (response.errorCode) {
                  debug('ImagePicker Error: ', response.errorCode, response.errorMessage);
                  Alert.alert(
                    i18n.t('label.permission_denied_title'),
                    i18n.t('label.permission_denied_text'),
                  );
                } else {
                  props.updateImages('data:image/jpeg;base64,' + response.base64);
                }
              });
            });
          }}
          style={styles.addImageButton2}
        >
          <Image style={styles.addImageButtonIcon} source={cameraSolid} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddImage;

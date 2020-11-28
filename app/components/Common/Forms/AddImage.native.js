import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { debug } from '../../../debug';
import { cameraSolid, imageGallery, circleDelete } from '../../../assets';
import styles from '../../../styles/competition/competition-form.native';
import i18n from '../../../locales/i18n';
import ImagePicker from 'react-native-image-picker';

const AddImage = props => {
  const images = props.images;

  const options = {
    title: props.title || i18n.t('label.add_image'),
    cancelButtonTitle: i18n.t('label.cancel'),
    takePhotoButtonTitle: i18n.t('label.take_photo'),
    chooseFromLibraryButtonTitle: i18n.t('label.choose_from_library'),
    'permissionDenied.title': i18n.t('label.permission_denied_title'),
    'permissionDenied.text': i18n.t('label.permission_denied_text'),
    'permissionDenied.reTryTitle': i18n.t(
      'label.permission_denied_retry_title'
    ),
    'permissionDenied.okTitle': i18n.t('label.permission_denied_ok_title'),
    allowsEditing: true,
    mediaType: 'photo',
    multiple: true,
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
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
            ImagePicker.launchImageLibrary(options, response => {
              if (response.didCancel) {
                //debug('User cancelled image picker');
              } else if (response.error) {
                debug('ImagePicker Error: ', response.error);
              } else {
                //debug('ImagePicker data: ', response.data);
                props.updateImages('data:image/jpeg;base64,' + response.data);
              }
            });
          }}
        >
          <Image style={styles.addImageButtonIcon} source={imageGallery} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            ImagePicker.launchCamera(options, response => {
              if (response.didCancel) {
                //debug('User cancelled image picker');
              } else if (response.error) {
                //debug('ImagePicker Error: ', response.error);
              } else {
                props.updateImages('data:image/jpeg;base64,' + response.data);
              }
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

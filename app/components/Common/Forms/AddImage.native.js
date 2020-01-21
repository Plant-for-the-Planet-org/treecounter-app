import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import {
  cameraSolid,
  imageGallery,
  circleDelete,
  deleteOutlineWhite
} from '../../../assets';
import styles from '../../../styles/add_image.native';
import i18n from '../../../locales/i18n';
import ImagePicker from 'react-native-image-picker';

const AddImage = props => {
  const images = props.images;

  const options = {
    title: props.title || 'Add Image',
    allowsEditing: true,
    mediaType: 'photo',
    multiple: true,
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

  const renderAsset = (image, index) => {
    console.log('Images====>', image);
    return (
      <View key={index} style={[{ position: 'relative', marginRight: 8 }]}>
        <Image
          style={[styles.teaser__projectImage, { width: 300, height: 150 }]}
          source={{ uri: image }}
          // resizeMode={'cover'}
        />
        <View style={[styles.competitionDeleteButton]}>
          <TouchableOpacity
            onPress={() => props.deleteImage(index)}
            style={styles.addDeleteButtonIcon}
          >
            <Image
              style={{ height: 28, width: 28 }}
              source={deleteOutlineWhite}
            />
            <Text
              style={{
                color: '#fff',
                fontFamily: 'OpenSans-Regular',
                fontSize: 14,
                lineHeight: 28
              }}
            >
              Remove
            </Text>
          </TouchableOpacity>
        </View>
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
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else {
                console.log('ImagePicker data: ', response.data);
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
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
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

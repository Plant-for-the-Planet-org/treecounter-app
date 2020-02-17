import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Header from '../Header/BackHeader';
import PrimaryButton from '../Common/Button/PrimaryButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';

const RegisterTreesCaptureImage = ({
  onPressContinueAfterSeletImage,
  updateImageURI,
  coordinates,
  isPolygon,
  toggleIsRegisterTreesMap
}) => {
  const [imageURI, setImageURI] = useState(null);

  const options = {
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

  let onPressCamera = index => {
    ImagePicker.launchCamera(options, response => {
      setImageURI(response.uri);
      updateImageURI(response.uri, index);
    });
  };

  let onPressDone = () => {
    isPolygon
      ? alert('navigate to Multiple Register Screen')
      : onPressContinueAfterSeletImage();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeaderText}>{`Location ${
          coordinates.location
        }`}</Text>
        <Text
          style={styles.subHeadingText}
        >{`PLease take a picture facing planted trees.`}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Image
            source={{
              uri: imageURI
                ? imageURI
                : 'https://cdn2.vectorstock.com/i/1000x1000/17/61/select-image-vector-11591761.jpg'
            }}
            resizeMode={'contain'}
            style={styles.image}
          />
          <TouchableOpacity
            onPress={() => onPressCamera()}
            style={styles.cameraContainer}
          >
            <View style={styles.cameraIcon}>
              <Icon name={'camera-alt'} color={'#000'} size={23} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={styles.bottomDetailsText}>
          For verification purpose, your location is recorded when you take a
          picture
        </Text>
        <View style={styles.bottomBtnContainer}>
          <PrimaryButton
            onClick={toggleIsRegisterTreesMap}
            buttonStyle={styles.backBtnStyle}
          >
            <Text style={styles.backBtn}>{'Back'}</Text>
          </PrimaryButton>
          <PrimaryButton onClick={onPressDone} buttonStyle={styles.buttonStyle}>
            <Text style={styles.continueBtn}>
              {isPolygon ? 'Done' : 'Continue'}
            </Text>
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subHeaderContainer: {
    marginHorizontal: 15
  },
  subHeaderText: {
    fontSize: 27,
    fontFamily: 'OpenSans-Bold',
    lineHeight: 40,
    color: '#4d5153'
  },
  subHeadingText: {
    fontSize: 18,
    fontFamily: 'OpenSans-Regular',
    lineHeight: 24,
    color: '#4d5153'
  },
  image: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 5,
    marginVertical: 15
  },
  cameraContainer: {
    position: 'absolute',
    bottom: -5,
    left: '45%',
    shadowColor: '#000'
  },
  cameraIcon: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 12,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: 'red',
    shadowOffset: { height: 0, width: 0 },
    elevation: 4
  },
  bottomDetailsText: {
    fontFamily: 'OpenSans-Regular',
    textAlign: 'center',
    marginHorizontal: 20,
    lineHeight: 20,
    marginVertical: 10
  },
  bottomBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  buttonStyle: {
    width: 150,
    height: 52,
    borderRadius: 100,
    backgroundColor: '#89b53a'
  },
  continueBtn: {
    width: 150,
    height: 22,
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#ffffff'
  },
  backBtnStyle: {
    width: 150,
    height: 52,
    borderRadius: 100,
    backgroundColor: '#fff'
  },
  backBtn: {
    width: 150,
    height: 22,
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#89b53a'
  }
});
export default RegisterTreesCaptureImage;

import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Header from '../Header/BackHeader';
import PrimaryButton from '../Common/Button/PrimaryButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CaptureImage = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeaderText}>Location A</Text>
        <Text
          style={styles.subHeadingText}
        >{`PLease take a picture facing planted trees.`}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Image
            source={{
              uri:
                'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
            }}
            resizeMode={'contain'}
            style={styles.image}
          />
          <View style={styles.cameraContainer}>
            <View style={styles.cameraIcon}>
              <Icon name={'camera-alt'} color={'#000'} size={23} />
            </View>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.bottomDetailsText}>
          For verification purpose, your location is recorded when you take a
          picture
        </Text>
        <View style={styles.bottomBtnContainer}>
          <PrimaryButton buttonStyle={styles.backBtnStyle}>
            <Text style={styles.backBtn}>{'Back'}</Text>
          </PrimaryButton>
          <PrimaryButton buttonStyle={styles.buttonStyle}>
            <Text style={styles.continueBtn}>{'Continue'}</Text>
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
export default CaptureImage;

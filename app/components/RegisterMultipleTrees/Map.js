import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Geojson, Polygon } from 'react-native-maps';
import Header from '../Header/BackHeader';
import PrimaryButton from '../Common/Button/PrimaryButton';

const RegisterTreesMap = ({
  location,
  coordinates,
  upDateMarker,
  toggleIsRegisterTreesMap
}) => {
  let polygenCoordinates = coordinates.map(x => {
    return {
      latitude: x.latitude,
      longitude: x.longitude
    };
  });
  // console.log('coordinates', coordinates)
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeaderText}>{`Location ${location}`}</Text>
        <Text
          style={styles.subHeadingText}
        >{`Please draw your planting area.\nYou can add one or more polygons.`}</Text>
      </View>
      <MapView
        initialRegion={{
          latitude: 35.746512259918504,
          longitude: 79.453125,
          latitudeDelta: 0.922,
          longitudeDelta: 0.421
        }}
        mapType={'satellite'}
        style={{ flex: 1 }}
      >
        <Polygon
          strokeColor={'#fff'}
          strokeWidth={2}
          coordinates={polygenCoordinates}
        />
        {coordinates.map((oneMarker, index) => {
          return (
            <Marker
              key={index}
              onDragEnd={({ nativeEvent }) => {
                upDateMarker(nativeEvent.coordinate, index);
              }}
              draggable
              coordinate={{
                latitude: oneMarker.latitude,
                longitude: oneMarker.longitude
              }}
            >
              <View style={styles.markerContainer}>
                <View style={styles.markerCircle}>
                  <Text style={styles.markerText}>{oneMarker.location}</Text>
                </View>
                <View style={styles.markerStick} />
              </View>
            </Marker>
          );
        })}
      </MapView>
      <View style={styles.bottomBtnContainer}>
        <PrimaryButton
          onClick={toggleIsRegisterTreesMap}
          buttonStyle={styles.buttonStyle}
        >
          <Text style={styles.continueBtn}>{'Select Location & Continue'}</Text>
        </PrimaryButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  markerStick: {
    width: 3,
    height: 40,
    backgroundColor: '#78B806',
    borderRadius: 10
  },
  bottomBtnContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center'
  },
  markerCircle: {
    width: 30,
    height: 30,
    backgroundColor: '#78B806',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  markerContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  subHeaderContainer: {
    marginHorizontal: 15
  },
  subHeaderText: {
    fontSize: 27,
    fontFamily: 'OpenSans-Bold',
    lineHeight: 40,
    color: '#4d5153'
  },
  markerText: {
    color: 'white'
  },
  subHeadingText: {
    fontSize: 18,
    fontFamily: 'OpenSans-Regular',
    lineHeight: 24,
    color: '#4d5153',
    marginVertical: 15
  },
  buttonStyle: {
    width: 240,
    height: 52,
    borderRadius: 100,
    backgroundColor: '#89b53a'
  },
  continueBtn: {
    width: 72,
    height: 22,
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#ffffff'
  }
});

export default RegisterTreesMap;

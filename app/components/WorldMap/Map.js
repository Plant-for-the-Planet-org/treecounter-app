import React from 'react';
import { treesmarker } from '../../assets/index.js';
import { StyleSheet, Text, View, Image } from 'react-native';

import MapView, { Marker, Callout } from 'react-native-maps';

const MapComponent = () => {
  return (
    <View style={styles.container}>
      <MapView
        mapType={'satellite'}
        style={styles.container}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }}>
          <View style={styles.markerDot} />
          <Callout tooltip={true}>
            <View style={styles.callOutBubbleCont}>
              <View style={styles.fullNameCont}>
                <Text style={styles.firstNameText}>Haider</Text>
                <Text style={styles.lastNameText}> Ali</Text>
              </View>
              <View style={styles.bottomCont}>
                <Text style={styles.numberOfTrees}>10</Text>
                <Text style={styles.imageTree}>
                  <Image source={treesmarker} />
                </Text>
                <View style={styles.donateBtnCont}>
                  <Text style={styles.donateText}>Donate</Text>
                </View>
              </View>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  markerDot: {
    //position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: '#093988',
    borderRadius: 50
  },
  callOutBubbleCont: {
    width: 190,
    height: 75,
    backgroundColor: 'white',
    borderColor: 'lightgray',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  fullNameCont: {
    flexDirection: 'row'
  },
  firstNameText: {
    fontFamily: 'OpenSans-Bold',
    color: 'black'
  },
  lastNameText: {
    fontFamily: 'OpenSans-SemiBold',
    color: 'black'
  },
  bottomCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  numberOfTrees: {
    fontFamily: 'OpenSans-Bold',
    color: '#89b53a',
    fontSize: 18
  },
  imageTree: {
    height: 20,
    marginHorizontal: 10,
    height: 30
  },
  donateBtnCont: {
    backgroundColor: '#f2f2f7',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 30
  },
  donateText: {
    color: '#4d5153',
    fontFamily: 'OpenSans-Regular'
  }
});

export default MapComponent;

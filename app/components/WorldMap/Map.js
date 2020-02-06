import React from 'react';
import { treesmarker } from '../../assets/index.js';
import { StyleSheet, Text, View, Image } from 'react-native';

import MapView, { Marker, UrlTile, Callout } from 'react-native-maps';

const MapComponent = () => {
  return (
    <View style={styles.container}>
      <MapView
        //mapType={'satellite'}
        style={styles.container}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0922
        }}
      >
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }}>
          <View style={styles.markerDot} />
        </Marker>
        <UrlTile //Satellite Layer
          //  urlTemplate="https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=tonlguDL1FCuJhvRhFqr"
          zIndex={-1}
        />
        <UrlTile // List of all Planted trees [https://github.com/novalabio/react-native-maps-super-cluster#readme]
          urlTemplate="https://services7.arcgis.com/lKUTwQ0dhJzktt4g/arcgis/rest/services/PublicTreeInventoryViewTileLayer/MapServer/tile/{z}/{y}/{x}?token=mSy9WNeISOT-MyFlQ4ejs6-5NAzMGW7J4py4pb4TpiBrPq_D7zrNC0vW5J3UPcD8ZpikQw4raJGpYP3hgZYmf6BQM7nM4jlAz3s6oyK8ZZaqjMGpZFtO7bl2B4VG8fYIxJmOUIsYHPT-Y_wNiJEV4f8xu2guhZg1X7dG_ng5prkwULLeQKkSLmpOIjqMe5rH3x-3_FlzOli5rr0WUYL2s82MS57qwR2XuwrrTJesAU47KE8F7W6yDDC9iWxmsPWpgtQ_kbtH3jpeB-1_qOGdYyjPpMcqgCGqr1cdHQUKt-hBEHWjoIss9OlDpyuyioGa"
          zIndex={-1}
        />
        <UrlTile //Restoration Potential
          urlTemplate="https://tiles.arcgis.com/tiles/lKUTwQ0dhJzktt4g/arcgis/rest/services/WWF_Restoration_V3/MapServer/tile/{z}/{y}/{x}?token=mSy9WNeISOT-MyFlQ4ejs6-5NAzMGW7J4py4pb4TpiBrPq_D7zrNC0vW5J3UPcD8ZpikQw4raJGpYP3hgZYmf6BQM7nM4jlAz3s6oyK8ZZaqjMGpZFtO7bl2B4VG8fYIxJmOUIsYHPT-Y_wNiJEV4f8xu2guhZg1X7dG_ng5prkwULLeQKkSLmpOIjqMe5rH3x-3_FlzOli5rr0WUYL2s82MS57qwR2XuwrrTJesAU47KE8F7W6yDDC9iWxmsPWpgtQ_kbtH3jpeB-1_qOGdYyjPpMcqgCGqr1cdHQUKt-hBEHWjoIss9OlDpyuyioGa"
          zIndex={-1}
        />
        <UrlTile //Current Forest Density
          urlTemplate="https://tiles.arcgis.com/tiles/lKUTwQ0dhJzktt4g/arcgis/rest/services/Forest_Denisty_V2/MapServer/tile/{z}/{y}/{x}?token=mSy9WNeISOT-MyFlQ4ejs6-5NAzMGW7J4py4pb4TpiBrPq_D7zrNC0vW5J3UPcD8ZpikQw4raJGpYP3hgZYmf6BQM7nM4jlAz3s6oyK8ZZaqjMGpZFtO7bl2B4VG8fYIxJmOUIsYHPT-Y_wNiJEV4f8xu2guhZg1X7dG_ng5prkwULLeQKkSLmpOIjqMe5rH3x-3_FlzOli5rr0WUYL2s82MS57qwR2XuwrrTJesAU47KE8F7W6yDDC9iWxmsPWpgtQ_kbtH3jpeB-1_qOGdYyjPpMcqgCGqr1cdHQUKt-hBEHWjoIss9OlDpyuyioGa"
          zIndex={-1}
        />
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

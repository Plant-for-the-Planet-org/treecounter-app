import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import RegisterTreesCaptureImage from './CaptureImage';
import RegisterTreesMap from './Map';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const RegisterMultipleTrees = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [isRegisterTreesMap, setisRegisterTreesMap] = useState(true);
  const [currentLocation, setCurrentLocation] = useState({});
  const [isPolygon, setIsPolygon] = useState(false);
  const [mapUri, setMapUri] = useState(undefined);
  useEffect(() => {
    getCoordinates();
    getMapUri();
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setCoordinates([
          ...coordinates,
          ...[
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              location: ALPHABETS[coordinates.length],
              imageURI: ''
            }
          ]
        ]);
        console.log(position, 'position');
      },
      error => alert(error.message),
      { enableHighAccuracy: false, timeout: 25000, maximumAge: 3600000 }
    );
  }, []);

  let getMapUri = async () => {
    try {
      const mapuri = await AsyncStorage.getItem('@mapuri');
      if (mapuri !== null) {
        setMapUri(mapuri);
        console.log(mapuri, 'mapuri');
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  let getCoordinates = async () => {
    try {
      const value = await AsyncStorage.getItem('@coordinates');
      if (value !== null) {
        console.log(JSON.parse(value), 'getCoordinates');
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  let upDateMarker = (latlong, index) => {
    let marker = coordinates[index];
    marker.latitude = latlong.latitude;
    marker.longitude = latlong.longitude;
    coordinates.splice(index, 1, marker);
    setCoordinates([...coordinates]);
  };

  let updateImageURI = uri => {
    let marker = coordinates[coordinates.length - 1];
    marker.imageURI = uri;
    coordinates.splice(coordinates.length - 1, 1, marker);
    setCoordinates(coordinates);
  };

  let toggleIsRegisterTreesMap = () => {
    setisRegisterTreesMap(!isRegisterTreesMap);
  };

  let onPressContinueAfterSeletImage = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setCoordinates([
          ...coordinates,
          ...[
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              location: ALPHABETS[coordinates.length],
              imageURI: ''
            }
          ]
        ]);
        toggleIsRegisterTreesMap();
        console.log(position, 'position');
      },
      error => alert(error.message),
      { enableHighAccuracy: false, timeout: 25000, maximumAge: 3600000 }
    );
  };

  let onPressDoneAfterPolygon = async () => {
    console.log('coordinates', coordinates);
    let GeoJSONObj = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                ...coordinates.map(x => [x.longitude, x.latitude]),
                [coordinates[0].longitude, coordinates[0].latitude]
              ]
            ]
          }
        }
      ]
    };
    let polygonData = { geoJSON: GeoJSONObj, coordinates: coordinates };
    console.log(polygonData, 'dummyGeoJSONObj');
    try {
      await AsyncStorage.setItem('@coordinates', JSON.stringify(polygonData));
      alert('data successfully stored');
    } catch (e) {
      // saving error
    }
  };

  console.log(coordinates);
  return (
    <View style={{ flex: 1 }}>
      {isRegisterTreesMap ? (
        <RegisterTreesMap
          mapUri={mapUri}
          location={
            coordinates.length
              ? coordinates[coordinates.length - 1].location
              : ''
          }
          setIsPolygon={setIsPolygon}
          isPolygon={isPolygon}
          toggleIsRegisterTreesMap={toggleIsRegisterTreesMap}
          upDateMarker={upDateMarker}
          coordinates={coordinates}
        />
      ) : (
        <RegisterTreesCaptureImage
          onPressDoneAfterPolygon={onPressDoneAfterPolygon}
          toggleIsRegisterTreesMap={toggleIsRegisterTreesMap}
          isPolygon={isPolygon}
          coordinates={coordinates[coordinates.length - 1]}
          updateImageURI={updateImageURI}
          onPressContinueAfterSeletImage={onPressContinueAfterSeletImage}
        />
      )}
    </View>
  );
};

export default RegisterMultipleTrees;

// coordinates
/*
    coordinates : {
        latitude : "",
         longitude : "",
        location  :"",
        URI : ""

    }
*/

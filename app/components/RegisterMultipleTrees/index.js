import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import RegisterTreesCaptureImage from './CaptureImage';
import RegisterTreesMap from './Map';
import Geolocation from '@react-native-community/geolocation';

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const RegisterMultipleTrees = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [isRegisterTreesMap, setisRegisterTreesMap] = useState(true);
  const [currentLocation, setCurrentLocation] = useState({});
  useEffect(() => {
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
  console.log(coordinates);
  return (
    <View style={{ flex: 1 }}>
      {isRegisterTreesMap ? (
        <RegisterTreesMap
          location={
            coordinates.length
              ? coordinates[coordinates.length - 1].location
              : ''
          }
          toggleIsRegisterTreesMap={toggleIsRegisterTreesMap}
          upDateMarker={upDateMarker}
          coordinates={coordinates}
        />
      ) : (
        <RegisterTreesCaptureImage
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

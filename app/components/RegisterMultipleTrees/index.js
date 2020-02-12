import React, { useState } from 'react';
import { View, Text } from 'react-native';
import RegisterTreesCaptureImage from './CaptureImage';
import RegisterTreesMap from './Map';

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const RegisterMultipleTrees = () => {
  const [location, setLocation] = useState(ALPHABETS[0]);
  const [coordinates, setCoordinates] = useState([
    {
      latitude: 35.746512259918504,
      longitude: 79.453125,
      location: 'A',
      imageURI: ''
    }
  ]);
  const [isRegisterTreesMap, setisRegisterTreesMap] = useState(true);

  // [35.746512259918504, 79.453125, 'A']

  let upDateMarker = (latlong, index) => {
    let marker = coordinates.slice(index, 1);
    marker.latitude = latlong.latitude;
    marker.longitude = latlong.longitude;
    coordinates.splice(index, 1, marker);
    setCoordinates(coordinates);
  };

  let updateImageURI = (uri, index) => {
    let marker = coordinates.slice(index, 1);
    marker.imageURI = uri;
    coordinates.splice(index, 1, marker);
    setCoordinates(coordinates);
  };

  let toggleIsRegisterTreesMap = () => {
    setisRegisterTreesMap(!isRegisterTreesMap);
  };

  let onPressContinueAfterSeletImage = () => {
    console.log('onPressContinueAfterSeletImage');
  };

  return (
    <View style={{ flex: 1 }}>
      {isRegisterTreesMap ? (
        <RegisterTreesMap
          toggleIsRegisterTreesMap={toggleIsRegisterTreesMap}
          upDateMarker={upDateMarker}
          location={location}
          coordinates={coordinates}
        />
      ) : (
        <RegisterTreesCaptureImage
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

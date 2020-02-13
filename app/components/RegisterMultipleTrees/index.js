import React, { useState } from 'react';
import { View, Text } from 'react-native';
import RegisterTreesCaptureImage from './CaptureImage';
import RegisterTreesMap from './Map';

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const RegisterMultipleTrees = () => {
  const [coordinates, setCoordinates] = useState([
    {
      latitude: 35.746512259918504,
      longitude: 79.453125,
      location: 'A',
      imageURI: ''
    }
  ]);
  const [isRegisterTreesMap, setisRegisterTreesMap] = useState(true);

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
    let dummyCoordinates = {
      latitude: 35.746512259918504,
      longitude: 79.453125,
      location: ALPHABETS[coordinates.length],
      imageURI: ''
    };
    coordinates.push(dummyCoordinates);
    setCoordinates(coordinates);
    toggleIsRegisterTreesMap();
  };

  return (
    <View style={{ flex: 1 }}>
      {isRegisterTreesMap ? (
        <RegisterTreesMap
          location={coordinates[coordinates.length - 1].location}
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

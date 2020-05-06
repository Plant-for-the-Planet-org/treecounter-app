import React from 'react';
import { View, Image } from 'react-native';
import {
  treesProfile,
  spruce,
  fields,
  beach,
  forest,
  hills,
  mountains
} from '../assets';

export default function GetRandomImage(props) {
  const [selectedImage, selectImage] = React.useState('');
  const firstAlphabet = (props.name ? props.name.charAt(0) : '');

  React.useEffect(() => {
    if (firstAlphabet >= 'A' && firstAlphabet <= 'D') {
      selectImage(treesProfile);
    } else if (firstAlphabet >= 'E' && firstAlphabet <= 'H') {
      selectImage(spruce);
    } else if (firstAlphabet >= 'I' && firstAlphabet <= 'L') {
      selectImage(fields);
    } else if (firstAlphabet >= 'M' && firstAlphabet <= 'P') {
      selectImage(beach);
    } else if (firstAlphabet >= 'Q' && firstAlphabet <= 'T') {
      selectImage(hills);
    } else if (firstAlphabet >= 'U' && firstAlphabet <= 'W') {
      selectImage(mountains);
    } else {
      selectImage(forest);
    }

    // clean up
  }, []);

  return (
    <View>
      <Image
        source={selectedImage}
        style={{
          width: props.dimension ? props.dimension : 50,
          height: props.dimension ? props.dimension : 50,
          borderRadius: 100
        }}
      />
    </View>
  );
}

import { Text, View, Image, TextInput } from 'react-native';
import React from 'react';
import PrimaryButton from '../../components/Common/Button/PrimaryButton';

export function MapTemplate(locals) {
  return (
    <View
      style={{
        backgroundColor: 'grey',
        height: 200,
        flex: 1,
        justifyContent: 'center',
        padding: 50
      }}
    >
      <PrimaryButton
        onClick={() => {
          locals.onChange(
            'geoLongitude=76.74475009999871&geoLatitude=76.74475009999871&country=IND'
          );
        }}
      >
        "default location"
      </PrimaryButton>
    </View>
  );
}

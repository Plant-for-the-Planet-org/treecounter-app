import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BackHeader = ({ navigation }) => {
  let onPressBack = () => navigation.goBack();
  return (
    <View
      style={{
        height: 56,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
        // borderColor: 'red', borderWidth: 1,
      }}
    >
      <TouchableOpacity onPress={onPressBack}>
        <Icon name={'arrow-back'} size={30} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};
export default BackHeader;

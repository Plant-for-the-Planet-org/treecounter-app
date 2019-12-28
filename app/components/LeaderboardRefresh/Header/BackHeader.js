import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BackHeader = () => {
  return (
    <View
      style={{
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 5,
        backgroundColor: 'white'
      }}
    >
      <View>
        <Icon name={'arrow-back'} size={30} color={'gray'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
export default BackHeader;

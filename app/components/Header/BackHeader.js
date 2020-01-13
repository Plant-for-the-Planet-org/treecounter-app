import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BackHeader = ({ navigation }) => {
  let onPressBack = () => navigation.goBack();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onPressBack}>
        <Icon name={'arrow-back'} size={30} color={'black'} />
      </TouchableOpacity>
    </View>
  );
};
export default BackHeader;

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});

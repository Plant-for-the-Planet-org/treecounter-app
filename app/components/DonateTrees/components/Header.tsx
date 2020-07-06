import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { closeIcon, backArrow } from '../../../assets';

export function Header(props: {
  onBack: () => void;
  navigation: { goBack: () => void };
  title: string;
  useBackIcon: Boolean;
}) {
  let navigateBack = () => {
    if (props.onBack) {
      props.onBack();
    }
    props.navigation.goBack();
    return true;
  };
  return (
    <>
      <View style={styles.headerView}>
        <TouchableOpacity style={styles.closeButton} onPress={navigateBack}>
          <Image
            source={props.useBackIcon ? backArrow : closeIcon}
            resizeMode="contain"
            style={styles.closeButtonImage}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </>
  );
}
const styles = StyleSheet.create({
  headerView: {
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    height: 60,
    zIndex: 100,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  closeButton: { height: 18, zIndex: 1001 },
  closeButtonImage: { height: 18, width: 24 },
  headerTitle: {
    fontFamily: 'OpenSans-ExtraBold',
    fontSize: 27,
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  }
});

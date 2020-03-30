import React from 'react';
import { StyleSheet, View } from 'react-native';
import AnimatedViews from './AnimatedMap';

export default ({
  isFullMapComponentModal,
  toggleIsFullMapComp,
  navigation,
  userContributions,
  singleContributionID,
  isPressFromList,
  isMapPressed,
  onPressMapView
}) => {
  return (
    <View style={styles.container}>
      <AnimatedViews
        onPressMapView={onPressMapView}
        isMapPressed={isMapPressed}
        isPressFromList={isPressFromList}
        singleContributionID={singleContributionID}
        isFullMapComponentModal={isFullMapComponentModal}
        toggleIsFullMapComp={toggleIsFullMapComp}
        navigation={navigation}
        userContributions={userContributions}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

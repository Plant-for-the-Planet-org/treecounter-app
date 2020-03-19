import React from 'react';
import { StyleSheet, View } from 'react-native';
import AnimatedViews from './AnimatedMap';

export default ({
  isFullMapComponentModal,
  toggleIsFullMapComp,
  navigation,
  userContributions,
  singleContributionID
}) => {
  return (
    <View style={styles.container}>
      <AnimatedViews
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

import React from 'react';
import { StyleSheet, View } from 'react-native';
import AnimatedViews from './AnimatedMap';

export default ({
  isFullMapComponentModal,
  toggleIsFullMapComp,
  navigation,
  userContributions,
  singleContributionID,
  isPressFromlist
}) => {
  return (
    <View style={styles.container}>
      <AnimatedViews
        isPressFromlist={isPressFromlist}
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

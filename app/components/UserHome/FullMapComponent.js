import React from 'react';
import { StyleSheet, View } from 'react-native';
import AnimatedViews from './AnimatedMap';

export default ({
  isFullMapComponentModal,
  toggleIsFullMapComp,
  navigation,
  userContributions,
  singleContributionID,
  isPressFromList
}) => {
  return (
    <View style={styles.container}>
      <AnimatedViews
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

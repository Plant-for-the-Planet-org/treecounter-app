import React from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import AnimatedViews from './AnmatedMap';
const { width } = Dimensions.get('window');

const CARD_HEIGHT = 150;

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
  treeCountText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 25,
    lineHeight: 35,
    marginHorizontal: 2,
    color: '#89b53a'
  },
  treeIcon: {
    width: 18,
    height: 20,
    marginHorizontal: 2
  },
  subCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  treeCount: {
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  cardHeaderText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    lineHeight: 24,
    color: '#4d5153'
  },
  subHeaderText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    lineHeight: 24,
    color: '#4d5153'
  },
  cardContainer: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 10,
    flexDirection: 'row'
  },
  downArrowIcon: {
    position: 'absolute',
    top: Platform.OS == 'ios' ? 45 : 20,
    left: 30,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 5
  },
  myLocationIcon: {
    position: 'absolute',
    bottom: 270,
    right: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 50,
    zIndex: 2000,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullScreenExitIcon: {
    position: 'absolute',
    bottom: 200,
    right: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 50,
    zIndex: 2000,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  endPadding: {
    paddingRight: width
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: width * 0.8,
    overflow: 'hidden',
    borderWidth: 0,
    borderColor: 'red'
  },
  cardImage: {
    flex: 3,
    width: '100%',
    height: '100%',
    alignSelf: 'center'
  },
  textContent: {
    flex: 1
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: 'bold'
  },
  cardDescription: {
    fontSize: 12,
    color: '#444'
  },
  markerWrap: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(130,4,150, 0.9)'
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(130,4,150, 0.3)',
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(130,4,150, 0.5)'
  }
});

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  PanResponder
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { LocalTile } from 'react-native-maps';
import { tree_1 } from '../../assets/index';
import { markerImage } from '../../assets/index.js';
import AsyncStorage from '@react-native-community/async-storage';
import AnimatedViews from './AnmatedMao';
const { width } = Dimensions.get('window');

const CARD_HEIGHT = 150;
const CARD_WIDTH = CARD_HEIGHT;

export default class FullMapComponent extends Component {
  constructor() {
    super();
    this.arr = [];
    this.state = {
      markers: [],
      region: null,
      dynamicIndex: 0,
      mapuri: '',
      pan: new Animated.ValueXY()
    };

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      // onPanResponderGrant: (e, gestureState) => {
      //     this.setState({ isAddNewSession: true })
      // },
      onPanResponderMove: Animated.event([
        null,
        {
          //Step 3

          dx: this.state.pan.x,
          dy: this.state.pan.y
        }
      ])
      // onPanResponderRelease: (e, gesture) => {
      //     this.setState({ isAddNewSessionModal: true },

      //     )
      //     Animated.spring(
      //         this.state.pan,
      //         { toValue: { x: 0, y: 0 } }     //To default position you can delete this animated.spring()
      //     ).start();
      //     this.setState({ isAddNewSession: false })
      // },
    });
  }

  componentWillMount() {
    // this.index = 0;
    // this.animation = new Animated.Value(0);
    // AsyncStorage.getItem('@mapuri', uri => {
    //   this.setState({ uri: uri });
    // });
  }
  componentDidMount() {
    this.initiateComponent();
  }

  initiateComponent = () => {
    this.setState(
      {
        markers: this.props.userContributions,
        region: {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.922,
          longitudeDelta: 0.421
        }
      }
      // () => {
      //   setTimeout(() => {
      //   this.map.animateToRegion(
      //     {
      //       ...{
      //         latitude: this.state.markers[0].geoLatitude,
      //         longitude: this.state.markers[0].geoLongitude
      //       },
      //       latitudeDelta: 75,
      //       longitudeDelta: 75
      //     },
      //     350
      //   );
      // }, 2000);

      //   this.animation.addListener(({ value }) => {
      //     console.log('valuevaluevaluevalue', value)
      //     let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      //     if (index >= this.state.markers.length) {
      //       index = this.state.markers.length - 1;
      //     }
      //     if (index <= 0) {
      //       index = 0;
      //     }

      //     clearTimeout(this.regionTimeout);
      //     this.regionTimeout = setTimeout(() => {
      //       if (this.index !== index) {
      //         this.index = index;
      //         const oneContribution = this.state.markers[index];
      //         this.map.animateToRegion(
      //           {
      //             latitude: oneContribution.geoLatitude,
      //             longitude: oneContribution.geoLongitude,
      //             latitudeDelta: 75,
      //             longitudeDelta: 75
      //           },
      //           350
      //         );
      //       }
      //     }, 10);
      //   });
      // }
    );
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
  };

  toNavigateUserContributionDetail = contribution => {
    let { plantProjectName, tpoName, treeSpecies } = contribution;
    this.props.navigation.navigate('contribution_details', {
      contribution,
      titleParam: plantProjectName || tpoName || treeSpecies
    });
  };

  onPressMarker = () => {
    // console.log(this.arr[index], 'this.arr[index]')
    // setTimeout(() => {
    //   this.scrollview_ref.getNode().scrollTo({
    //     x: this.arr[index],
    //     // y: 0,
    //     // animated: false
    //   });
    // }, 1000)
  };

  onLayoutMarker = ({ nativeEvent }, index) => {
    this.arr[index] = nativeEvent.layout.x;
  };

  render() {
    const { isFullMapComponentModal } = this.props;
    console.log(this.props.toggleIsFullMapComp, 'toggleIsFullMapComp Full');

    return (
      <View style={styles.container}>
        {this.state.region ? (
          <AnimatedViews
            isFullMapComponentModal={this.props.isFullMapComponentModal}
            toggleIsFullMapComp={this.props.toggleIsFullMapComp}
            navigation={this.props.navigation}
            userContributions={this.props.userContributions}
          />
        ) : // <MapView
        //   provider={MapView.PROVIDER_GOOGLE}
        //   ref={map => (this.map = map)}
        //   initialRegion={this.state.region}
        //   style={styles.container}
        //   customMapStyle={mapStyle}
        // >
        //   {this.state.markers.length
        //     ? this.state.markers.map((marker, index) => (
        //       <MapView.Marker
        //         onPress={() => this.onPressMarker(index)}
        //         key={index}
        //         coordinate={{
        //           latitude: marker.geoLatitude,
        //           longitude: marker.geoLongitude
        //         }}
        //       >
        //         <Animated.View>
        //           <TouchableOpacity>
        //             <Image
        //               source={markerImage}
        //               style={{
        //                 width: 40,
        //                 height: 40
        //               }}
        //               resizeMode={'contain'}
        //             />
        //           </TouchableOpacity>
        //         </Animated.View>
        //       </MapView.Marker>
        //     ))
        //     : null}
        // </MapView>
        null}
        {/* {
          isFullMapComponentModal ? (
            <Animated.ScrollView
              alwaysBounceVertical
              ref={ref => {
                this.scrollview_ref = ref;
              }}
              horizontal

              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        x: this.animation
                      }
                    }
                  }
                ],
                { useNativeDriver: true }
              )}
              style={styles.scrollView}
              contentContainerStyle={styles.endPadding}
            >
              {this.state.markers.length
                ? this.state.markers.map((marker, index) => (
                  <View
                    onLayout={e => this.onLayoutMarker(e, index)}
                    style={styles.card}
                    key={index}
                  >
                    <View style={styles.textContent}>
                      <ListItem
                        marker={marker}
                        toNavigateUserContributionDetail={
                          this.toNavigateUserContributionDetail
                        }
                      />
                    </View>
                  </View>
                ))
                : null}
            </Animated.ScrollView>
          ) : null
        } */}
      </View>
    );
  }
}

const ListItem = ({ marker, toNavigateUserContributionDetail }) => {
  return (
    <View
      onPress={() => toNavigateUserContributionDetail(marker)}
      style={styles.cardContainer}
    >
      <View style={{ flex: 1 }}>
        <View>
          <Text style={styles.cardHeaderText}>Gift to Sam William</Text>
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={styles.subHeaderText}>
            Planted by Eden Reforestation Projects
          </Text>
        </View>
      </View>
      <View style={styles.treeCont}>
        <View style={styles.subCont}>
          <Text style={styles.treeCountText}>{marker.treeCount}</Text>
          <Image source={tree_1} style={styles.treeIcon} />
        </View>
      </View>
    </View>
  );
};

export { ListItem };

const styles = StyleSheet.create({
  container: {
    flex: 1

    // position: 'absolute',
    // top: 0, left: 0,
    // width: '100%',
    // height: Dimensions.get('window').height
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

export const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f5f5'
      }
    ]
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161'
      }
    ]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f5f5'
      }
    ]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#ffffff'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dadada'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e5e5e5'
      }
    ]
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#eeeeee'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#c9c9c9'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  }
];

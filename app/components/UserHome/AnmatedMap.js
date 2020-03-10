import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';

import MapView, {
  ProviderPropType,
  // Animated as AnimatedMap,
  AnimatedRegion,
  Marker,
  PROVIDER_GOOGLE
} from 'react-native-maps';
import MapvView from 'react-native-maps';
import PanController from './panController';
import UserContributionsDetails from '../UserContributions/ContributionDetails/index.native';
import { deleteContribution } from '../../actions/EditMyTree';
import { loadProject } from '../../actions/loadTposAction';
import { currentUserProfileIdSelector } from '../../selectors/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllPlantProjectsSelector } from '../../selectors';
import { markerImage } from '../../assets/index.js';
import Icon from 'react-native-vector-icons/MaterialIcons';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const ITEM_SPACING = 10;
const ITEM_PREVIEW = 10;
const ITEM_WIDTH = screen.width - 2 * ITEM_SPACING - 2 * ITEM_PREVIEW;
const SNAP_WIDTH = ITEM_WIDTH + ITEM_SPACING;
const ITEM_PREVIEW_HEIGHT = 150;
const SCALE_END = screen.width / ITEM_WIDTH;
const BREAKPOINT1 = 246;
const BREAKPOINT2 = 350;
const ONE = new Animated.Value(1);

function getMarkerState(panX, panY, scrollY, i) {
  const xLeft = -SNAP_WIDTH * i + SNAP_WIDTH / 2;
  const xRight = -SNAP_WIDTH * i - SNAP_WIDTH / 2;
  const xPos = -SNAP_WIDTH * i;

  const isIndex = panX.interpolate({
    inputRange: [xRight - 1, xRight, xLeft, xLeft + 1],
    outputRange: [0, 1, 1, 0],
    extrapolate: 'clamp'
  });

  const isNotIndex = panX.interpolate({
    inputRange: [xRight - 1, xRight, xLeft, xLeft + 1],
    outputRange: [1, 0, 0, 1],
    extrapolate: 'clamp'
  });

  const center = panX.interpolate({
    inputRange: [xPos - 10, xPos, xPos + 10],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp'
  });

  const selected = panX.interpolate({
    inputRange: [xRight, xPos, xLeft],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp'
  });

  const translateY = Animated.multiply(isIndex, panY);

  const translateX = panX;

  const anim = Animated.multiply(
    isIndex,
    scrollY.interpolate({
      inputRange: [0, BREAKPOINT1],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })
  );

  const scale = Animated.add(
    ONE,
    Animated.multiply(
      isIndex,
      scrollY.interpolate({
        inputRange: [BREAKPOINT1, BREAKPOINT2],
        outputRange: [0, SCALE_END - 1],
        extrapolate: 'clamp'
      })
    )
  );

  // [0 => 1]
  let opacity = scrollY.interpolate({
    inputRange: [BREAKPOINT1, BREAKPOINT2],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  // if i === index: [0 => 0]
  // if i !== index: [0 => 1]
  opacity = Animated.multiply(isNotIndex, opacity);

  // if i === index: [1 => 1]
  // if i !== index: [1 => 0]
  opacity = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });

  let markerOpacity = scrollY.interpolate({
    inputRange: [0, BREAKPOINT1],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  markerOpacity = Animated.multiply(isNotIndex, markerOpacity).interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });

  const markerScale = selected.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2]
  });

  return {
    translateY,
    translateX,
    scale,
    opacity,
    anim,
    center,
    selected,
    markerOpacity,
    markerScale
  };
}

class AnimatedViews extends React.Component {
  constructor(props) {
    super(props);

    const panX = new Animated.Value(0);
    const panY = new Animated.Value(0);
    this.animation = new Animated.Value(0);

    const scrollY = panY.interpolate({
      inputRange: [-1, 1],
      outputRange: [1, -1]
    });

    const scrollX = panX.interpolate({
      inputRange: [-1, 1],
      outputRange: [1, -1]
    });

    const scale = scrollY.interpolate({
      inputRange: [0, BREAKPOINT1],
      outputRange: [1, 1.6],
      extrapolate: 'clamp'
    });

    const translateY = scrollY.interpolate({
      inputRange: [0, BREAKPOINT1],
      outputRange: [0, -100],
      extrapolate: 'clamp'
    });

    this.state = {
      panX,
      panY,
      index: 0,
      canMoveHorizontal: true,
      scrollY,
      scrollX,
      scale,
      translateY,
      markers: null,
      region: {
        latitude: 45.5230786,
        longitude: -122.6701034,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
    };
  }

  onMapReady = () => {
    console.log(this.props.userContributions);
    const { panX, panY, scrollY } = this.state;
    let markers = this.props.userContributions;
    const animations = markers.map((m, i) =>
      getMarkerState(panX, panY, scrollY, i)
    );

    this.setState(
      {
        animations,
        markers,
        region: {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.922,
          longitudeDelta: 0.421
        }
      },
      () => {
        setTimeout(() => {
          try {
            this.mapView.fitToSuppliedMarkers(markers.map(x => String(x.id)));
          } catch (e) {}
          // this.mapView.animateToRegion(
          //     {
          //         latitude: markers[0].geoLatitude,
          //         longitude: markers[0].geoLongitude,
          //         latitudeDelta: 0.922,
          //         longitudeDelta: 0.421
          //     },
          //     350
          // );
        }, 3000);
      }
    );
  };

  componentDidMount() {
    console.log(this.props.isFullMapComponentModal, 'componentDidMount');
    // console.log(this.props.userContributions, 'userContributions')
    // const { region, panX, panY, scrollX, markers } = this.state;
    // panX.addListener(this.onPanXChange);
    // panY.addListener(this.onPanYChange);
    // region.stopAnimation();
    // region
    //     .timing({
    //         latitude: scrollX.interpolate({
    //             inputRange: markers.map((m, i) => i * SNAP_WIDTH),
    //             outputRange: markers.map(m => m.coordinate.latitude),
    //         }),
    //         longitude: scrollX.interpolate({
    //             inputRange: markers.map((m, i) => i * SNAP_WIDTH),
    //             outputRange: markers.map(m => m.coordinate.longitude),
    //         }),
    //         duration: 0,
    //     })
    //     .start();
  }

  onStartShouldSetPanResponder = e => {
    // we only want to move the view if they are starting the gesture on top
    // of the view, so this calculates that and returns true if so. If we return
    // false, the gesture should get passed to the map view appropriately.
    const { panY } = this.state;
    const { pageY } = e.nativeEvent;
    const topOfMainWindow = ITEM_PREVIEW_HEIGHT + panY.__getValue();
    const topOfTap = screen.height - pageY;
    console.log(topOfTap < topOfMainWindow);
    return true;
  };

  onMoveShouldSetPanResponder = e => {
    const { panY } = this.state;
    const { pageY } = e.nativeEvent;
    const topOfMainWindow = ITEM_PREVIEW_HEIGHT + panY.__getValue();
    const topOfTap = screen.height - pageY;

    return true;
  };

  onPanXChange = ({ value }) => {
    const { index } = this.state;
    const newIndex = Math.floor((-1 * value + SNAP_WIDTH / 2) / SNAP_WIDTH);
    if (index !== newIndex) {
      this.setState({ index: newIndex });
    }
  };

  onPanYChange = ({ value }) => {
    // const {
    //     canMoveHorizontal,
    //     region,
    //     scrollY,
    //     scrollX,
    //     markers,
    //     index,
    // } = this.state;
    // const shouldBeMovable = Math.abs(value) < 2;
    // if (shouldBeMovable !== canMoveHorizontal) {
    //     this.setState({ canMoveHorizontal: shouldBeMovable });
    //     if (!shouldBeMovable) {
    //         const { coordinate } = markers[index];
    //         region.stopAnimation();
    //         region
    //             .timing({
    //                 latitude: scrollY.interpolate({
    //                     inputRange: [0, BREAKPOINT1],
    //                     outputRange: [
    //                         coordinate.latitude,
    //                         coordinate.latitude - LATITUDE_DELTA * 0.5 * 0.375,
    //                     ],
    //                     extrapolate: 'clamp',
    //                 }),
    //                 latitudeDelta: scrollY.interpolate({
    //                     inputRange: [0, BREAKPOINT1],
    //                     outputRange: [LATITUDE_DELTA, LATITUDE_DELTA * 0.5],
    //                     extrapolate: 'clamp',
    //                 }),
    //                 longitudeDelta: scrollY.interpolate({
    //                     inputRange: [0, BREAKPOINT1],
    //                     outputRange: [LONGITUDE_DELTA, LONGITUDE_DELTA * 0.5],
    //                     extrapolate: 'clamp',
    //                 }),
    //                 duration: 0,
    //             })
    //             .start();
    //     } else {
    // region.stopAnimation();
    // region
    //     .timing({
    //         latitude: scrollX.interpolate({
    //             inputRange: markers.map((m, i) => i * SNAP_WIDTH),
    //             outputRange: markers.map(m => m.coordinate.latitude),
    //         }),
    //         longitude: scrollX.interpolate({
    //             inputRange: markers.map((m, i) => i * SNAP_WIDTH),
    //             outputRange: markers.map(m => m.coordinate.longitude),
    //         }),
    //         duration: 0,
    //     })
    //     .start();
    // }
    // }
  };

  onRegionChange(/* region */) {
    // this.state.region.setValue(region);
  }

  _getValue = (x, spacing) => {
    // let index = Math.floor(value / 150 + 0.3);
    const plus = x % spacing < spacing / 2 ? 0 : spacing;
    let index = Math.round(x / spacing) * spacing + plus;
    index = Math.abs(index);
    index = Math.floor(index / ITEM_WIDTH + 0.3);
    if (index >= this.state.markers.length) {
      index = this.state.markers.length - 1;
    }
    if (index <= 0) {
      index = 0;
    }

    clearTimeout(this.regionTimeout);
    this.regionTimeout = setTimeout(() => {
      if (this.index !== index) {
        this.index = index;
        const oneContribution = this.state.markers[index];
        console.log(oneContribution);
        try {
          this.mapView.animateToRegion(
            {
              latitude: oneContribution.geoLatitude,
              longitude: oneContribution.geoLongitude,
              latitudeDelta: 0.00095,
              longitudeDelta: 0.0095
            },
            350
          );
        } catch (e) {}
      }
    }, 10);
  };
  initiateComponent = () => {
    try {
      this.mapView.animateToRegion(
        {
          latitude: this.state.markers[0].geoLatitude,
          longitude: this.state.markers[0].geoLongitude,
          latitudeDelta: 0.00095,
          longitudeDelta: 0.0095
        },
        350
      );
    } catch (e) {}
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.isFullMapComponentModal) {
      try {
        this.mapView.animateToRegion(
          {
            latitude: this.state.markers[0].geoLatitude,
            longitude: this.state.markers[0].geoLongitude,
            latitudeDelta: 0.00095,
            longitudeDelta: 0.0095
          },
          350
        );
      } catch (e) {}
    }
  }

  render() {
    const {
      panX,
      panY,
      animations,
      canMoveHorizontal,
      markers,
      region
    } = this.state;
    console.log(this.mapView, 'this.props.isFullMapComponentModal');

    return (
      <View style={styles.container}>
        <MapView
          onMapReady={this.onMapReady}
          ref={map => (this.mapView = map)}
          customMapStyle={mapStyle}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={region}
        >
          {markers
            ? markers.map((marker, i) => (
                <Marker
                  identifier={String(marker.id)}
                  key={marker.id}
                  coordinate={{
                    latitude: marker.geoLatitude,
                    longitude: marker.geoLongitude
                  }}
                >
                  <Image
                    source={markerImage}
                    style={{
                      width: 40,
                      height: 40
                    }}
                    resizeMode={'contain'}
                  />
                </Marker>
              ))
            : null}
        </MapView>
        {this.props.isFullMapComponentModal ? (
          <PanController
            _getValue={this._getValue}
            style={{
              flex: 0.5
            }}
            vertical
            horizontal={canMoveHorizontal}
            xMode="snap"
            snapSpacingX={SNAP_WIDTH}
            yBounds={[-1 * screen.height, 0]}
            xBounds={[-screen.width * (markers.length - 1), 0]}
            panY={panY}
            panX={panX}
            onStartShouldSetPanResponder={() => true}
            onMoveShouldSetPanResponder={() => true}
          >
            <View style={styles.itemContainer}>
              {markers
                ? markers.map((marker, i) => (
                    <Animated.View
                      key={marker.id}
                      style={[
                        styles.item,
                        {
                          transform: [
                            { translateY: animations[i].translateY },
                            { translateX: animations[i].translateX },
                            { scale: animations[i].scale }
                          ]
                        }
                      ]}
                    >
                      <UserContributionsDetails
                        isFromUserProfile={true}
                        userProfileId={this.props.userProfileId}
                        navigation={this.props.navigation}
                        contribution={marker}
                        plantProjects={this.props.plantProjects}
                        deleteContribution={this.props.deleteContribution}
                      />
                    </Animated.View>
                  ))
                : null}
            </View>
          </PanController>
        ) : null}
        {this.props.isFullMapComponentModal ? (
          <>
            <TouchableOpacity
              style={styles.downArrowIcon}
              onPress={this.props.toggleIsFullMapComp}
            >
              <Icon name={'keyboard-arrow-down'} size={25} color={'#000'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.props.toggleIsFullMapComp}
              style={styles.fullScreenExitIcon}
            >
              <Icon name={'fullscreen-exit'} size={30} color={'#4C5153'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.initiateComponent}
              style={styles.myLocationIcon}
            >
              <Icon name={'my-location'} size={30} color={'#4C5153'} />
            </TouchableOpacity>
          </>
        ) : null}
      </View>
    );
  }
}

AnimatedViews.propTypes = {
  provider: ProviderPropType
};

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1
  },
  itemContainer: {
    // height: 250,
    // borderColor: 'green',
    // borderWidth: 3,
    backgroundColor: '#F0F0F0',
    flexDirection: 'row',
    paddingHorizontal: ITEM_SPACING / 2 + ITEM_PREVIEW
    // position: 'absolute',
    // top: screen.height - ITEM_PREVIEW_HEIGHT - 64,
    // paddingTop: screen.height - ITEM_PREVIEW_HEIGHT - 64,
    // paddingTop: !ANDROID ? 0 : screen.height - ITEM_PREVIEW_HEIGHT - 64,
  },
  map: {
    backgroundColor: 'transparent',
    flex: 1
    // ...StyleSheet.absoluteFillObject,
  },
  item: {
    width: ITEM_WIDTH,
    height: screen.height + 2 * ITEM_PREVIEW_HEIGHT,
    backgroundColor: 'white',
    marginHorizontal: ITEM_SPACING / 2,
    overflow: 'hidden',
    borderRadius: 5,
    borderColor: '#000',
    zIndex: 4000,
    marginTop: -5
    // borderColor: 'gray',
    // borderWidth: 1,
    // elevation: 4
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
    // zIndex: 2000,
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
    // zIndex: 2000,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    userProfileId: currentUserProfileIdSelector(state),
    plantProjects: getAllPlantProjectsSelector(state)
    // entities: plantProjectsSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteContribution,
      loadProject
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(AnimatedViews);

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

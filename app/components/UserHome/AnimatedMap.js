import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  LayoutAnimation
} from 'react-native';
import MapView, {
  ProviderPropType,
  Marker,
  PROVIDER_GOOGLE
} from 'react-native-maps';
import UserContributionsDetails from '../UserContributions/ContributionDetails/index.native';
import { deleteContribution } from '../../actions/EditMyTree';
import { loadProject } from '../../actions/loadTposAction';
import { currentUserProfileIdSelector } from '../../selectors/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllPlantProjectsSelector } from '../../selectors';
import { multiple_trees, tree_1, markerImage } from '../../assets/index.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ContributionCard from '../UserContributions/ContributionCard.native'
import Swiper from '../../components/ReactNativeSwiper';
import Geolocation from '@react-native-community/geolocation';

const screen = Dimensions.get('window');
const { height: HEIGHT, } = screen;
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const CARD_HEIGHT = 100;


class AnimatedViews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      mapIndex: 3,
      markersList: [],
      isSatellite: false,
      index: 0,
      canMoveHorizontal: true,
      markers: null,
      region: {
        latitude: 45.5230786,
        longitude: -122.6701034,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      singleContributionID: props.singleContributionID
    };
  }

  setMapPadding = () => {
    return {
      top: 0,
      right: 0,
      bottom: this.props.isFullMapComponentModal ? this.state.singleContributionID ? 160 : 30 : 0,
      left: 0
    };
  };

  onMapReady = () => {
    let markers = this.props.userContributions;

    this.setState(
      {
        markers,
        region: {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.00095,
          longitudeDelta: 0.0095
        }
      },
      () => {
        setTimeout(() => {
          try {
            this.mapView.fitToSuppliedMarkers(markers.map(x => String(x.id)));
          } catch (e) {
            // Do thing
          }
        }, 3000);
      }
    );
  };

  initiateComponent = () => {
    try {
      setTimeout(() => {
        this.mapView.animateToRegion(
          {
            latitude: this.state.markers[0].geoLatitude,
            longitude: this.state.markers[0].geoLongitude,
            latitudeDelta: 0.00095,
            longitudeDelta: 0.0095
          },
          350
        );
      }, 200)
    } catch (e) {
      // Do thing
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.singleContributionID == null) {
      if (nextProps.singleContributionID !== this.state.singleContributionID) {
        this.setState(
          { singleContributionID: nextProps.singleContributionID },
          () => {
            try {
              if (nextProps.singleContributionID) {
                let activeMarker = this.state.markers.find(
                  x => x.id == nextProps.singleContributionID
                );
                this.mapView.animateToRegion(
                  {
                    latitude: activeMarker.geoLatitude,
                    longitude: activeMarker.geoLongitude,
                    latitudeDelta: 0.00095,
                    longitudeDelta: 0.0095
                  },
                  350
                );
              }
            } catch (e) {
              // Do thing
            }
          }
        );
      }
    }

    if (nextProps.isFullMapComponentModal) {
      try {
        this.initiateComponent();
      } catch (e) {
        // Do thing
      }
    }
  }

  onPressHeader = id => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (this.props.isPressFromList) {
      this.setState({ singleContributionID: undefined });
      this.props.toggleIsFullMapComp(true);
      setTimeout(() => {
        try {
          this.mapView.fitToSuppliedMarkers(
            this.state.markers.map(x => String(x.id))
          );
        } catch (e) {
          // Do thing
        }
      }, 3000);
    }
    if (id) {
      this.setState({ singleContributionID: id });
    } else {
      if (this.state.singleContributionID) {
        this.setState({ singleContributionID: undefined });
      } else {
        this.props.toggleIsFullMapComp(true);
        setTimeout(() => {
          try {
            this.mapView.fitToSuppliedMarkers(
              this.state.markers.map(x => String(x.id))
            );
          } catch (e) {
            // Do thing
          }
        }, 3000);
      }
    }
  };

  onPressCurrentLocation = () => {
    // Geolocation.getCurrentPosition(info => {
    //   alert(JSON.stringify(info))
    // });
    this.setState({ height: true })
  }

  onPressMarker = (marker) => {
    this.onPressHeader(marker.id)
    const oneContribution = marker;
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
    } catch (e) {
      // Do thing
    }
  }

  getTreeImage = (treeCount) => {
    return treeCount > 1 ? <Image resizeMode={'contain'} source={multiple_trees} style={styles.multipleTrees} /> : <Image resizeMode={'contain'} source={tree_1} style={styles.treeImage} />;
  }

  onChageIndex = (index) => {
    this.setState({ activeIndex: index }, () => {
      this.toAnimateRegion()
    })
  }

  toAnimateRegion = () => {
    const oneContribution = this.state.markers[this.state.activeIndex];
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
    } catch (e) {
      // Do thing
    }
  }

  onPressNextPrevBtn = (btn) => {
    if (btn == 'back') {
      if (this.state.activeIndex !== 0) {
        this.setState({ activeIndex: this.state.activeIndex - 1 }, () => {
          this.toAnimateRegion()
        })
      }
    }
    if (btn == 'next') {
      this.setState({ activeIndex: this.state.activeIndex + 1 }, () => {
        this.toAnimateRegion()
      })
    }
  }
  render() {
    const {
      markers,
      region,
      singleContributionID
    } = this.state;
    let activeMarker =
      this.state.markers !== null
        ? this.state.markers.find(x => x.id == this.state.singleContributionID)
        : null;
    let isContribution = this.props.userContributions ? this.props.userContributions.lenght !== 0 ? true : false : false
    let isStaticMap = singleContributionID ? false : isContribution
    return (
      <View style={styles.container}>
        <MapView
          rotateEnabled={isStaticMap}
          scrollEnabled={isStaticMap}
          pitchEnabled={isStaticMap}
          zoomEnabled={isStaticMap}
          mapType={this.state.isSatellite ? 'satellite' : 'standard'}
          mapPadding={this.setMapPadding()}
          onMapReady={this.onMapReady}
          ref={map => (this.mapView = map)}
          customMapStyle={mapStyle}
          provider={PROVIDER_GOOGLE}
          style={[styles.map, { flex: this.state.singleContributionID ? 0.5 : 1, }]}
          initialRegion={region}
        >
          {markers
            ? markers.map(marker => (
              <Marker
                onPress={() => this.onPressMarker(marker)}
                identifier={String(marker.id)}
                key={marker.id}
                coordinate={{
                  latitude: marker.geoLatitude,
                  longitude: marker.geoLongitude
                }}
              >
                {this.getTreeImage(marker.treeCount)}
              </Marker>
            ))
            : null}
        </MapView>
        <View>
          {this.props.isFullMapComponentModal && !this.state.singleContributionID ? (
            <View style={styles.swiperCont}>
              <Swiper
                key={this.state.activeIndex}
                index={this.state.activeIndex}
                showsPagination={false}
                bounces
                onIndexChanged={this.onChageIndex}
              >
                {markers
                  ? markers.map((marker, i) => {
                    return (
                      <View style={styles.card} key={i}>
                        <ContributionCard
                          onPressSingleContribution={this.onPressMarker}
                          isFromAnimatredCardList
                          contribution={marker}
                        />
                      </View>
                    )
                  }) : null}

              </Swiper>
              <View style={styles.bottomArrowsCont}>
                <View style={{ flex: 1 }} />
                <View style={{ flexDirection: 'row', }}>
                  <TouchableOpacity onPress={() => this.onPressNextPrevBtn('back')}><Icon name={'arrow-back'} size={30} color={'#4d5153'} style={{ marginRight: 28 }} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => this.onPressNextPrevBtn('next')}><Icon name={'arrow-forward'} size={30} color={'#4d5153'} style={{}} /></TouchableOpacity>
                </View>
              </View>
            </View>) : null}

        </View>
        <SafeAreaView />
        {this.props.isFullMapComponentModal ? (
          <>
            <TouchableOpacity
              style={styles.downArrowIcon}
              onPress={() => this.onPressHeader()}
            >
              <Icon name={this.state.singleContributionID ? 'keyboard-arrow-left' : 'keyboard-arrow-down'} size={25} color={'#000'} />
            </TouchableOpacity>
            {!this.state.singleContributionID ? <><TouchableOpacity
              onPress={() => this.onPressHeader()}
              style={styles.fullScreenExitIcon}
            >
              <Icon name={'fullscreen-exit'} size={30} color={'#4C5153'} />
            </TouchableOpacity>
              <TouchableOpacity
                onPress={this.onPressCurrentLocation}
                style={styles.myLocationIcon}
              >
                <Icon name={'my-location'} size={30} color={'#4C5153'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { this.setState({ isSatellite: !this.state.isSatellite }) }}
                style={styles.satellite}
              >
                <Icon name={'satellite'} size={30} color={'#4C5153'} />
              </TouchableOpacity>

            </> : null}
          </>
        ) : null}




        {activeMarker ? (
          <View
            style={[styles.userContributionsDetailsFullViewCont, { height: activeMarker ? HEIGHT * 0.7 : 0 }]}
          >
            {this.state.markers ? (
              <UserContributionsDetails
                isFromUserProfile
                userProfileId={this.props.userProfileId}
                navigation={this.props.navigation}
                contribution={activeMarker}
                plantProjects={this.props.plantProjects}
                deleteContribution={this.props.deleteContribution}
              />
            ) : null}
          </View>
        ) : null}
      </View>
    );
  }
}

AnimatedViews.propTypes = {
  provider: ProviderPropType
};

const styles = StyleSheet.create({
  bottomArrowsCont: {
    flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white',
    marginRight: 20
  },
  swiperCont: {
    width: '100%',
    height: 130,
    bottom: 30,
    backgroundColor: 'transparent',
  },
  multipleTrees: {
    height: 40, width: 30,
    // borderColor: 'red', borderWidth: 1,

  },
  treeImage: {
    height: 40,
    // borderColor: 'green', borderWidth: 1,
  },
  userContributionsDetailsFullViewCont: {
    backgroundColor: 'transparent',
    width: '100%',
    height: HEIGHT * 0.7,
    position: 'absolute',
    bottom: 0,
  },
  treeCount: {
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  map: {
    backgroundColor: 'transparent',
    flex: 1,
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
    bottom: 240,
    right: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullScreenExitIcon: {
    position: 'absolute',
    bottom: 170,
    right: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  satellite: {
    position: 'absolute',
    bottom: 310,
    right: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    overflow: 'hidden',

    width: '100%'
  },
  textContent: {
    flex: 1
  }
});

const mapStateToProps = state => {
  return {
    userProfileId: currentUserProfileIdSelector(state),
    plantProjects: getAllPlantProjectsSelector(state)
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

import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import { Dimensions, Image, Platform, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import MapView, { Marker, ProviderPropType, PROVIDER_GOOGLE } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteContribution } from '../../actions/EditMyTree';
import { loadProject } from '../../actions/loadTposAction';
import { multiple_trees } from '../../assets/index.js';
import { getAllPlantProjectsSelector } from '../../selectors';
import { currentUserProfileIdSelector } from '../../selectors/index';
import styles from '../../styles/UserHome/animated_map';
import ContributionCard from '../UserContributions/ContributionCard.native';
import UserContributionsDetails from '../UserContributions/ContributionDetails/index.native';
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class AnimatedViews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDetailShow: false,
      activeIndex: 0,
      markersList: [],
      isSatellite: false,
      markers: null,
      region: {
        latitude: 45.5230786,
        longitude: -122.6701034,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      singleContributionID: props.singleContributionID,
    };
    this.isPressNextOrBack = true;
  }

  setMapPadding = () => {
    const { isMapPressed } = this.props;
    return {
      top: 0,
      right: 0,
      bottom: this.props.isFullMapComponentModal ? this.state.isDetailShow ? 0 : isMapPressed ? 30 : 30 : 0,
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
        }, 20);
      }
    );
  };

  initiateComponent = () => {
    try {
      setTimeout(() => {
        this.setState({
          activeIndex: 0,
          lastActiveIndex: 0,
        })
        this.carousel.snapToItem(0)
        this.mapView.animateToRegion(
          {
            latitude: this.state.markers[0].geoLatitude,
            longitude: this.state.markers[0].geoLongitude,
            latitudeDelta: 0.00095,
            longitudeDelta: 0.0095
          },
          500
        );
      }, 200)
    } catch (e) {
      // Do thing
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.userContributions.length !== this.state.markers.length || JSON.stringify(nextProps.userContributions) !== JSON.stringify(this.state.markers)) {
      this.isFirstTime = true;
      this.setState({ markers: nextProps.userContributions })
    }

    if (this.state.singleContributionID == null) {
      if (nextProps.singleContributionID !== this.state.singleContributionID) {
        this.setState(
          { singleContributionID: nextProps.singleContributionID },
          () => {
            try {
              if (nextProps.singleContributionID) {
                let activeIndex = this.state.markers.findIndex(
                  x => x.id == nextProps.singleContributionID
                );
                let activeMarker = this.state.markers[activeIndex];
                this.tempDetailsIndex = activeIndex + 1;
                this.setState({ isDetailShow: true, activeIndex: activeIndex, isSatellite: true }, () => {
                  this.carouselDetail.snapToItem(this.tempDetailsIndex)
                  this.carousel.snapToItem(activeIndex)
                })
                this.mapView.animateToRegion(
                  {
                    latitude: activeMarker.geoLatitude,
                    longitude: activeMarker.geoLongitude,
                    latitudeDelta: 0.00095,
                    longitudeDelta: 0.0095
                  },
                  500
                );
              }
            } catch (e) {
              // Do thing
            }
          }
        );
      }
    }
    if (this.state.singleContributionID) {
      // DO nothing
    } else {
      if (nextProps.isFullMapComponentModal == true && this.props.isFullMapComponentModal == false && !nextProps.isPressFromList) {
        try {
          this.initiateComponent();
        } catch (e) {
          // Do thing
        }
      }
    }
  }

  onPressHeader = id => {

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
      }, 30);
    }
    if (id) {
      this.setState({ singleContributionID: id });
    } else {
      if (this.state.singleContributionID) {
        this.setState({ singleContributionID: undefined, isDetailShow: false, isSatellite: !this.state.isSatellite });
      } else {
        this.carouselDetail.snapToItem(0);
        this.props.toggleIsFullMapComp(true);
        setTimeout(() => {
          try {
            this.mapView.fitToSuppliedMarkers(
              this.state.markers.map(x => String(x.id))
            );
          } catch (e) {
            // Do thing
          }
        }, 30);
      }
    }
  };

  onPressCurrentLocation = () => {
    Geolocation.getCurrentPosition(info => {
      try {
        setTimeout(() => {
          this.mapView.animateToRegion(
            {
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
              latitudeDelta: 0.00095,
              longitudeDelta: 0.0095
            },
            500
          );
        }, 200)
      } catch (e) {
        // Do thing
      }

    });


  }

  onPressMarker = async (marker, e) => {
    if (!this.props.isFullMapComponentModal) {
      return;
    }
    let isCoordinatesMatch = this.state.markers[this.state.activeIndex].geoLatitude == marker.geoLatitude && this.state.markers[this.state.activeIndex].geoLongitude == marker.geoLongitude;

    const pressMarker = (activeIndex) => {
      if (activeIndex > -1) {
        // Do nothing
      } else {
        activeIndex = this.state.markers.findIndex(x => x.id == marker.id)
      }
      let activeIndexInTempMarkers = this.tempMarkers.findIndex(x => x.id == marker.id)
      this.tempDetailsIndex = activeIndexInTempMarkers;

      if (activeIndex !== this.state.activeIndex) {
        this.setState({ activeIndex: activeIndex })
        this.carousel.snapToItem(activeIndex)
        this.carouselDetail.snapToItem(activeIndex)
      }

      let action = e.nativeEvent.action;

      if (this.props.isFullMapComponentModal && this.state.singleContributionID == null && action == 'marker-press') {
        this.setState({ isDetailShow: true, isSatellite: true }, () => {
          if (activeIndex == 0) {
            this.tempDetailsIndex = 1
            setTimeout(() => {
              this.carouselDetail.snapToItem(this.tempDetailsIndex, false)
            }, 500)
          } else {
            this.tempDetailsIndex = activeIndexInTempMarkers
            this.carouselDetail.snapToItem(this.tempDetailsIndex, activeIndex == 0 ? false : true)
          }
        })
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
            500
          );
        } catch (e) {
          // Do thing
        }
      }
    }

    if (this.state.isDetailShow) {
      if (!isCoordinatesMatch) {
        // use activeIndex
        pressMarker()
      }
    } else {
      if (isCoordinatesMatch) {
        // use activeIndex
        pressMarker(this.state.activeIndex)

      } else {
        // use param marker
        pressMarker()
      }
    }


  }

  getTreeImage = (treeCount) => {
    return treeCount > 1 ? <Image resizeMode={'contain'} source={multiple_trees} style={styles.multipleTrees} /> : <MIcon size={30} color={'#95c243'} name={'tree'} />;
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
        800
      );
    } catch (e) {
      // Do thing
    }
  }

  onPressNextPrevBtn = async (btn, action) => {
    const { markers, activeIndex } = this.state;
    if (this.isPressNextOrBack) {
      this.isPressNextOrBack = false;
      if (action == 'set-id') {
        if (btn == 'back' && this.tempDetailsIndex > 1) {
          this.carouselDetail.snapToPrev()
          this.tempDetailsIndex = this.tempDetailsIndex - 1
        } else if (btn == 'next' && this.tempDetailsIndex < this.tempMarkers.length) {
          this.carouselDetail.snapToNext()
          this.tempDetailsIndex = this.tempDetailsIndex + 1
        }
      }
      if (btn == 'back') {
        if (activeIndex !== 0) {
          await this.carousel ? this.carousel.snapToPrev() : null;
        }
      }
      if (btn == 'next') {
        if (activeIndex + 1 !== markers.length) {
          this.carousel ? this.carousel.snapToNext() : null;
        }
      }
      this.isPressNextOrBack = true;

    }
  }

  onPressMapView = (e) => {
    if (this.state.singleContributionID) {
      // Do Nothing
    } else {
      if (e.nativeEvent.action !== 'marker-press') {
        this.props.onPressMapView()
      }
    }
  }

  afterDeleteContribution = () => {
    setTimeout(() => {
      const oneContribution = this.state.markers[this.state.activeIndex + 1];
      try {
        this.mapView.animateToRegion(
          {
            latitude: oneContribution.geoLatitude,
            longitude: oneContribution.geoLongitude,
            latitudeDelta: 0.00095,
            longitudeDelta: 0.0095
          },
          800
        );
      } catch (e) {
        // Do thing
      }
    }, 3500)
  }

  isFirstTime = true;
  tempMarkers = [];
  tempDetailsIndex = 1;

  render() {
    const {
      markers,
      region,
      singleContributionID,
      activeIndex,
      isDetailShow
    } = this.state;
    const { isMapPressed, isFullMapComponentModal } = this.props;
    let isContribution = this.props.userContributions ? this.props.userContributions.length !== 0 ? true : false : false
    let isStaticMap = singleContributionID ? false : isContribution;

    if (this.isFirstTime && markers && markers.length > 0) {
      this.tempMarkers = markers.slice(0);
      this.tempMarkers.unshift(markers[0])
      this.isFirstTime = false;
    }
    return (
      <View style={styles.container}>
        <MapView
          onPress={this.onPressMapView}
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
          style={[styles.map, { flex: isDetailShow ? 0.4 : 1, }]}
          initialRegion={region}
        >
          {markers
            ? markers.map((marker) => (
              <Marker
                // tracksViewChanges={false}
                onPress={({ nativeEvent }) => this.onPressMarker(marker, { nativeEvent })}
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
        <Animatable.View
          initialNumToRender={markers ? markers.length : undefined}
          animation={isMapPressed ? 'fadeOutDown' : 'fadeInUp'}
          style={[styles.swiperCont, { left: this.props.isFullMapComponentModal ? 0 : -1000, bottom: !isDetailShow ? (Platform.OS == 'ios' ? 0 : 25) : -2000 }]}>
          <Carousel
            // style={[isMapPressed ? styles.swiperCont : { bottom: (Platform.OS == 'ios' ? 0 : 25) }]}>
            firstItem={this.state.activeIndex}
            initialNumToRender={markers ? markers.length : undefined}
            scrollEnabled={false}
            onSnapToItem={(index) => {
              this.tempDetailsIndex = index + 1;
              this.setState({ activeIndex: index, }, async () => {
                await this.toAnimateRegion()
              })
            }}
            ref={(c) => { this.carousel = c; }}
            data={markers}
            renderItem={({ item, index }) => (!isDetailShow && isFullMapComponentModal ?
              index >= activeIndex - 1 && index <= activeIndex + 1 ?
                <ContributionCard
                  onPressSingleContribution={() => this.onPressMarker(markers[activeIndex], { nativeEvent: { action: 'marker-press' } })}
                  isFromAnimatredCardList
                  contribution={item}
                /> : null : null)}
            sliderWidth={screen.width}
            itemWidth={screen.width}
          />
          {isFullMapComponentModal && !isDetailShow ? <View style={styles.bottomArrowsCont}>
            <View style={{ flex: 1 }} />
            <View style={{ flexDirection: 'row', }}>
              <TouchableOpacity disabled={this.tempDetailsIndex == 1} onPress={() => this.onPressNextPrevBtn('back')}><Icon name={'arrow-back'} size={30} color={'#4d5153'} style={{ marginRight: 28 }} /></TouchableOpacity>
              <TouchableOpacity disabled={this.tempDetailsIndex == this.tempMarkers.length - 1} onPress={() => this.onPressNextPrevBtn('next')}><Icon name={'arrow-forward'} size={30} color={'#4d5153'} /></TouchableOpacity>
            </View>
          </View> : null}
        </Animatable.View>
        {this.props.isFullMapComponentModal ? (!isMapPressed) && <SafeAreaView forceInset={{ bottom: 'always' }} /> : null}
        {this.props.isFullMapComponentModal ? (
          <>
            <TouchableOpacity
              style={styles.downArrowIcon}
              onPress={() => this.onPressHeader()}
            >
              <Icon name={this.state.isDetailShow ? 'keyboard-arrow-left' : 'keyboard-arrow-down'} size={25} color={'#000'} />
            </TouchableOpacity>

            {!isDetailShow ? <TouchableOpacity
              onPress={() => this.onPressHeader()}
              style={[styles.fullScreenExitIcon, isDetailShow ? ({ bottom: '70%', }) : ({})]}
            >
              <Icon name={'fullscreen-exit'} size={30} color={'#4C5153'} />
            </TouchableOpacity> : null}
            <TouchableOpacity
              onPress={() => { this.setState({ isSatellite: !this.state.isSatellite }) }}
              style={[styles.myLocationIcon, isDetailShow ? ({ top: Platform.OS == 'ios' ? 45 : 20, right: 30, bottom: undefined }) : {}]}
            >
              <Icon name={'satellite'} size={30} color={'#4C5153'} />
            </TouchableOpacity>
          </>
        ) : null
        }
        {markers && markers.length > 0 ? (
          <View style={[styles.userContributionsDetailsFullViewCont, { left: isDetailShow ? 0 : -1000 }]}>
            <Carousel
              initialNumToRender={this.tempMarkers ? this.tempMarkers.length : undefined}
              scrollEnabled={false}
              onSnapToItem={(index) => {
                this.tempDetailsIndex = index;

              }}
              ref={(c) => { this.carouselDetail = c; }}
              data={this.tempMarkers}
              renderItem={({ item, index }) => {
                let prevIndex = this.tempDetailsIndex - 1;
                let nxtIndex = this.tempDetailsIndex + 1;
                return (
                  isDetailShow ? index >= prevIndex && index <= nxtIndex ?
                    <UserContributionsDetails
                      afterDeleteContribution={this.afterDeleteContribution}
                      isDetailShow={isDetailShow}
                      key={item.id}
                      isFromUserProfile
                      userProfileId={this.props.userProfileId}
                      navigation={this.props.navigation}
                      contribution={item}
                      plantProjects={this.props.plantProjects}
                      deleteContribution={this.props.deleteContribution}
                    /> : null : null)
              }}
              sliderWidth={screen.width}
              itemWidth={screen.width}
            />
          </View>) : null}
        {this.state.isDetailShow ?
          <SafeAreaView forceInset={{ flex: 1, bottom: 'always' }} style={{ position: 'absolute', bottom: (Platform.OS == 'ios' ? 0 : 25), right: 0, width: '100%', backgroundColor: '#fff', }}>
            <View style={{ flex: 1 }} />
            <View>
              <View style={styles.bottomArrowsCont}>
                <View style={{ flex: 1 }} />
                <View style={{ flexDirection: 'row', }}>
                  <TouchableOpacity disabled={this.tempDetailsIndex == 1} onPress={() => this.onPressNextPrevBtn('back', 'set-id')}><Icon name={'arrow-back'} size={30} color={'#4d5153'} style={{ marginRight: 28 }} /></TouchableOpacity>
                  <TouchableOpacity disabled={this.tempDetailsIndex == this.tempMarkers.length - 1} onPress={() => this.onPressNextPrevBtn('next', 'set-id')}><Icon name={'arrow-forward'} size={30} color={'#4d5153'} style={{}} /></TouchableOpacity>
                </View>
              </View>
            </View>
          </SafeAreaView>
          : null
        }
      </View >
    );
  }
}

AnimatedViews.propTypes = {
  provider: ProviderPropType
};



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
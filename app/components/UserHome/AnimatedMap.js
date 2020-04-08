import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import { Dimensions, Image, SafeAreaView, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import MapView, { Marker, ProviderPropType, PROVIDER_GOOGLE } from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteContribution } from '../../actions/EditMyTree';
import { loadProject } from '../../actions/loadTposAction';
import { multiple_trees, tree_1 } from '../../assets/index.js';
import { getAllPlantProjectsSelector } from '../../selectors';
import { currentUserProfileIdSelector } from '../../selectors/index';
import styles from '../../styles/UserHome/animated_map';
import ContributionCard from '../UserContributions/ContributionCard.native';
import UserContributionsDetails from '../UserContributions/ContributionDetails/index.native';

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
      isDetailShow: false,
      activeIndex: 0,
      lastActiveIndex: 0,
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
    const { isMapPressed } = this.props;
    return {
      top: 0,
      right: 0,
      bottom: this.props.isFullMapComponentModal ? this.state.singleContributionID ? 160 : isMapPressed ? 30 : 170 : 0,
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
        // console.log('initiateComponent')
        this.setState({
          activeIndex: 0,
          lastActiveIndex: 0,
        })
        this._carousel.snapToItem(0)
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
                console.log('willRecievevPropsactiveIndex = ', activeIndex, 'activeMarker', activeMarker)
                this.setState({ isDetailShow: true, activeIndex: activeIndex }, () => {
                  this._carouselDetail.snapToItem(activeIndex)
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
              alert(JSON.stringify(e))
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
    if (nextProps.isFullMapComponentModal == false) {
      // alert('Gooes Back')
      // this.setState({ activeIndex: 0, singleContributionID: undefined })
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   let flag = this.state.isFullMapComponentModal !== nextProps.isFullMapComponentModal;
  //   console.log(flag, 'flage -----')
  //   return flag;
  // }
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
      this.setState({ singleContributionID: id }, () => {
        // setTimeout(() => {
        //   alert(90)
        //   this._carouselDetail.snapToItem(this.state.activeIndex)
        // }, 500)
      });
    } else {
      if (this.state.singleContributionID) {
        this.setState({ singleContributionID: undefined, isDetailShow: false });
      } else {
        this.props.toggleIsFullMapComp(true);
        setTimeout(() => {
          // alert(232323)
          // console.log(' 178 == ')
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



  onPressMarker = (marker, e) => {
    // console.log('onPressMarker  marker =', marker);
    // console.log(' state singleContribution ID =', this.state.singleContributionID)
    let action = e.nativeEvent.action;

    if (this.state.activeIndex == 0) {
      this._carouselDetail.snapToNext()
      setTimeout(() => {
        this._carouselDetail.snapToPrev()
      }, 600)
    }
    if (this.props.isFullMapComponentModal && this.state.singleContributionID == null && action == 'marker-press') {
      this.setState({ isDetailShow: true }, () => {
        this._carouselDetail.snapToItem(this.state.activeIndex)
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
        800
      );
    } catch (e) {
      // Do thing
    }
  }

  onPressNextPrevBtn = (btn, action) => {
    const { markers, activeIndex } = this.state;
    // console.log()
    if (action == 'set-id') {
      if (btn == 'back') {
        this._carouselDetail.snapToPrev()
        let nextMarker = markers[activeIndex - 1]
        if (nextMarker)
          this.setState({ singleContributionID: nextMarker.id })
      } else if (btn == 'next') {
        this._carouselDetail.snapToNext()
        let prevMarker = markers[activeIndex + 1];
        if (prevMarker)
          this.setState({ singleContributionID: prevMarker.id })
      }
    }
    if (btn == 'back') {
      this._carousel ? this._carousel.snapToPrev() : null;
      if (activeIndex !== 0) {
        this.setState({ activeIndex: activeIndex - 1, lastActiveIndex: activeIndex, }, () => {
          this.toAnimateRegion()
        })
      }
    }
    if (btn == 'next') {
      this._carousel ? this._carousel.snapToNext() : null;
      // console.log(activeIndex < markers.length, activeIndex, markers.length, "----")
      if (activeIndex + 1 !== markers.length) {
        // console.log('next onPressNextPrevBtn calling', activeIndex)
        this.setState({ activeIndex: activeIndex + 1, lastActiveIndex: activeIndex }, () => {
          this.toAnimateRegion()
        })
      }
    }
  }

  onPressMapView = (e) => {
    // console.log(e.nativeEvent.action, 'e.nativeEvent.action')
    if (this.state.singleContributionID) {
      // Do Nothing
    } else {
      if (e.nativeEvent.action !== 'marker-press') {
        this.props.onPressMapView()
      }
    }
  }
  // onPressMapView = (e) => {
  //   if (e.nativeEvent.action !== 'marker-press') {
  //     console.log("e.nativeEvent.action === ", e.nativeEvent.action)
  //     this.props.onPressMapView()
  //   }
  // }

  render() {
    const {
      markers,
      region,
      singleContributionID,
      activeIndex,
      lastActiveIndex,
      isDetailShow
    } = this.state;
    const { isMapPressed } = this.props;
    let activeMarker =
      this.state.markers !== null
        ? this.state.markers.find(x => x.id === this.state.singleContributionID)
        : null;
    let isContribution = this.props.userContributions ? this.props.userContributions.lenght !== 0 ? true : false : false
    let isStaticMap = singleContributionID ? false : isContribution
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
          style={[styles.map, { flex: this.state.singleContributionID ? 0.5 : 1, }]}
          initialRegion={region}
        >
          {markers
            ? markers.map(marker => (
              <Marker
                onPress={(e) => this.onPressMarker(marker, e)}
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
          {true ? (
            true ?
              <Animatable.View
                animation={isMapPressed ? 'fadeOutDown' : 'fadeInUp'}
                style={[styles.swiperCont, { left: this.props.isFullMapComponentModal ? 0 : -1000, }]}>
                <Carousel
                  scrollEnabled={false}
                  onSnapToItem={(index) => {
                    // console.log('index=', index)
                    // console.log('Total Markers leghtn=', markers.lenght)
                    // console.log('activeIndex=', activeIndex)
                  }}
                  // firstItem={activeIndex}
                  ref={(c) => { this._carousel = c; }}
                  data={markers}
                  renderItem={({ item }) => (<ContributionCard
                    onPressSingleContribution={() => this.onPressMarker(markers[activeIndex], { nativeEvent: { action: 'marker-press' } })}
                    isFromAnimatredCardList
                    contribution={item}
                  />)}
                  sliderWidth={screen.width}
                  itemWidth={screen.width}
                />
                <View style={styles.bottomArrowsCont}>
                  <View style={{ flex: 1 }} />
                  <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity onPress={() => this.onPressNextPrevBtn('back')}><Icon name={'arrow-back'} size={30} color={'#4d5153'} style={{ marginRight: 28 }} /></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onPressNextPrevBtn('next')}><Icon name={'arrow-forward'} size={30} color={'#4d5153'} style={{}} /></TouchableOpacity>
                  </View>
                </View>
              </Animatable.View> : null) : null}

        </View>
        <SafeAreaView />
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
            {!isDetailShow ? <TouchableOpacity
              onPress={this.onPressCurrentLocation}
              style={[styles.myLocationIcon, isDetailShow ? ({ bottom: '70%', right: 85 }) : ({})]}
            >
              <Icon name={'my-location'} size={30} color={'#4C5153'} />
            </TouchableOpacity> : null}
            <TouchableOpacity
              onPress={() => { this.setState({ isSatellite: !this.state.isSatellite }) }}
              style={[styles.satellite, isDetailShow ? ({ top: Platform.OS == 'ios' ? 45 : 20, right: 30, bottom: undefined }) : {}]}
            >
              <Icon name={'satellite'} size={30} color={'#4C5153'} />
            </TouchableOpacity>
          </>

        ) : null
        }
        {/* {console.log('animation=', singleContributionID == null ? 'slideInUp' : activeIndex > lastActiveIndex ? 'fadeInRight' : 'fadeInLeft')} */}
        {
          true ? (
            <View style={[styles.userContributionsDetailsFullViewCont, { left: this.state.isDetailShow ? 0 : -1000 }]}>
              <Carousel
                scrollEnabled={false}
                onSnapToItem={(index) => {

                  // console.log('index=', index)
                  // console.log('Total Markers leghtn=', markers.lenght)
                  // console.log('activeIndex=', activeIndex)
                }}
                ref={(c) => { this._carouselDetail = c; }}
                // firstItem={singleContributionID ? activeIndex : undefined}
                data={markers}
                renderItem={({ item }) => (
                  <UserContributionsDetails
                    isDetailShow={this.state.isDetailShow}
                    key={item.id}
                    isFromUserProfile
                    userProfileId={this.props.userProfileId}
                    navigation={this.props.navigation}
                    contribution={item}
                    plantProjects={this.props.plantProjects}
                    deleteContribution={this.props.deleteContribution}
                  />
                )}
                sliderWidth={screen.width}
                itemWidth={screen.width}
              />
              {/* {this.state.markers ? (
              <UserContributionsDetails
                isFromUserProfile
                userProfileId={this.props.userProfileId}
                navigation={this.props.navigation}
                contribution={markers[activeIndex]}
                plantProjects={this.props.plantProjects}
                deleteContribution={this.props.deleteContribution}
              />
            ) : null} */}
              {/* </Animatable.View> */}
            </View>
          ) : null
        }

        {
          this.state.isDetailShow ? <View style={{ position: 'absolute', bottom: 30, width: '100%', backgroundColor: '#fff', }}>
            <View style={styles.bottomArrowsCont}>
              <View style={{ flex: 1 }} />
              <View style={{ flexDirection: 'row', }}>
                <TouchableOpacity onPress={() => this.onPressNextPrevBtn('back', 'set-id')}><Icon name={'arrow-back'} size={30} color={'#4d5153'} style={{ marginRight: 28 }} /></TouchableOpacity>
                <TouchableOpacity onPress={() => this.onPressNextPrevBtn('next', 'set-id')}><Icon name={'arrow-forward'} size={30} color={'#4d5153'} style={{}} /></TouchableOpacity>
              </View>
            </View>
          </View> : null
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

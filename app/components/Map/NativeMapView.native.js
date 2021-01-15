/* eslint-disable react/jsx-boolean-value,react-native/no-color-literals,no-underscore-dangle */
import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  PixelRatio,
  TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';
import MapView, {
  Marker,
  Polygon,
  ProviderPropType,
  PROVIDER_GOOGLE
} from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { PERMISSIONS, request } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import { NotificationManager } from 'react-notifications';
import EStyleSheet from 'react-native-extended-stylesheet';
import { isEqual } from 'lodash';
import { debug } from '../../debug';
import { context } from '../../config';
import { iosSearchGrey } from '../../assets';
import RoundedButton from '../Common/Button/RoundButton.native';
import i18n from '../../locales/i18n';
import buttonStyles from '../../styles/common/button.native';
import markerImage from '../../assets/images/tree.png';
import colors from '../../utils/constants';

const { googleMapApiKey } = context;
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = null; //37.78825;
const LONGITUDE = null; //-122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = Math.abs(LATITUDE_DELTA * ASPECT_RATIO);

let id = 0;

const styles = EStyleSheet.create({
  container: {
    marginBottom: 30,
    position: 'relative'
  },
  fullScreenContainer: {
    flex: 1,
    marginTop: 20,
    position: 'relative'
  },
  map: {
    height: 200
  },
  inputContainerFullScreen: {
    top: -25,
    position: 'absolute',
    width: '94%',
    left: '3%',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#aaaaaa',
    backgroundColor: colors.WHITE
  },
  inputContainer: {
    bottom: -25,
    position: 'absolute',
    width: '94%',
    left: '2.5%',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#aaaaaa',
    // borderRadius: '50%',
    backgroundColor: colors.WHITE
  },
  btnLocation: {
    position: 'absolute',
    bottom: 50,
    right: 10,
    backgroundColor: colors.WHITE,
    borderColor: colors.WHITE
  },
  btnDeleteFullScreen: {
    position: 'absolute',
    bottom: 145,
    width: 50,
    height: 50,
    right: 10,
    backgroundColor: colors.WHITE,
    borderColor: colors.WHITE
  },
  btnAddFullScreen: {
    position: 'absolute',
    bottom: 200,
    width: 50,
    height: 50,
    right: 10,
    backgroundColor: colors.WHITE,
    borderColor: colors.WHITE
  },
  btnLocationFullScreen: {
    position: 'absolute',
    bottom: 85,
    width: 50,
    height: 50,
    right: 10,
    backgroundColor: colors.WHITE,
    borderColor: colors.WHITE
  },
  btnFullScreen: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: colors.WHITE,
    borderColor: colors.WHITE
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%'
  },
  markerFullScreen: {
    height: 48,
    width: 48,
    top: -20
  },
  marker: {
    height: 48,
    width: 48
  },
  actionButtonTouchableFullScreen: {
    bottom: '4%'
  }
});
/**
 * {mapStyle} apply your custom map style to the map
 * for more information refer this https://mapstyle.withgoogle.com/
 * */
const mapStyle = [
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
        color: colors.WHITE
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

/**
 * extract geoLongitude or geoLatitude from query param mapPoint string geoLatitude=19.07340857684426&geoLongitude=72.87765506654978
 * @param query mapPoint
 * @param variable geoLongitude or geoLatitude
* */
function getQueryVariable(query, variable) {
  if (!query) {
    return null;
  }
  let vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) {
      return parseFloat(decodeURIComponent(pair[1]));
    }
  }
}
/**
 * convert geoLongitude geoLatitude in string format to accept api DTO
 * @param mode string single_tree or multiple_trees
 * @param mapPoint array of coordinate of longitude and latitude
 * */
export function encodeFormData(mode, mapPoint) {
  //debug('Data in polygon', mapPoint);

  if (!mapPoint) {
    return '';
  }
  if (mode) {
    if (mode === 'single-tree' && Array.isArray(mapPoint) && mapPoint.length) {
      return `geoLatitude=${mapPoint[0].coordinate.latitude}&geoLongitude=${mapPoint[0].coordinate.longitude}`;
    } else if (
      mode === 'multiple-trees' &&
      Array.isArray(mapPoint) &&
      mapPoint.length
    ) {
      //debug('Data in polygon', mapPoint);
      const polygon = mapPoint.map(polygonItem => {
        const data = polygonItem.coordinates.map(cord => {
          //debug('cord', cord);
          return [cord.latitude, cord.longitude];
        });
        return data;
      });
      //debug('polygon', polygon);
      return {
        type: 'Polygon',
        coordinates: polygon
      };
    }
    return null;
  } else {
    return null;
  }
}
/**
 * convert string to data object that map accept
 * @param mode string single_tree or multiple_trees
 * @param mapPoint string of data that we get from api or in string format
 * */
export function decodeFormData(mode, mapPoint) {
  if (!mapPoint) {
    return null;
  }

  if (mode) {
    if (mode === 'single-tree' && mapPoint) {
      return [
        {
          coordinate: {
            latitude: Number(getQueryVariable(mapPoint, 'geoLatitude')) ? Number(getQueryVariable(mapPoint, 'geoLatitude')) : 0,
            longitude: Number(getQueryVariable(mapPoint, 'geoLongitude')) ? Number(getQueryVariable(mapPoint, 'geoLongitude')) : 0,
            key: 1
          }
        }
      ];
    }
  }
  return mode === 'single-tree' ? [] : null;
}

class NativeMapView extends Component {
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.isSingleTree = this.props.mode === 'single-tree';
    const { geoLocation, mode, geometry } = this.props;
    const marker =
      this.isSingleTree && geoLocation
        ? decodeFormData(mode, geoLocation)
        : null;
    this.state = {
      pointInView: null,
      coordinates: null,
      location: null,
      shouldDisplayListView: true,
      region: {
        latitude: getQueryVariable(geoLocation, 'geoLatitude'),
        longitude: getQueryVariable(geoLocation, 'geoLongitude'),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      polygons: [],
      editing:
        !this.isSingleTree && !Array.isArray(geometry)
          ? decodeFormData(mode, geometry)
          : null,
      creatingHole: false,
      markers: marker || [],
      width: 500,
      mapMargin: 1
    };
  }

  componentDidMount() {
    this.gotoLocation();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps, this.props)) {
      this.onPropsUpdate(nextProps);
      this.ref && nextProps.address && this.ref.setAddressText(nextProps.address);
    }
  }

  onPropsUpdate = nextProps => {
    const { geoLocation, mode, geometry } = nextProps;
    const marker =
      this.isSingleTree && geoLocation
        ? decodeFormData(mode, geoLocation)
        : null;
    const state = {
      region: {
        latitude: getQueryVariable(geoLocation, 'geoLatitude'),
        longitude: getQueryVariable(geoLocation, 'geoLongitude'),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      address: null,
      editing:
        !this.isSingleTree && !Array.isArray(geometry)
          ? decodeFormData(mode, geometry)
          : null,
      markers: marker || []
    };

    this.setState(
      {
        ...state
      },
      () => {
        setTimeout(() => {
          this.gotoLocation();
        }, 1000);
      }
    );
    nextProps.address && this.ref && this.ref.setAddressText(nextProps.address);
  };

  onDoublePress = e => {
    if (this.props.onPress && !this.props.fullScreen) {
      this.props.onPress(e);
    }
    return null;
  };
  /**
   * if(!this.props.fullScreen) open map in full screen
   * */
  onPress(e) {
    if (!this.props.fullScreen && this.props.onPress) {
      this.props.onPress(e);
    } else if (!this.isSingleTree) {
      /**
       * this for multiple tree we are currently using single tree flow in feature we are planning to add multiple marker for multiple tree
       * */
      const { editing, creatingHole } = this.state;
      if (!editing) {
        //debug('clicked map');
        this.setState({
          editing: {
            id: id++,
            coordinates: [e.nativeEvent.coordinate],
            holes: []
          }
        });
      } else if (!creatingHole) {
        this.setState({
          editing: {
            ...editing,
            coordinates: [...editing.coordinates, e.nativeEvent.coordinate]
          }
        });
      } else {
        const holes = [...editing.holes];
        holes[holes.length - 1] = [
          ...holes[holes.length - 1],
          e.nativeEvent.coordinate
        ];
        this.setState({
          editing: {
            ...editing,
            id: id++, // keep incrementing id to trigger display refresh
            coordinates: [...editing.coordinates],
            holes
          }
        });
      }
    }
  }
  /**
   * change position to specific region or location
   * @param location object of region = {
        latitude: ....,
        longitude: ...,
        latitudeDelta: .....,
        longitudeDelta: ....
      }
    * @param address string set textfield value of GooglePlacesAutocomplete address
   * @param isFromTextInput bool if(isFromTextInput) set change state value of address that we will pass in parent components
   * */
  gotoCurrentLocation = (location, address = null, isFromTextInput = false) => {
    if (address && isFromTextInput) {
      this.setState({
        address
      });
    }
    /**
     * change position of map to givin region or location
     * */
    if (this.map && location) {
      setTimeout(() => {
        this.map && this.map.animateToRegion(location);
      }, 1000);
    }
  };

  /**
   * for multiple tree to add multiple polygon on map
   * */
  addPolygon = () => {
    const { polygons, editing } = this.state;
    this.setState({
      polygons: [...polygons, editing],
      editing: null,
      creatingHole: false
    });
  };

  /**
   * Callback that is called continuously when the region changes, such as when a user is dragging the map.
   * if map is full screen and it's single tree
   * */
  onRegionChange = region => {
    if (this.props.fullScreen && this.isSingleTree) {
      /**
       * set region object that data we will send to parent props
       * */
      this.setState({
        region: {
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      });
      /**
       * set Marker array on map
       * */
      this.setState({
        markers: [
          {
            coordinate: {
              latitude: Number(region.latitude) ? Number(region.latitude) : 0,
              longitude: Number(region.longitude) ? Number(region.longitude) : 0
            },
            key: id++
          }
        ]
      });
    }
  };

  renderPolygon() {
    /**
     * @property mapOptions used to configure map option
     * {showsUserLocation} If true the app will ask for the user's location.
     * */
    const mapOptions = {
      showsUserLocation: false,
    };
    const {
      editing,
      region: { latitude, longitude }
    } = this.state;
    /**
     * drow polygon for multiple tree
     * */
    if (editing) {
      mapOptions.scrollEnabled = false;
      mapOptions.onPanDrag = e => this.onPress(e);
    }
    /**
     * set initial region on map
     * */
    if (latitude && longitude) {
      mapOptions.initialRegion = {
        ...this.state.region
      };

    }
    const screen = Dimensions.get('window');
    const mapPaddingTop = screen.height * 0.1;
    /**
     * set mapPadding for set position of google logo on screen
     * */
    const setMapPadding = () => {
      const iosEdgePadding = {
        top: mapPaddingTop * 0.5,
        right: 0,
        bottom: this.props.fullScreen
          ? screen.height >= 700
            ? PixelRatio.getPixelSizeForLayoutSize(screen.height * 0.034)
            : PixelRatio.getPixelSizeForLayoutSize(screen.height * 0.05)
          : screen.height * 0.025,
        left: 0
      };
      const androidEdgePadding = {
        top: mapPaddingTop * 0.5,
        right: 0,
        bottom: this.props.fullScreen
          ? screen.height >= 700
            ? PixelRatio.getPixelSizeForLayoutSize(screen.height * 0.034)
            : PixelRatio.getPixelSizeForLayoutSize(screen.height * 0.05)
          : screen.height * 0.025,
        left: 0
      };
      const edgePadding =
        Platform.OS === 'android' ? androidEdgePadding : iosEdgePadding;
      return edgePadding;
    };
    /**
     * for more information refer https://github.com/react-native-community/react-native-maps
     *
     * */
    return (
      <MapView
        ref={ref => (this.map = ref)}
        provider={PROVIDER_GOOGLE}
        style={[
          this.props.mapStyle,
          { width: this.state.width, marginBottom: this.state.mapMargin }
        ]}
        mapPadding={setMapPadding()}
        onPress={e => this.onPress(e)}
        onMapReady={() => this.setState({ width: screen.width })}
        onDoublePress={e => this.onDoublePress(e)}
        onLongPress={e => this.onDoublePress(e)}
        onMarkerPress={e => this.onDoublePress(e)}
        onRegionChangeComplete={this.onRegionChange}
        customMapStyle={mapStyle}
        {...mapOptions}
      >
        {this.props.mode === 'multiple-trees' &&
          this.state.polygons.map(polygon => (
            <Polygon
              key={polygon.id}
              coordinates={polygon.coordinates}
              holes={polygon.holes}
              strokeColor="#F00"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />
          ))}
        {editing && (
          <Polygon
            key={editing.id}
            coordinates={editing.coordinates}
            holes={editing.holes}
            strokeColor="#000"
            fillColor="rgba(255,2420,8,0.5)"
            strokeWidth={1}
            tappable
          />
        )}
        {/**
         * render marker on map
         */}
        {!this.props.fullScreen &&
          this.props.mode === 'single-tree' &&
          this.state.markers.map(marker => (
            <Marker
              key={marker.key || 0}
              coordinate={marker.coordinate}
            >
              <Image
                style={
                  this.props.fullScreen
                    ? styles.markerFullScreen
                    : styles.marker
                }
                source={markerImage}
              />
            </Marker>
          ))}
        {this.props.fullScreen &&
          !this.isSingleTree &&
          this.state.editing &&
          this.state.editing.coordinates.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker}
            >
              <Image
                style={
                  this.props.fullScreen
                    ? styles.markerFullScreen
                    : styles.marker
                }
                source={markerImage}
              />
            </Marker>
          ))}
      </MapView>
    );
  }

  removeData = () => {
    this.setState({
      markers: [],
      editing: null
    });
  };

  /**
   * move map to user current location
   * */
  goto = () => {
    if (!this.props.fullScreen) {
      if (this.props.onPress) {
        this.props.onPress();
      }
    } else {
      this.getMyLocation();
    }
  };
  /**
   * set map view to current location
   * */
  gotoLocation = () => {
    if (
      !this.props.fullScreen &&
      this.state.markers &&
      this.state.markers.length
    ) {
      this.gotoCurrentLocation({
        latitude: this.state.markers[0].coordinate.latitude,
        longitude: this.state.markers[0].coordinate.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      });
    } else if (
      this.state.marker &&
      this.state.marker.length <= 0 &&
      this.isSingleTree
    ) {
      this.getMyLocation();
    } else if (!this.isSingleTree || !this.state.region.latitude) {
      this.getMyLocation();
    }
  };
  /**
   * get current position of user
   * */
  getMyLocation = () => {
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      })
    ).then((/*response*/) => {
      setTimeout(() => {
        Geolocation.getCurrentPosition(
          location => {
            let { latitude, longitude } = location.coords;
            const region = {
              latitude,
              longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            };
            this.setState(
              {
                region
              },
              () => {
                this.gotoCurrentLocation(region);
              }
            );

            // Temporary added comment for prevent moving map to current location DO NOT REMOVE code
            // if(this.props.fullScreen && this.state.marker && this.state.marker.length){
            //   this.gotoCurrentLocation({
            //     latitude: this.state.markers[0].latitude,
            //     longitude: this.state.markers[0].longitude,
            //     latitudeDelta: LATITUDE_DELTA,
            //     longitudeDelta: LONGITUDE_DELTA
            //   });
            // }
            // else {
            //   // this.setState({
            //   //   region
            //   // }, () => {
            //   //   this.gotoCurrentLocation(region);
            //   // })
            // }
            // debug({
            //   region,
            //   Sta: this.state.region,
            //   marker: this.state.markers
            // })
          },
          error => {
            debug('Errors===>', error);
            NotificationManager.error(
              i18n.t('label.location_permission_denied'),
              i18n.t('label.error'),
              5000
            );
          }
        );
      }, 1000);
    });
  };
/**
 * render full screen map small map
 * */
  renderComp = render => {
    const { fullScreen, onPress } = this.props;
    if (!fullScreen) {
      return (
        <TouchableWithoutFeedback onPress={onPress}>
          {render}
        </TouchableWithoutFeedback>
      );
    } else {
      return render;
    }
  };

  render() {
    const { fullScreen, onContinue, mode, onPress } = this.props;
    const inputProps = fullScreen
      ? {
        onFocus: () => {
          this.setState({
            shouldDisplayListView: true
          });
        },
        onBlur: () => {
          this.setState({
            shouldDisplayListView: false
          });
        },
        editable: true,
        keyboardAppearance: 'light',
        placeholderTextColor: '#4d5153',
        returnKeyType: 'search', // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        onPress: () => {
          //debug('clicked');
        }
      }
      : {
        editable: true,
        onFocus: onPress,
        pointerEvents: 'none',
        keyboardAppearance: 'light',
        placeholderTextColor: '#4d5153',
        returnKeyType: 'search', // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      };
    return this.renderComp(
      <View style={fullScreen ? styles.fullScreenContainer : styles.container}>
        {this.renderPolygon()}
        {fullScreen && this.isSingleTree && (
          <View style={styles.markerFixed}>
            <Image
              style={fullScreen ? styles.markerFullScreen : styles.marker}
              source={markerImage}
            />
          </View>
        )}
        {this.props.searchPlacesBox
          ? this.renderComp(
            <TouchableWithoutFeedback
              onPress={e => {
                this.onPress(e);
              }}
            >
              <View
                style={
                  fullScreen
                    ? [styles.inputContainerFullScreen]
                    : styles.inputContainer
                }
              >
                {/**
                 * for more info https://github.com/FaridSafi/react-native-google-places-autocomplete
                 * @property listViewDisplayed display result in list view
                 * @property fetchDetails fetch details from googlePlaceApi
                 */}
                <GooglePlacesAutocomplete
                  listViewDisplayed={this.state.shouldDisplayListView}
                  keyboardShouldPersistTaps={'always'}
                  placeholder={i18n.t('label.map_search_placeholder')}
                  minLength={2}
                  autoFocus={false}
                  fetchDetails={true}
                  ref={ref => (this.ref = ref)}
                  // listViewDisplayed="auto"
                  styles={{
                    textInputContainer: {
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                      width: '100%',
                      borderRadius: 25,
                      backgroundColor: 'transparent',
                      justifyContent: 'center',
                      alignItems: 'center'
                    },
                    textInput: {
                      backgroundColor: 'transparent',
                      marginLeft: 0,
                      marginTop: 0,
                      marginBottom: 0,
                      marginRight: 5,
                      height: 44,
                      fontSize: 14,
                      borderRadius: 7,
                      color: '#4d5153',
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      overflow: 'hidden',
                      lineHeight: 18
                    },
                    predefinedPlacesDescription: {
                      color: '#1faadb'
                    },
                    container: {
                      borderColor: '#aaaaaa',
                      justifyContent: 'center'
                    },
                    poweredContainer: {
                      display: 'none'
                    }
                  }}
                  debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                  nearbyPlacesAPI="GooglePlacesSearch" //Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                  query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: googleMapApiKey,
                    language: i18n.language // language of the results
                  }}
                  currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                  renderLeftButton={() => ( //searchIcon
                    <Image
                      source={iosSearchGrey}
                      style={{
                        width: 19,
                        height: 19,
                        marginLeft: 16,
                        resizeMode: 'cover'
                        // color: '#4d5153'
                      }}
                    />
                  )}
                  onPress={(data, details = null) => {
                    this.gotoCurrentLocation(
                      {
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA
                      },
                      data.description,
                      true
                    );
                  }}
                  defaultValue={!fullScreen && this.props.address}
                  textInputProps={inputProps}
                />
              </View>
            </TouchableWithoutFeedback>
          )
          : null}
          {/**
           * for multiple trees add multiple polygon
           */}
          {!!(this.state.markers.length || this.state.editing) &&
          !this.isSingleTree && (
            <RoundedButton
              buttonStyle={
                fullScreen ? styles.btnAddFullScreen : styles.btnLocation
              }
              textStyle={{ marginRight: 0 }}
              onClick={this.addPolygon}
            >
              <Icon name="plus" size={fullScreen ? 24 : 18} color="#000000" />
            </RoundedButton>
          )}
          {/**
           * remove button to remove polygon on map
           */}
        {!!(this.state.markers.length || this.state.editing) &&
          !this.isSingleTree && (
            <RoundedButton
              buttonStyle={
                fullScreen ? styles.btnDeleteFullScreen : styles.btnLocation
              }
              textStyle={{ marginRight: 0 }}
              onClick={this.removeData}
            >
              <Icon name="delete" size={fullScreen ? 24 : 18} color="#000000" />
            </RoundedButton>
          )}

          {/**
           * current location button
          */}
        {fullScreen && (
          <RoundedButton
            buttonStyle={
              fullScreen ? styles.btnLocationFullScreen : styles.btnLocation
            }
            textStyle={{ marginRight: 0 }}
            onClick={this.goto}
          >
            <Icon
              name="my-location"
              size={fullScreen ? 24 : 18}
              color="#000000"
            />
          </RoundedButton>
        )}
        {/**
         * continue button for fullscreen map
         * @function onContinue send data to parent components
         * {encodeFormData} convert object into string that api accept
         */}
        {fullScreen && (
          <TouchableOpacity
            style={[
              buttonStyles.actionButtonTouchableFullScreen,
              styles.actionButtonTouchableFullScreen
            ]}
            onPress={() => {
              setTimeout(() => {
                if (onContinue) {
                  onContinue(
                    this.state.mode === 'single-tree'
                      ? encodeFormData(mode, this.state.markers)
                      : `geoLatitude=${this.state.region.latitude}&geoLongitude=${this.state.region.longitude}`,
                    encodeFormData(mode, this.state.polygons),
                    mode,
                    this.state.address
                  );
                }
              }, 500);
            }}
          >
            <View style={buttonStyles.actionButtonView}>
              <Text style={buttonStyles.actionButtonText}>
                {i18n.t('label.continue')}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

NativeMapView.propTypes = {
  mapStyle: PropTypes.object,
  onContinue: PropTypes.func,
  navigation: PropTypes.func,
  onPress: PropTypes.func,
  fullScreen: PropTypes.bool,
  location: PropTypes.any,
  geometry: PropTypes.any,
  geoLocation: PropTypes.any,
  mode: PropTypes.any,
  provider: ProviderPropType,
  searchPlacesBox: PropTypes.bool
};

NativeMapView.defaultProps = {
  fullScreen: false,
  searchPlacesBox: true,
  onPress: () => { },
  location: {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  }
};

export default NativeMapView;
export { mapStyle };

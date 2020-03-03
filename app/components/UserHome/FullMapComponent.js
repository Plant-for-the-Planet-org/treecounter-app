import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';
import { tree_1, smalltreewhite } from '../../assets/index';
import { markerImage } from '../../assets/index.js';

const { width, height } = Dimensions.get('window');

const CARD_HEIGHT = 150;
const CARD_WIDTH = CARD_HEIGHT;

let markerStyle = {
  width: 30,
  height: 30
};

export default class FullMapComponent extends Component {
  constructor() {
    super();
    this.arr = [];
  }
  state = {
    markers: [],
    region: null,
    dynamicIndex: 0
  };

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    this.initiateComponent();
  }

  initiateComponent = () => {
    const { navigation } = this.props;
    let userContributions = navigation.getParam('userContributions');
    this.setState(
      {
        markers: userContributions,
        region: {
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
      },
      () => {
        setTimeout(() => {
          this.map.animateToRegion(
            {
              ...{
                latitude: this.state.markers[0].geoLatitude,
                longitude: this.state.markers[0].geoLongitude
              },
              latitudeDelta: 75,
              longitudeDelta: 75
            },
            350
          );
        }, 2000);

        this.animation.addListener(({ value }) => {
          let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
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
              this.map.animateToRegion(
                {
                  latitude: oneContribution.geoLatitude,
                  longitude: oneContribution.geoLongitude,
                  latitudeDelta: 75,
                  longitudeDelta: 75
                },
                350
              );
            }
          }, 10);
        });
      }
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

  onPressMarker = index => {
    this.scrollview_ref.getNode().scrollTo({
      x: this.arr[index],
      y: 0,
      animated: true
    });
  };

  onLayoutMarker = ({ nativeEvent }, index) => {
    this.arr[index] = nativeEvent.layout.x;
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        {this.state.region ? (
          <MapView
            ref={map => (this.map = map)}
            initialRegion={this.state.region}
            style={styles.container}
            customMapStyle={mapStyle}
          >
            {this.state.markers.length
              ? this.state.markers.map((marker, index) => (
                  <MapView.Marker
                    key={index}
                    coordinate={{
                      latitude: marker.geoLatitude,
                      longitude: marker.geoLongitude
                    }}
                  >
                    <Animated.View style={[]}>
                      <TouchableOpacity
                        // onPress={() => this.onPressMarker(index)}
                        style={markerStyle}
                      >
                        <Image
                          source={markerImage}
                          style={markerStyle}
                          resizeMode={'contain'}
                        />
                      </TouchableOpacity>
                    </Animated.View>
                  </MapView.Marker>
                ))
              : null}
          </MapView>
        ) : null}
        <Animated.ScrollView
          ref={ref => {
            this.scrollview_ref = ref;
          }}
          horizontal
          //scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          //snapToInterval={CARD_WIDTH}
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
        <Icon
          onPress={() => navigation.goBack()}
          name={'keyboard-arrow-down'}
          size={40}
          color={'#000'}
          style={styles.downArrowIcon}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
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
      </View>
    );
  }
}

const ListItem = ({ marker, toNavigateUserContributionDetail }) => {
  return (
    <TouchableOpacity
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
    </TouchableOpacity>
  );
};

export { ListItem };

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
    top: 20,
    left: 20
  },
  myLocationIcon: {
    position: 'absolute',
    bottom: 270,
    right: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 50,
    zIndex: 2000,
    elevation: 6
  },
  fullScreenExitIcon: {
    position: 'absolute',
    bottom: 200,
    right: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 50,
    zIndex: 2000,
    elevation: 6
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

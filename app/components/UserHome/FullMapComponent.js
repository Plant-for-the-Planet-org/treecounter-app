import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView from 'react-native-maps';
import { tree_1, donateIcon } from '../../assets/index';
import Smalltreewhite from '../../assets/images/smalltreewhite.png';

const { width, height } = Dimensions.get('window');

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT;

let markerStyle = {
  width: 30,
  height: 30,
  backgroundColor: '#89b53a',
  borderRadius: 50,
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
};

export default class FullMapComponent extends Component {
  state = {
    markers: [],
    region: null
  };

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
    const { normalizeDataForFullMap } = this.props;

    this.setState(
      {
        markers: this.props.normalizeDataForFullMap,
        region: this.props.region
      },
      () => {
        console.log(
          this.state.markers[0].coordinate,
          'this.state.markers[0].coordinate,'
        );
        setTimeout(() => {
          this.map.animateToRegion(
            {
              ...this.state.markers[0].coordinate,
              latitudeDelta: 75,
              longitudeDelta: 75
            },
            350
          );
        }, 2000);
      }
    );
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
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
          const { coordinate } = this.state.markers[index];
          console.log(coordinate, 'coordinate');
          this.map.animateToRegion(
            {
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
              latitudeDelta: 75,
              longitudeDelta: 75
            },
            350
          );
        }
      }, 10);
    });
  }

  render() {
    console.log(this.state.markers);
    return (
      <View style={styles.container}>
        {this.state.region ? (
          <MapView
            ref={map => (this.map = map)}
            initialRegion={this.state.region}
            style={styles.container}
            customMapStyle={mapStyle}
          >
            {this.state.markers.map((marker, index) => (
              <MapView.Marker
                key={index}
                coordinate={{
                  latitude: marker.coordinate.latitude,
                  longitude: marker.coordinate.longitude
                }}
              >
                <Animated.View style={[styles.markerWrap]}>
                  <Animated.View style={[styles.ring]} />
                  <View style={markerStyle}>
                    <Image source={Smalltreewhite} resizeMode={'contain'} />
                  </View>
                </Animated.View>
              </MapView.Marker>
            ))}
          </MapView>
        ) : null}
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
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
          {this.state.markers.map((marker, index) => (
            <View style={styles.card} key={index}>
              <View style={styles.textContent}>
                <ListItem marker={marker} />
              </View>
            </View>
          ))}
        </Animated.ScrollView>
        <Icon
          onPress={this.props.toogleIsFullMapComponentShow}
          name={'keyboard-arrow-down'}
          size={40}
          color={'#000'}
          style={{ position: 'absolute', top: 20, left: 20 }}
        />
      </View>
    );
  }
}

const ListItem = ({ marker }) => {
  return (
    <View
      style={{
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 10,
        flexDirection: 'row'
      }}
    >
      <View style={{ flex: 1 }}>
        <View>
          <Text
            style={{
              fontFamily: 'OpenSans-Bold',
              fontSize: 18,
              lineHeight: 24,
              color: '#4d5153'
            }}
          >
            Gift to Sam William
          </Text>
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text
            style={{
              fontFamily: 'OpenSans-Regular',
              fontSize: 14,
              lineHeight: 24,
              color: '#4d5153'
            }}
          >
            Planted by Eden Reforestation Projects
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              fontFamily: 'OpenSans-Bold',
              fontSize: 25,
              lineHeight: 35,
              marginHorizontal: 2,
              color: '#89b53a'
            }}
          >
            {marker.treeCount}
          </Text>
          <Image
            source={tree_1}
            style={{ width: 18, height: 20, marginHorizontal: 2 }}
          />
        </View>
      </View>
    </View>
  );
};

export { ListItem };

const styles = StyleSheet.create({
  container: {
    flex: 1
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

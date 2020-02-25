import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions
} from 'react-native';

import MapView from 'react-native-maps';
import { tree_1 } from '../../assets/index';
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
    markers: [
      {
        coordinate: {
          latitude: 45.524548,
          longitude: -122.6749817
        },
        title: 'Best Place',
        description: 'This is the best place in Portland'
      },
      {
        coordinate: {
          latitude: 45.524698,
          longitude: -122.6655507
        },
        title: 'Second Best Place',
        description: 'This is the second best place in Portland'
      },
      {
        coordinate: {
          latitude: 45.5230786,
          longitude: -122.6701034
        },
        title: 'Third Best Place',
        description: 'This is the third best place in Portland'
      },
      {
        coordinate: {
          latitude: 45.521016,
          longitude: -122.6561917
        },
        title: 'Fourth Best Place',
        description: 'This is the fourth best place in Portland'
      }
    ],
    region: {
      latitude: 45.52220671242907,
      longitude: -122.6653281029795,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068
    }
  };

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  componentDidMount() {
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
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta
            },
            350
          );
        }
      }, 10);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={map => (this.map = map)}
          initialRegion={this.state.region}
          style={styles.container}
        >
          {this.state.markers.map((marker, index) => (
            <MapView.Marker key={index} coordinate={marker.coordinate}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.View style={[styles.ring]} />
                <View style={markerStyle}>
                  <Image source={Smalltreewhite} resizeMode={'contain'} />
                </View>
              </Animated.View>
            </MapView.Marker>
          ))}
        </MapView>
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
                <ListItem />
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

const ListItem = () => {
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
      <View
        style={{ justifyContent: 'center', alignItems: 'center', margin: 20 }}
      >
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
            1
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
    width: width * 0.85,
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

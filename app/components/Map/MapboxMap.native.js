import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import MapView, {
  MAP_TYPES,
  Polygon,
  ProviderPropType
} from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

// MapboxGL.setAccessToken(
//   'pk.eyJ1Ijoic2FuamF5LXJhZGFkaXlhOTEiLCJhIjoiY2sxMXgwNWlxMGg0ZDNjcGd4bGNtcHJtdSJ9.qC7IzoEEJ_DFtGzz02nvSw'
// );

class MapboxMap extends Component {
  constructor(props) {
    super(props);

    this.mapRef = null;
  }

  state = {
    pointInView: null,
    coordinates: null,
    location: null,

    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    },
    polygons: [],
    editing: null,
    creatingHole: false
  };

  componentDidMount() {
    // MapboxGL.setTelemetryEnabled(false);
  }

  renderPointInView() {
    if (!this.state.pointInView) {
      return <Text>xy</Text>;
    }

    return [
      <Text key={'x'}>x: {this.state.pointInView[0]}</Text>,
      <Text key={'y'}>y: {this.state.pointInView[1]}</Text>
    ];
  }

  createHole() {
    const { editing, creatingHole } = this.state;
    if (!creatingHole) {
      this.setState({
        creatingHole: true,
        editing: {
          ...editing,
          holes: [...editing.holes, []]
        }
      });
    } else {
      const holes = [...editing.holes];
      if (holes[holes.length - 1].length === 0) {
        holes.pop();
        this.setState({
          editing: {
            ...editing,
            holes
          }
        });
      }
      this.setState({ creatingHole: false });
    }
  }

  onPress(e) {
    const { editing, creatingHole } = this.state;
    if (!editing) {
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

  mapTouch(event) {
    console.log('coordinates : ', event.nativeEvent.coordinate);
  }

  renderPolygon() {
    const mapOptions = {
      scrollEnabled: true
    };

    if (this.state.editing) {
      mapOptions.scrollEnabled = false;
      mapOptions.onPanDrag = e => this.onPress(e);
    }

    return (
      <MapView
        provider={this.props.provider}
        style={this.props.mapStyle}
        mapType={MAP_TYPES.HYBRID}
        initialRegion={this.state.region}
        onPress={e => this.onPress(e)}
        {...mapOptions}
      >
        {this.state.polygons.map(polygon => (
          <Polygon
            key={polygon.id}
            coordinates={polygon.coordinates}
            holes={polygon.holes}
            strokeColor="#F00"
            fillColor="rgba(255,0,0,0.5)"
            strokeWidth={1}
          />
        ))}
        {this.state.editing && (
          <Polygon
            key={this.state.editing.id}
            coordinates={this.state.editing.coordinates}
            holes={this.state.editing.holes}
            strokeColor="#000"
            fillColor="rgba(255,0,0,0.5)"
            strokeWidth={1}
          />
        )}
      </MapView>
    );
  }

  renderMap() {
    return (
      <MapView
        style={this.props.mapStyle}
        region={{
          latitude: 42.882004,
          longitude: 74.582748,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        onPress={event => this.mapTouch(event)}
      />
    );
  }

  render() {
    return (
      <View style={{}}>
        {// if(){

        this.renderPolygon()

        // }
        }
        {/* {this.renderMap()} */}
      </View>
    );
  }
}

MapboxMap.propTypes = {
  provider: ProviderPropType
};

MapboxMap.propTypes = {
  mapStyle: PropTypes.object
};

export default MapboxMap;

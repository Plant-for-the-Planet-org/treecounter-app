import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, LocalTile } from 'react-native-maps';

class CaptureMap extends React.Component {
  takeSnapshot = () => {
    const snapshot = this.map.takeSnapshot({
      width: 300, // optional, when omitted the view-width is used
      height: 300, // optional, when omitted the view-height is used
      format: 'png', // image formats: 'png', 'jpg' (default: 'png')
      quality: 1, // image quality: 0..1 (only relevant for jpg, default: 1)
      result: 'file' // result types: 'file', 'base64' (default: 'file')
    });
    snapshot.then(uri => {
      console.log(uri);
    });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={ref => (this.map = ref)}
          // mapType={'satellite'}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 24.8828112,
            longitude: 67.0682423,
            latitudeDelta: 0.00232,
            longitudeDelta: 0.0435345
          }}
          onRegionChangeComplete={e => console.log(e)}
        >
          <LocalTile
            pathTemplate={
              'file:///data/user/0/org.pftp/cache/AirMapSnapshot452564119.png'
            }
          />
        </MapView>
        <View
          style={{
            width: 3,
            height: '80%',
            borderColor: 'black',
            borderWidth: 2,
            position: 'absolute',
            zIndex: -300,
            left: 20
          }}
        />
        <TouchableOpacity
          style={{ marginVertical: 20 }}
          onPress={this.takeSnapshot}
        >
          <Text style={{ textAlign: 'center', color: 'black' }}>
            Take Snapshot
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default CaptureMap;

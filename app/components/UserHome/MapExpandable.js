import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import MapView from 'react-native-maps';
import FullMapComponent from './FullMapComponent';
export default class MapExpandable extends Component {
  constructor() {
    super();

    this.state = { expanded: true };

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.btnTextHolder}>
          <View style={{ height: this.state.expanded ? 500 : 250 }}>
            <FullMapComponent
              toggleIsFullMapComp={this.props.toggleIsFullMapComp}
              navigation={this.props.navigation}
              userContributions={this.props.userContributions}
            />
          </View>
          {/* <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayout} style={styles.Btn}>
                        <Text style={styles.btnText}>Expand / Collapse</Text>
                    </TouchableOpacity> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0
  },

  text: {
    fontSize: 17,
    color: 'black',
    padding: 10
  },

  btnText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20
  },

  btnTextHolder: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)'
  },

  Btn: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});

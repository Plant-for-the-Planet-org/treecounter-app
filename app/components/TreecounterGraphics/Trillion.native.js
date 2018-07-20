import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Svg, {
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Text,
  Use,
  Defs,
  Stop,
  Image
} from 'react-native-svg';
import i18n from '../../locales/i18n';

export default class Trillion extends Component {
  render() {
    return (
      <View>
        <Svg height="850" width="850">
          <Image
            width="300"
            height="300"
            transform="matrix(0.7776 0 0 0.7733 0 0)"
            href={{
              uri:
                'https://www.plant-for-the-planet.org/bundles/pftpbilliontree/images/zaehler-bg-himmel.png'
            }}
          />
          <Path
            ref="CloudSmall01"
            fill="#fff"
            stroke="#CBCACB"
            stroke-miterlimit="10"
            d="M332.9 136.7c6.3-3.4 3.9-20.4-11-20.4.5-3.2-1.4-7.5-6.7-6.2-5.4 1.3-10.8 17.1-.7 18-.4 3.7.2 7.4 6.2 10.2-.7 7.6 4.4 7.5 4.4 7.6-2.7 10 12.1 6.4 6.8 1.1 3.1-4.5 2.4-6.5 1-10.3z"
          />
        </Svg>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            {i18n.t('label.logged_in')}
            {' ' + i18n.t('name.label')}
          </Text>
        </View>
      </View>
    );
  }
}

const skyBlue = '#F5FCFF';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: skyBlue
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

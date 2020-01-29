import * as React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import StaticTabbar from './StaticTabbar';

// eslint-disable-next-line react/prefer-stateless-function
export default class Tabbar extends React.PureComponent {
  render() {
    const { width } = Dimensions.get('window');
    const height = 64;
    const tabs = [
      {
        id: 0,
        name: 'earth',
        title: 'World',
        route: 'app_homepage'
      },
      {
        id: 1,
        name: 'gift-outline',
        title: 'Gift',
        route: 'app_giftTrees'
      },
      {
        id: 2,
        name: 'heart-outline',
        title: 'Donate',
        route: 'app_donateTrees'
      },
      {
        id: 3,
        name: 'crown',
        title: 'Compete',
        route: 'app_competitions'
      },
      {
        id: 4,
        name: 'account-outline',
        title: 'Me',
        route: 'app_userHome'
      }
    ];
    return (
      <>
        <View {...{ height, width }}>
          <View style={StyleSheet.absoluteFill}>
            <StaticTabbar {...{ tabs }} navigation={this.props.navigation} />
          </View>
        </View>
        <SafeAreaView style={styles.container} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  }
});

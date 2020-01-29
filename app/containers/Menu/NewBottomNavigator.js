import * as React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View } from 'react-native';
import StaticTabbar from './StaticTabbar';
import i18n from '../../locales/i18n';

// eslint-disable-next-line react/prefer-stateless-function
export default class Tabbar extends React.PureComponent {
  render() {
    const { width } = Dimensions.get('window');
    const height = 64;
    const tabs = [
      {
        id: 0,
        name: 'earth',
        title: i18n.t('label.menu_world'),
        route: 'app_homepage'
      },
      {
        id: 1,
        name: 'gift-outline',
        title: i18n.t('label.gift'),
        route: 'app_giftTrees'
      },
      {
        id: 2,
        name: 'heart-outline',
        title: i18n.t('label.donate'),
        route: 'app_donateTrees'
      },
      {
        id: 3,
        name: 'crown',
        title: i18n.t('label.compete'),
        route: 'app_competitions'
      },
      {
        id: 4,
        name: 'account-outline',
        title: i18n.t('label.me'),
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

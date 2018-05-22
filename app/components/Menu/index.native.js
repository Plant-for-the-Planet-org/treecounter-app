import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableNativeFeedback,
  ScrollView,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import MenuGroup from './MenuItem.native';
import PropTypes, { func } from 'prop-types';
import { updateRoute } from '../../helpers/routerHelper';

export default class Menu extends Component {
  static propTypes = {
    menuData: PropTypes.array.isRequired,
    onPress: PropTypes.func
  };

  //TODO hkurra
  //Ideally this should be in the container but for now to keep the same container for both web and app it's better to keep it here
  onPressMenu = item => {
    const { dispatch } = this.props.navigation;
    console.log('clicked ', item, dispatch);
    updateRoute(item.uri, dispatch, 0);
  };

  render() {
    return (
      <SafeAreaView style={styles.outerContainer}>
        <ScrollView>
          <View style={styles.imageStyle}>
            <Image
              source={require('../../../web/images/side_menu_image.png')}
            />
          </View>
          {this.props.menuData.map(element => (
            <MenuGroup
              title={element.caption}
              key={element.sequence}
              menuItems={element.menuItems}
              onPress={this.onPressMenu}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export const styles = StyleSheet.create({
  outerContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1
  },
  imageStyle: {
    paddingLeft: 43,
    paddingBottom: 20
  }
});

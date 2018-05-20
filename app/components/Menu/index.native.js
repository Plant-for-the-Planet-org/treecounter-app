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

export default class Menu extends Component {
  onPressMenu(item) {
    console.log('cliecked me');
  }

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
              menuItems={element.menu_items}
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

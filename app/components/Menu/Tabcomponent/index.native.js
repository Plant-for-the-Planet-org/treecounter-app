import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import PropTypes, { func } from 'prop-types';
import { updateRoute } from '../../../helpers/routerHelper/tabrouteHelper.native';
import TouchableItem from '../../../components/Common/TouchableItem.native';
import * as images from '../../../assets';
import styles from '../../../styles/menu_item.native';

export default class TabComponent extends Component {
  static propTypes = {
    menuData: PropTypes.array.isRequired,
    onPress: PropTypes.func,
    userProfile: PropTypes.any
  };

  constructor(props) {
    super(props);
  }

  //TODO hkurra
  //Ideally this should be in the container but for now to keep the same container for both web and app it's better to keep it here
  onPressMenu = item => {
    const { navigation } = this.props;
    updateRoute(item.uri, navigation, 0);
  };

  render() {
    let activeElement =
      this.props.navigation &&
      this.props.navigation.state &&
      this.props.navigation.state.routes
        ? this.props.navigation.state.routes[0].routeName
        : null;
    if (
      this.props.navigation &&
      this.props.navigation.state &&
      this.props.navigation.state.index
    ) {
      activeElement = this.props.navigation.state.routes[
        this.props.navigation.state.index
      ].routeName;
    }
    return (
      <View style={styles.bottomMenuContainer}>
        {this.props.menuData &&
          this.props.menuData.map(element => (
            <TouchableItem
              onPress={() => this.onPressMenu(element)}
              key={element.caption}
              style={{ flex: 1 }}
            >
              <View style={styles.bottomMenuItemContainer}>
                <View style={styles.bottomMenuItemImage}>
                  <Image
                    style={styles.bottomMenuItemImage}
                    source={
                      activeElement === element.uri
                        ? images[element.icon + '_red']
                        : images[element.icon]
                    }
                  />
                </View>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={[
                    activeElement === element.uri
                      ? styles.selectedBottomMenuItemText
                      : styles.bottomMenuItemText
                  ]}
                >
                  {element.caption}
                </Text>
              </View>
            </TouchableItem>
          ))}
      </View>
    );
  }
}

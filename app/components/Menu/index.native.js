import React, { Component } from 'react';
import { View, Image, ScrollView, SafeAreaView, Text } from 'react-native';
import MenuGroup, { MenuItem } from './MenuItem.native';
import PropTypes, { func } from 'prop-types';
import styles from '../../styles/menu';
import { updateRoute } from '../../helpers/routerHelper';
import { close_green } from '../../assets';
import i18n from '../../locales/i18n.js';
import { getLocalRoute } from '../../actions/apiRouting';
import { getImageUrl } from '../../actions/apiRouting';

export default class Menu extends Component {
  static propTypes = {
    menuData: PropTypes.array.isRequired,
    onPress: PropTypes.func,
    userProfile: PropTypes.any
  };

  //TODO hkurra
  //Ideally this should be in the container but for now to keep the same container for both web and app it's better to keep it here
  onPressMenu = item => {
    const { navigation } = this.props;
    updateRoute(item.uri, navigation, 0);
  };

  render() {
    return (
      <SafeAreaView style={styles.outerContainer}>
        {this.props.userProfile && (
          <View style={styles.profileContainer}>
            <Image
              style={styles.profileImageStyle}
              source={{
                uri: getImageUrl(
                  'profile',
                  'thumb',
                  this.props.userProfile.image
                )
              }}
            />

            <Text style={styles.profileTextHeading}>
              {this.props.userProfile.fullname}
            </Text>
            <Text style={styles.profileText}>
              {this.props.userProfile.email}
            </Text>
          </View>
        )}
        <ScrollView>
          <View style={styles.imageStyle} />
          {this.props.menuData.map(element => (
            <MenuGroup
              title={element.caption}
              key={element.sequence}
              menuItems={element.menuItems}
              onPress={this.onPressMenu}
            />
          ))}
          <MenuItem
            onPress={() => {
              this.props.logoutUser();
            }}
            title={i18n.t('label.logout')}
            iconUrl={close_green}
          />
          <MenuItem
            onPress={() => {
              this.onPressMenu({ uri: getLocalRoute('app_faq') });
            }}
            title={i18n.t('label.faqs')}
            iconUrl={close_green}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

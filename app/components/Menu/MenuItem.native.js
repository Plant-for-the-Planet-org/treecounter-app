import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes, { func } from 'prop-types';

import * as images from '../../assets';
import i18n from '../../locales/i18n.js';
import styles from '../../styles/menu_item';
export default class MenuGroup extends Component {
  static propTypes = {
    title: PropTypes.string,
    menuItems: PropTypes.array.isRequired,
    onPress: PropTypes.func.isRequired
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.groupMenuContainer}>
          <Text style={styles.gropuTextStyle}>
            {this.props.titleId ? i18n.t('label.load') : this.props.title}
          </Text>
          <View style={styles.titleTextUnderline} />
        </View>
        {this.props.menuItems.map(menuItem => (
          <MenuItem
            onPress={() => this.props.onPress(menuItem)}
            title={menuItem.caption}
            key={'' + this.props.title + menuItem.sequence}
            iconUrl={
              menuItem.icon && menuItem.icon !== 'none'
                ? images[menuItem.icon]
                : null
            }
          />
        ))}
      </View>
    );
  }
}

class MenuItem extends Component {
  static propTypes = {
    iconUrl: PropTypes.string,
    titleId: PropTypes.any, //key it will use for localization
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired
  };

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.menuItemContainer}>
          <Image style={styles.imageStyle} source={this.props.iconUrl} />
          <Text style={styles.textStyle}>
            {this.props.titleId ? i18n.t('label.load') : this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import TouchableItem from '../../components/Common/TouchableItem';
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

export class MenuItem extends Component {
  static propTypes = {
    iconUrl: PropTypes.any,
    titleId: PropTypes.any, //key it will use for localization
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired
  };

  render() {
    return (
      <TouchableItem onPress={this.props.onPress}>
        <View style={styles.menuItemContainer}>
          <Image
            resizeMode="contain"
            style={styles.imageStyle}
            source={this.props.iconUrl}
          />
          <Text style={styles.textStyle}>
            {this.props.titleId ? i18n.t('label.load') : this.props.title}
          </Text>
        </View>
      </TouchableItem>
    );
  }
}

export class LargeMenuItem extends Component {
  static propTypes = {
    iconUrl: PropTypes.any,
    titleId: PropTypes.any, //key it will use for localization
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired,
    style: PropTypes.any
  };

  render() {
    return (
      <TouchableItem onPress={this.props.onPress}>
        {this.props.details ? (
          <View style={[styles.largeMenuItemContainer, this.props.style]}>
            <Image
              resizeMode="contain"
              style={styles.largeImageStyle}
              source={this.props.iconUrl}
            />
            <View style={styles.textGroupContainer}>
              <Text style={styles.titleStyle}>
                {this.props.titleId ? i18n.t('label.load') : this.props.title}
              </Text>
              <Text style={styles.largeTextStyle}>{this.props.details}</Text>
            </View>
          </View>
        ) : (
          <View style={[styles.largeMenuItemContainer, this.props.style]}>
            <Image
              resizeMode="contain"
              style={styles.largeImageStyle}
              source={this.props.iconUrl}
            />
            <View style={styles.textGroupContainer}>
              <Text style={styles.largeTextStyle}>
                {this.props.titleId ? i18n.t('label.load') : this.props.title}
              </Text>
            </View>
          </View>
        )}
      </TouchableItem>
    );
  }
}

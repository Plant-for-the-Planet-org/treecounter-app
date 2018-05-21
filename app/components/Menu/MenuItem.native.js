import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes, { func } from 'prop-types';

import * as images from '../../images';

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
            {this.props.titleId ? 'Load from T()' : this.props.title}
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
            {this.props.titleId ? 'Load from T()' : this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 40,
    paddingBottom: 10
  },
  menuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 3,
    paddingBottom: 10
  },
  groupMenuContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 10
  },
  imageStyle: {
    width: 17,
    height: 18,
    resizeMode: 'center'
  },
  textStyle: {
    paddingLeft: 5,
    fontSize: 11,
    color: '#6a6161'
  },
  gropuTextStyle: {
    fontWeight: '600',
    fontSize: 11,
    color: '#6a6161',
    marginBottom: 8
  },
  titleTextUnderline: {
    height: 2,
    width: 25,
    backgroundColor: '#b9d384',
    marginLeft: 2
  }
});

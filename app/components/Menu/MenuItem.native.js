import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native';
import PropTypes, { func } from 'prop-types';

export default class MenuGroup extends Component {
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
            onPress={() => console.log('test1')}
            title={menuItem.caption}
            key={'' + this.props.title + menuItem.sequence}
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
          <Image
            style={styles.imageStyle}
            source={
              this.props.iconUrl
                ? this.props.iconUrl
                : require('../../images/key.png')
            }
          />
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

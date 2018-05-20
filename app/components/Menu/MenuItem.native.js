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

export default class MenuItem extends Component {
  static propTypes = {
    iconUrl: PropTypes.string,
    titleId: PropTypes.any, //key it will use for localization
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired
  };

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.outerContainer}>
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
  outerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 40,
    paddingBottom: 32
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
  }
});

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
    titleId: PropTypes.object, //key it will use for localization
    title: PropTypes.string,
    onPress: PropTypes.func.isRequired
  };

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.containerStyle}>
          {this.props.iconUrl ? (
            <Image style={styles.imageStyle} source={this.props.iconUrl} />
          ) : null}
          <Text>{this.props.titleId ? 'Load from T()' : this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20
  },
  imageStyle: {
    width: 26,
    height: 26,
    resizeMode: 'center'
  }
});

import React from 'react';
import PropTypes from 'prop-types';
import { checkedIcon, uncheckedIcon } from '../../../assets';
import { View, Text, TouchableOpacity, Image } from 'react-native';

class CheckBox extends React.Component {
  containerStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    flex: 1
  };
  imageStyle = {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain'
  };

  textboxStyle = {
    flex: 1
  };
  onValueChange = data => {
    this.props.onValueChange(this.props.checkBoxState);
  };
  render() {
    return (
      <View style={this.containerStyle}>
        <TouchableOpacity onPress={this.onValueChange}>
          {this.props.value ? (
            <Image style={this.imageStyle} source={checkedIcon} />
          ) : (
            <Image style={this.imageStyle} source={uncheckedIcon} />
          )}
        </TouchableOpacity>
        {this.props.title && (
          <Text style={this.textboxStyle}>{this.props.title}</Text>
        )}
      </View>
    );
  }
}

CheckBox.PropTypes = {
  title: PropTypes.string,
  checkBoxState: PropTypes.bool.isRequired,
  onValueChange: PropTypes.func.isRequired
};
export default CheckBox;

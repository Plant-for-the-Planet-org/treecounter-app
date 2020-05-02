import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { chevron_right } from '../../assets';
import TouchableItem from './TouchableItem.native';
import { Image } from 'react-native';

class ArrowButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };
  }

  handleArrowButtonClick() {
    const toogle = !this.state.toggle;
    this.setState({ toggle: toogle });
    this.props.onToggle(toogle);
  }

  render() {
    return (
      <TouchableItem
        style={{ width: '100%', height: '100%' }}
        onPress={() => this.handleArrowButtonClick()}
      >
        <Image
          style={{ width: '100%', height: '100%' }}
          source={chevron_right}
        />
      </TouchableItem>
    );
  }
}

ArrowButton.propTypes = {
  onToggle: PropTypes.func
};

export default ArrowButton;

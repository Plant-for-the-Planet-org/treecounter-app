import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { chevron_right } from '../../assets';

class ArrowButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };
  }

  handleArrowButtonClick() {
    this.setState({ toggle: !this.state.toggle });
    this.props.onToggle(!this.state.toggle);
  }

  render() {
    let arrowStyles = {
      transform: 'rotate(90deg)'
    };
    return (
      <button
        className="arrow-button-rotatable"
        onClick={() => this.handleArrowButtonClick()}
      >
        <img src={chevron_right} style={this.state.toggle ? arrowStyles : {}} />
      </button>
    );
  }
}

ArrowButton.propTypes = {
  onToggle: PropTypes.func
};

export default ArrowButton;

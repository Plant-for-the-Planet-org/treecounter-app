import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ArrowButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    }
  }

  handleArrowButtonClick() {
    this.setState({ toggle: !this.state.toggle });
    this.props.onToggle(!this.state.toggle);
  }

  render() {
    let arrowIcon = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Ic_play_arrow_48px.svg/2000px-Ic_play_arrow_48px.svg.png";
    let arrowStyles = {
      transform: "rotate(90deg)"
    };
    return <button className="arrow-button-rotatable" onClick={() => this.handleArrowButtonClick()}>
      <img src={arrowIcon} style={this.state.toggle ? arrowStyles: {}} />
    </button>;
  }
}

ArrowButton.propTypes = {
  onToggle: PropTypes.func,
}

export default ArrowButton;

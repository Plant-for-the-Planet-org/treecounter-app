import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Popover extends Component {
  constructor() {
    super();
    this.state = {
      focused: false
    };
    this.PopoverClicked = this.PopoverClicked.bind(this);
    this.PopoverBlurred = this.PopoverBlurred.bind(this);
    this.PopoverFocused = this.PopoverFocused.bind(this);
  }

  PopoverClicked() {
    if (!this.state.focused) this.refs.popover.focus();
    else this.setState({ focused: false });
  }

  PopoverBlurred() {
    this.setState({ focused: false });
  }

  PopoverFocused() {
    this.setState({ focused: true });
  }

  render() {
    const { button, children } = this.props;
    return (
      <div className="pftp-popover">
        <div className="pftp-popover__button" onClick={this.PopoverClicked}>
          {button}
        </div>
        <div
          className="pftp-popover__container"
          ref="popover"
          tabIndex="0"
          onBlur={this.PopoverBlurred}
          onFocus={this.PopoverFocused}
        >
          {children}
        </div>
      </div>
    );
  }
}

Popover.propTypes = {
  children: PropTypes.array,
  button: PropTypes.array
};

export default Popover;

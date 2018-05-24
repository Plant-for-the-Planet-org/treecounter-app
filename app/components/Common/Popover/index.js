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

  CalculatePopoverPosition() {
    let popoverButtonRect = this.refs.popover_button.getBoundingClientRect();
    this.popoverPosition = window.innerWidth - popoverButtonRect.right;
  }

  PopoverClicked() {
    this.refs.popover.focus();
    this.CalculatePopoverPosition();
  }

  PopoverBlurred() {
    this.refs.popover.blur();
    this.setState({ focused: false });
  }

  PopoverFocused() {
    this.setState({ focused: true });
  }

  render() {
    const { button, children } = this.props;
    return (
      <div className="pftp-popover">
        <div
          ref="popover_button"
          className={
            'pftp-popover__button ' + (this.state.focused ? 'focus' : '')
          }
          onClick={this.PopoverClicked}
        >
          {button}
        </div>
        <div
          className="pftp-popover__container"
          ref="popover"
          tabIndex="0"
          onBlur={this.PopoverBlurred}
          onFocus={this.PopoverFocused}
          style={this.state.focused ? { right: this.popoverPosition } : null}
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

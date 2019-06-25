import React from 'react';
import PropTypes from 'prop-types';

export function withHover(Component, wrapperStyle = {}, propName = 'hovering') {
  class WithHover extends React.Component {
    state = { hovering: false };
    mouseOver = () => this.setState({ hovering: true });
    mouseOut = () => this.setState({ hovering: false });
    render() {
      const {
        style,
        hoveredBackgroundColor,
        forwardedRef,
        ...rest
      } = this.props;
      const props = {
        [propName]: this.state.hovering,
        ...rest
      };

      return (
        <div
          onMouseOver={this.mouseOver}
          onMouseOut={this.mouseOut}
          style={wrapperStyle}
        >
          <Component
            ref={forwardedRef}
            {...props}
            style={{
              ...style,
              backgroundColor:
                this.state.hovering && !!hoveredBackgroundColor
                  ? hoveredBackgroundColor
                  : (style && style.backgroundColor) || 'unset'
            }}
          />
        </div>
      );
    }
  }

  WithHover.defaultProps = {};
  WithHover.propTypes = {
    style: PropTypes.any,
    hoveredBackgroundColor: PropTypes.string,
    forwardedRef: PropTypes.any
  };

  //forwardRef is something new to React version 16.6
  return React.forwardRef((props, ref) => {
    return <WithHover {...props} forwardedRef={ref} />;
  });
}

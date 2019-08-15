import React from 'react';
import PropTypes from 'prop-types';

export default class CarouselNavigation extends React.Component {
  render() {
    const { onClick, src, styleName } = this.props;
    return <img className={styleName} src={src} onClick={onClick} />;
  }
}

CarouselNavigation.propTypes = {
  onClick: PropTypes.func,
  styleName: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
};

import React from 'react';
import PropTypes from 'prop-types';
import TransparentButton from '../Button/TransparentButton';

const TextSpan = ({ onPress, children, strong }) => (
  <div className={'pftp-text-span ' + (strong ? 'bold' : '')}
    onClick={() => onPress()}
  >
    {onPress ?
      <TransparentButton onClick={onPress}>
        {children}
      </TransparentButton>
      : children
    }
  </div>
);

TextSpan.propTypes = {
  children: PropTypes.node,
  strong: PropTypes.bool,
  onPress: PropTypes.func
};

export default TextSpan;

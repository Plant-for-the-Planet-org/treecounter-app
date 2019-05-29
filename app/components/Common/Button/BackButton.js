import React from 'react';
import PropTypes from 'prop-types';
import TransparentButton from './TransparentButton';
import { arrow_left_orange_outline } from '../../../assets';

const BackButton = ({ onClick, children, className }) => (
  <div
    className={'pftp-button-back__container ' + className}
    onClick={() => onClick()}
  >
    <TransparentButton onClick={onClick}>
      <img src={arrow_left_orange_outline} />
      {children}
    </TransparentButton>
  </div>
);

BackButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default BackButton;

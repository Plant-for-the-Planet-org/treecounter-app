import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SeeMoreToggle = ({ seeMore, onToggle }) => {
  return (
    <div className="see-more-toggle__container">
      <div className={seeMore ? 'collapsed' : 'expanded'}>
        <span onClick={() => onToggle()}>
          {seeMore ? 'link.label.see_more' : 'link.label.see_less'}
        </span>
      </div>
    </div>
  );
};

SeeMoreToggle.propTypes = {
  seeMore: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default SeeMoreToggle;

import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n';
const SeeMoreToggle = ({ seeMore, onToggle }) => {
  return (
    <div className="see-more-toggle__container">
      <div className={seeMore ? 'collapsed' : 'expanded'}>
        <span onClick={() => onToggle()}>
          {seeMore ? '+ ' + i18n.t('label.see_more') : i18n.t('label.see_less')}
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

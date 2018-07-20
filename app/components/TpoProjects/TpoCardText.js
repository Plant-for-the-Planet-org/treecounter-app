import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n.js';

const TpoCardText = props => {
  const { name, tponame, cardtext } = props;

  return (
    <div className={name}>
      <span className="tpo_box_span">{tponame}</span>
      <img
        src="http://azoom-sites.rockthemes.net/abboxed/wp-content/uploads/sites/14/2015/05/abboxed-restaurant-portfolio2.jpg"
        alt="First Slide"
      />
      <p className="name_tag">{cardtext.region}</p>
      <div className="middle_tag">
        <span className="col-md-8 text-left">{i18n.t('label.planted')}: </span>{' '}
        <span className="col-md-4 text-right">{cardtext.countPlanted}</span>
      </div>
      <div className="middle_tag">
        <span className="col-md-8 text-left">{i18n.t('label.target')}:</span>{' '}
        <span className="text-right col-md-4">{cardtext.countTarget}</span>
      </div>
      <div className="middle_tag">
        <span className="col-md-8 text-left">
          {i18n.t('label.survival_rate')}:
        </span>{' '}
        <span className="text-right col-md-4">{cardtext.survivalRate}</span>
      </div>
      <div className="middle_tag">
        <span className="col-md-8 text-left">{i18n.t('label.certified')}:</span>{' '}
        <span className="text-right col-md-4">
          {cardtext.isCertified
            ? i18n.t('label.certified')
            : i18n.t('label.nonCertified')}
        </span>
      </div>
      <div className="middle_tag1">
        <span className="col-md-8 text-left">{i18n.t('label.Cost')}:</span>{' '}
        <span className="text-right col-md-4">{cardtext.treeCost}</span>
      </div>
    </div>
  );
};

TpoCardText.propTypes = {
  name: PropTypes.any.isRequired,
  cardtext: PropTypes.any.isRequired,
  tponame: PropTypes.string.isRequired
};

export default TpoCardText;

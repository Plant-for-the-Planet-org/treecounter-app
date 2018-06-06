import React from 'react';
import DonateTreesCardText from './DonateTreesCardText';
import DonateTreesCardFooter from './DonateTreesCardFooter';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n.js';
let lng = 'en';

const DonateTreesCardLayout = props => {
  const { value, userTpos } = props;
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mt-4">
      <div className="card card-inverse card-info">
        <img
          className="card-img-top"
          src="http://success-at-work.com/wp-content/uploads/2015/04/free-stock-photos.gif"
        />
        <div className="card-block">
          <h4
            title={
              value.name +
              ' ' +
              i18n.t('label.donateTreeslabels.by', { lng }) +
              ' ' +
              userTpos[value.tpoId].name
            }
            className="card-title"
          >
            {value.name} by {userTpos[value.tpoId].name}
          </h4>
          <DonateTreesCardText value={value} />
        </div>
        <DonateTreesCardFooter value={value} />
      </div>
    </div>
  );
};

DonateTreesCardLayout.propTypes = {
  userTpos: PropTypes.object.isRequired,
  value: PropTypes.object.isRequired
};

export default DonateTreesCardLayout;

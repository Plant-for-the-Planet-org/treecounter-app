import React from 'react';
import DonateTreesCardText from './DonateTreesCardText';
import DonateTreesCardFooter from './DonateTreesCardFooter';
import PropTypes from 'prop-types';

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
            title={value.name + ' by ' + userTpos[value.tpo_id].name}
            className="card-title"
          >
            {value.name} by {userTpos[value.tpo_id].name}
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

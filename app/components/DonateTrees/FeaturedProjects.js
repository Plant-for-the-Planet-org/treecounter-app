import React from 'react';
import PropTypes from 'prop-types';
import DonateTreesCardLayout from './DonateTreesCardLayout';
import i18n from '../../locales/i18n.js';

const FeaturedProjects = props => {
  const { plantProjects, userTpos } = props;

  let prev = plantProjects.map(arr => arr);
  let donated = [];
  prev.map((value, index) => {
    if (value != undefined) {
      if (value[i18n.t('label.is_certified')]) {
        donated.push(
          <div className="item featured" key={index}>
            <DonateTreesCardLayout value={value} userTpos={userTpos} />
          </div>
        );
      }
    }
  });
  return donated;
};

FeaturedProjects.propTypes = {
  plantProjects: PropTypes.array.isRequired,
  userTpos: PropTypes.object.isRequired
};

export default FeaturedProjects;

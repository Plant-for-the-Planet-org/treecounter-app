import React from 'react';
import DonateTreesCardTextLabel from './DonateTreesCardTextLabel';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n.js';

const DonateTreesCardText = props => {
  const { value } = props;
  return (
    <div className="card-text">
      <DonateTreesCardTextLabel
        label={i18n.t('label.planted')}
        counter={value.countPlanted}
      />
      <DonateTreesCardTextLabel
        label={i18n.t('label.target')}
        counter={value.countTarget}
      />
      <DonateTreesCardTextLabel
        label={i18n.t('label.treeCost')}
        counter={value.treeCost}
      />
      <p>
        {value.isCertified
          ? `${i18n.t('label.certified')}`
          : `${i18n.t('label.nonCertified')}`}
      </p>
    </div>
  );
};

DonateTreesCardText.propTypes = {
  value: PropTypes.object.isRequired
};

export default DonateTreesCardText;

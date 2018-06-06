import React from 'react';
import DonateTreesCardTextLabel from './DonateTreesCardTextLabel';
import PropTypes from 'prop-types';
import i18n from '../../locales/i18n.js';
let lng = 'en';

const DonateTreesCardText = props => {
  const { value } = props;
  return (
    <div className="card-text">
      <DonateTreesCardTextLabel
        label={i18n.t('label.donateTreeslabels.planted', { lng })}
        counter={value.countPlanted}
      />
      <DonateTreesCardTextLabel
        label={i18n.t('label.donateTreeslabels.target', { lng })}
        counter={value.countTarget}
      />
      <DonateTreesCardTextLabel
        label={i18n.t('label.donateTreeslabels.treeCost', { lng })}
        counter={value.treeCost}
      />
      <p>
        {value.isCertified
          ? `${i18n.t('label.donateTreeslabels.certified', { lng })}`
          : `${i18n.t('label.donateTreeslabels.nonCertified', { lng })}`}
      </p>
    </div>
  );
};

DonateTreesCardText.propTypes = {
  value: PropTypes.object.isRequired
};

export default DonateTreesCardText;

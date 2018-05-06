import React from 'react';
import * as constants from '../../SupportedLanguages/en';
import DonateTreesCardTextLabel from './DonateTreesCardTextLabel';
import PropTypes from 'prop-types';

const DonateTreesCardText = props => {
  const { value } = props;
  return (
    <div className="card-text">
      <DonateTreesCardTextLabel
        label={constants.formStrings.planted}
        counter={value.count_planted}
      />
      <DonateTreesCardTextLabel
        label={constants.formStrings.target}
        counter={value.count_target}
      />
      <DonateTreesCardTextLabel
        label={constants.formStrings.treeCost}
        counter={value.tree_cost}
      />
      <p>
        {value.is_certified
          ? `${constants.formStrings.certified}`
          : `${constants.formStrings.nonCertified}`}
      </p>
    </div>
  );
};

DonateTreesCardText.propTypes = {
  value: PropTypes.object.isRequired
};

export default DonateTreesCardText;

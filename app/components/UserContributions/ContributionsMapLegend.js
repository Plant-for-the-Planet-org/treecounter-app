import React from 'react';
import * as constants from '../../SupportedLanguages/en';

const ContributionsMapLegend = () => (
  <div className="text-center user-contributions__location--icons">
    <div className="user-contributions__location--icons--container">
      <img
        className="user-contributions__location--icons--img"
        src="/client108/assets/icons/orange.png"
      />
      <span>{constants.formStrings.singleTree}</span>
    </div>
    <div className="user-contributions__location--icons--container">
      <img
        className="user-contributions__location--icons--img"
        src="/client108/assets/icons/blue.png"
      />
      <span>{constants.formStrings.severalTrees}</span>
    </div>
    <div className="user-contributions__location--icons--container">
      <img
        className="user-contributions__location--icons--img"
        src="/client108/assets/icons/green.png"
      />
      <span>{constants.formStrings.donateTrees}</span>
    </div>
  </div>
);

export default ContributionsMapLegend;

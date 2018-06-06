import React from 'react';
import { MapPinRed, MapPinBlue, MapPinGreen } from '../../assets';
import TextSpan from '../Common/Text/TextSpan';
import i18n from '../../locales/i18n.js';
let lng = 'en';

const ContributionsMapLegend = () => (
  <div className="user-contributions__location--icons">
    <img className="user-contributions__location--icons--img" src={MapPinRed} />
    <TextSpan>
      {i18n.t('label.userContributionslabels.singleTree', { lng })}
    </TextSpan>
    <img
      className="user-contributions__location--icons--img"
      src={MapPinBlue}
    />
    <TextSpan>
      {i18n.t('label.userContributionslabels.severalTrees', { lng })}
    </TextSpan>
    <img
      className="user-contributions__location--icons--img"
      src={MapPinGreen}
    />
    <TextSpan>
      {i18n.t('label.userContributionslabels.donateTrees', { lng })}
    </TextSpan>
  </div>
);

export default ContributionsMapLegend;

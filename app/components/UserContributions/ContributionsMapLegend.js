import React from 'react';
import { MapPinRed, MapPinBlue, MapPinGreen } from '../../assets';
import TextSpan from '../Common/Text/TextSpan';
import i18n from '../../locales/i18n.js';

const ContributionsMapLegend = () => (
  <div className="user-contributions__location--icons">
    <img className="user-contributions__location--icons--img" src={MapPinRed} />
    <TextSpan>{i18n.t('label.singleTree')}</TextSpan>
    <img
      className="user-contributions__location--icons--img"
      src={MapPinBlue}
    />
    <TextSpan>{i18n.t('label.severalTrees')}</TextSpan>
    <img
      className="user-contributions__location--icons--img"
      src={MapPinGreen}
    />
    <TextSpan>{i18n.t('label.donateTrees')}</TextSpan>
  </div>
);

export default ContributionsMapLegend;

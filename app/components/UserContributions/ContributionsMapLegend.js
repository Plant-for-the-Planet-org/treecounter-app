import React, { lazy } from 'react';
import { MapPinRed, MapPinBlue, MapPinGreen } from '../../assets';

const TextSpan = lazy(() => import('../Common/Text/TextSpan'));
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
    <TextSpan>{i18n.t('label.donatedTrees')}</TextSpan>
  </div>
);

export default ContributionsMapLegend;

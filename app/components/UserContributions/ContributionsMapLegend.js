import React from 'react';
import * as constants from '../../SupportedLanguages/en';
import { MapPinRed, MapPinBlue, MapPinGreen } from '../../assets';
import TextSpan from '../Common/Text/TextSpan';

const ContributionsMapLegend = () => (
  <div className="user-contributions__location--icons">
    <img className="user-contributions__location--icons--img" src={MapPinRed} />
    <TextSpan>{constants.formStrings.singleTree}</TextSpan>
    <img
      className="user-contributions__location--icons--img"
      src={MapPinBlue}
    />
    <TextSpan>{constants.formStrings.severalTrees}</TextSpan>
    <img
      className="user-contributions__location--icons--img"
      src={MapPinGreen}
    />
    <TextSpan>{constants.formStrings.donateTrees}</TextSpan>
  </div>
);

export default ContributionsMapLegend;

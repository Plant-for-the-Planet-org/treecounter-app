import React from 'react';

/**

const a = [
  '',
  'one ',
  'two ',
  'three ',
  'four ',
  'five ',
  'six ',
  'seven ',
  'eight ',
  'nine ',
  'ten ',
  'eleven ',
  'twelve ',
  'thirteen ',
  'fourteen ',
  'fifteen ',
  'sixteen ',
  'seventeen ',
  'eighteen ',
  'nineteen '
];
const b = [
  '',
  '',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety'
];

const inWords = function(num) {
  if ((num = num.toString()).length > 9) return 'overflow';
  let n = ('000000000' + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return;
  let str = '';
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore '
      : '';
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh '
      : '';
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand '
      : '';
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred '
      : '';
  str +=
    n[5] != 0
      ? (str != '' ? 'and ' : '') +
        (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]])
      : '';
  return str;
};
 */

const PlantProjectTemplate = function(itemIndex) {
  return function(locals) {
    return (
      <div>
        <div key={'project_item' + itemIndex}>
          {/* <div className="item-header">
            {i18n.t('label.project')} {inWords(itemIndex + 1)}
          </div> */}
          <div
            className={'project-teaser'}
            key={'project_item_teaser' + itemIndex}
          >
            <div className="project-teaser-item">
              {locals.inputs.name}
              {locals.inputs.countTarget}
              {locals.inputs.survivalRate}
            </div>
            <div className="project-teaser-item">
              {locals.inputs.imageFile}
              {locals.inputs.treeCost}
              {locals.inputs.currency}
            </div>
            <div className="separator" />
          </div>

          <div className="project-sub-item">
            {/* <div className="sub-item-header">{i18n.t('label.Location')}</div> */}
            {/* {locals.inputs.country}  */}
            {locals.inputs.location}
            {locals.inputs.geoLocation}
            <div className="separator" />
          </div>

          <div className="project-sub-item">
            {/* <div className="sub-item-header">{i18n.t('label.description')}</div> */}
            <div className="tComb-template__about-me-form">
              <i>{locals.inputs.description}</i>
              <div>
                {locals.inputs.url}
                {locals.inputs.linkText}
              </div>
            </div>
            <div className="separator" />
          </div>

          <div className="project-sub-item">
            {/* <div className="sub-item-header">{i18n.t('label.gallery')}</div> */}
            {locals.inputs.plantProjectImages}
            <div className="separator" />
          </div>

          <div className="project-sub-item">
            {/* <div className="sub-item-header">{i18n.t('label.video')}</div> */}
            {locals.inputs.videoUrl}
          </div>
          <div className="project-sub-item">{locals.inputs.allowDonations}</div>
          <div className="project-sub-item">{locals.inputs.isPublished}</div>
        </div>
      </div>
    );
  };
};

export default PlantProjectTemplate;

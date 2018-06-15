import React from 'react';
import PrimaryButton from '../../components/Common/Button/PrimaryButton';
import i18n from '../../locales/i18n.js';

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

const PlantProjectListTemplate = function(title) {
  return function(locals) {
    return (
      <div>
        <div>
          {locals.items.map(function(item) {
            let itemIndex = 0;
            let itemPath = item.input.props.ctx.path;
            if (itemPath) {
              itemIndex = itemPath[itemPath.length - 1];
            }

            return (
              <div key={item.key} className="plant-project__item">
                <div className="item-header">
                  Project {inWords(itemIndex + 1)}
                </div>
                {item.input}
                <PrimaryButton
                  onClick={() => {
                    console.log('new value', locals.items);
                    console.log('Item new value', item.input.props.value);
                    item.input.props.onChange(
                      item.input.props.value,
                      item.input.props.ctx.path
                    );
                  }}
                >
                  {i18n.t('label.save_changes')}
                </PrimaryButton>
                {item.buttons.map(function(button, i) {
                  switch (button.type) {
                    case 'remove': {
                      return (
                        <div
                          key={i}
                          onClick={button.click}
                          className="delete-project"
                        >
                          delete project
                        </div>
                      );
                    }
                  }
                })}
              </div>
            );
          })}
        </div>
        <div className="pftp-addbutton">
          <button onClick={locals.add.click}>+&nbsp;{i18n.t(title)}</button>
        </div>
      </div>
    );
  };
};

export default PlantProjectListTemplate;

import React from 'react';
import PrimaryButton from '../../components/Common/Button/PrimaryButton';
import i18n from '../../locales/i18n.js';

const PlantProjectListTemplate = function(title) {
  return function(locals) {
    return (
      <div>
        <div>
          {locals.items.map(function(item) {
            return (
              <div key={item.key} className="plant-project__item">
                <div className="item-header">Project </div>
                {item.input}
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

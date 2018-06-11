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
                <PrimaryButton
                  onClick={() => {
                    this.toggleConfirmProfileDeletion();
                  }}
                >
                  {i18n.t('label.save_changes')}
                </PrimaryButton>
                <div className="delete-project">delete project</div>
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

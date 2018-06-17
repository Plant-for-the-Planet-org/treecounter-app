import React from 'react';
import i18n from '../../locales/i18n.js';
import { attention } from '../../assets';

const PlantProjectImageListTemplate = function(title) {
  return function(locals) {
    console.log('PlantProjectImageListTemplate', locals);
    return (
      <div>
        <div>
          {locals.items.map(function(item) {
            return (
              <div key={item.key} className="image-gallery-container">
                {item.input}
                {item.buttons.map(function(button, i) {
                  switch (button.type) {
                    case 'remove': {
                      return (
                        <div
                          key={i}
                          onClick={button.click}
                          className="delete-image"
                        >
                          <img src={attention} />
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

export default PlantProjectImageListTemplate;

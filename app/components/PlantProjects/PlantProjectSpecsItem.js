import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import { delimitNumbers } from '../../utils/utils';
import i18n from '../../locales/i18n';

const PlantProjectSpecsItem = ({ label, value, icon, rightIcon }) => {
  return (
    <div className="project-specs__item">
      {icon ? <img src={icon} /> : null}
      <div>{label}</div>
      {rightIcon ? (
        <div className="tooltip">
          <a data-tip data-for="survival-rate">
            <img src={rightIcon} />
          </a>

          <ReactTooltip id="survival-rate" effect="solid" type="dark">
            <span className="tooltip-text">
              {i18n.t('label.survival_explaination')}
            </span>
          </ReactTooltip>
        </div>
      ) : null}
      <div className="project-specs__item__value">
        {typeof value == 'number' ? delimitNumbers(parseFloat(value)) : value}
      </div>
    </div>
  );
};

PlantProjectSpecsItem.propTypes = {
  icon: PropTypes.any,
  rightIcon: PropTypes.any,
  value: PropTypes.any,
  label: PropTypes.string
};

export default PlantProjectSpecsItem;

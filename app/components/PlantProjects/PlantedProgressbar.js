import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../locales/i18n';
import { targetPlanted } from '../../assets';
import { delimitNumbers } from '../../utils/utils';

class PlantedProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { countPlanted, countTarget } = this.props;
    let treePlantedRatio = (countPlanted / countTarget).toFixed(2);
    treePlantedRatio = parseFloat(treePlantedRatio);
    let treeCountWidth;
    if (treePlantedRatio > 1) {
      treeCountWidth = 100;
    } else if (treePlantedRatio < 0) {
      treeCountWidth = 0;
    } else {
      treeCountWidth = treePlantedRatio * 100;
    }
    return (
      <div className="planted-project-progressbar" style={{ display: 'block' }}>
        <div className="tree-planted-container">
          <div
            className={
              treeCountWidth > 0 ? 'tree-width-container' : 'empty-tree-count'
            }
            style={{
              width: treeCountWidth + '%',
              display: 'block',
              'padding-right': 0,
              position: 'absolute'
            }}
          />
          <div className="tree-count-container">
            <div className="treePlantedtextPlanted">
              {delimitNumbers(countPlanted)}
            </div>
            <div className="treePlantedtextTrees">
              {i18n.t('label.trees_planted')}
            </div>
          </div>

          {!this.props.hideTargetImage ? (
            <div className="targetContainer" style={{ 'z-index': '999' }}>
              <div className="treePlantedtext">
                {countTarget ? delimitNumbers(countTarget) : null}
              </div>

              <div className="target-icon-container">
                <img src={targetPlanted} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

PlantedProgressBar.propTypes = {
  countPlanted: PropTypes.number,
  countTarget: PropTypes.number,
  hideTargetImage: PropTypes.bool
};

export default PlantedProgressBar;

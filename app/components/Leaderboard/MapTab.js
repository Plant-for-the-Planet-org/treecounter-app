import React from 'react';
import PropTypes from 'prop-types';

export default class MapTab extends React.Component {
  render() {
    const { mapInfo } = this.props;
    return (
      <div className="map-tab__container">
        <div className="map-tab-checkboxes-row">
          {mapInfo.mapLayersKeys.map(mapLayer => (
            <div className="pftp-checkbox">
              <input className="pftp-checkbox__input" type={'checkbox'} />
              <label className={'pftp-text-span'}>
                {mapInfo.mapLayers[mapLayer]}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

MapTab.propTypes = {
  mapInfo: PropTypes.object
};

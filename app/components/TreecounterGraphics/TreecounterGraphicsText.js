import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PlantedDetails from './PlantedDetails';
import TargetComment from './TargetComment';
import ArrowButton from '../Common/ArrowButton';
import { pot, tree } from '../../assets';

class TreecounterGraphicsText extends Component {
  constructor() {
    super();
    this.state = {
      ifPlantedDetails: false,
      ifTargetComment: false
    };
  }
  render() {
    const {
      treecounterData: {
        targetYear,
        target,
        targetComment,
        planted,
        personal,
        community
      }
    } = this.props;
    return (
      <div className="svg-text-container">
        <div className="svg-text-container__row">
          <img className="svg-text-container__row--col" src={pot} />
          <div className="svg-text-container__row--col2">
            <span>
              Target by {targetYear} <br />
              <strong>{target}</strong>
              {!targetComment || targetComment === '' ? null : (
                <ArrowButton
                  onToggle={e => this.setState({ ifTargetComment: e })}
                />
              )}
            </span>
          </div>
        </div>
        {this.state.ifTargetComment ? (
          <TargetComment comment={targetComment} />
        ) : null}
        <hr className="svg-text-container__bar" />
        <div className="svg-text-container__row">
          <img className="svg-text-container__row--col" src={tree} />
          <div className="svg-text-container__row--col2">
            <span>
              Planted
              <br />
              <strong>{planted}</strong>
            </span>
          </div>
          <div className="svg-text-container__row--col2">
            <ArrowButton
              onToggle={e => this.setState({ ifPlantedDetails: e })}
            />{' '}
          </div>
        </div>
        {this.state.ifPlantedDetails ? (
          <PlantedDetails personal={personal} community={community} />
        ) : null}
      </div>
    );
  }
}

export default TreecounterGraphicsText;

TreecounterGraphicsText.propTypes = {
  treecounterData: PropTypes.object.isRequired
};

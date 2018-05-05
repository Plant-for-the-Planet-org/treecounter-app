import React, { Component } from 'react';

import PlantedDetails from './PlantedDetails';
import TargetComment from './TargetComment';
import ArrowButton from '../Common/ArrowButton';

class TreecounterGraphicsText extends Component {
  constructor(props) {
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
          <img
            className="svg-text-container__row--col"
            src="/web/images/baum_versprochen.png"
          />
          <div className="svg-text-container__row--col">
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
          <img
            className="svg-text-container__row--col"
            src="/web/images/baum.png"
          />
          <div className="svg-text-container__row--col">
            <span>
              Planted
              <ArrowButton
                onToggle={e => this.setState({ ifPlantedDetails: e })}
              />{' '}
              <br />
              <strong>{planted}</strong>
            </span>
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NumberToWords from 'number-to-words';

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

  getTwoWordString(sentence) {
    return sentence
      .split(' ')
      .slice(0, 2)
      .join(' ')
      .replace(/,/g, '');
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
              Target{' '}
              {this.props.trillion ? '' : 'by' + targetYear ? targetYear : ''}{' '}
              <br />
              <strong>{target}</strong>
              {this.props.trillion ? (
                <div>
                  {this.getTwoWordString(NumberToWords.toWords(target))}
                </div>
              ) : null}
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
              {this.props.trillion ? (
                <div>
                  {this.getTwoWordString(NumberToWords.toWords(planted))}
                </div>
              ) : null}
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

TreecounterGraphicsText.propTypes = {
  treecounterData: PropTypes.object.isRequired,
  trillion: PropTypes.bool
};

export default TreecounterGraphicsText;

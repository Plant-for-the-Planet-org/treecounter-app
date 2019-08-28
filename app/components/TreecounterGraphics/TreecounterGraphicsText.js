import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TargetComment from './TargetComment';
import ArrowButton from '../Common/ArrowButton';
import { pot, tree, tree_outline } from '../../assets';
import i18n from '../../locales/i18n.js';
import { delimitNumbers, convertNumber } from '../../utils/utils';
import PlantedDetails from './PlantedDetails';

class TreecounterGraphicsText extends Component {
  constructor() {
    super();
    this.state = {
      ifPlantedDetails: false,
      ifTargetComment: false
    };
  }

  // getTwoWordString(sentence) {
  //   return sentence
  //     .split(' ')
  //     .slice(0, 2)
  //     .join(' ')
  //     .replace(/,/g, '');
  // }

  updateState(stateVal) {
    this.setState({ ifPlantedDetails: stateVal });
    this.props.onToggle(stateVal);
  }

  render() {
    const {
      treecounterData: {
        targetYear,
        target,
        targetComment,
        planted,
        personal,
        community,
        type
      }
    } = this.props;
    let dom;
    const targetCount = convertNumber(target, 2);
    const plantedCount = convertNumber(parseInt(planted), 2);
    {
      dom = !this.state.ifPlantedDetails ? (
        <div className="svg-text-container">
          <div className="svg-text-container__row">
            <img className="svg-text-container__row--col" src={pot} />
            <div className="svg-text-container__row--col2">
              <span>
                {i18n.t('label.target') +
                  (this.props.trillion
                    ? ''
                    : targetYear
                      ? ' ' + i18n.t('label.by') + ' ' + targetYear
                      : '') +
                  ' '}
                <br />
                <strong className={targetCount.length > 12 ? 'small' : ''}>
                  {targetCount}
                </strong>
                {this.props.trillion ? (
                  <div>
                    {/* {this.getTwoWordString(NumberToWords.toWords(target))} */}
                    {target ? delimitNumbers(target) : 0}
                  </div>
                ) : null}
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
                {i18n.t('label.planted')}
                <br />
                <strong className={plantedCount.length > 12 ? 'small' : ''}>
                  {plantedCount}
                </strong>
                {this.props.trillion ? (
                  <div>
                    {/* {this.getTwoWordString(NumberToWords.toWords(planted))} */}
                    {planted ? delimitNumbers(planted) : 0}
                  </div>
                ) : null}
              </span>
            </div>
            {this.props.trillion ||
            convertNumber(parseInt(community), 2) === 0 ? null : (
              <div className="svg-text-container__row--col2">
                <ArrowButton onToggle={e => this.updateState(e)} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <PlantedDetails
          personal={convertNumber(parseInt(personal), 2)}
          community={convertNumber(parseInt(community), 2)}
          type={type}
          onToggle={e => this.updateState(false)}
        />
      );
    }
    return dom;
  }
}

TreecounterGraphicsText.propTypes = {
  treecounterData: PropTypes.object.isRequired,
  trillion: PropTypes.bool,
  onToggle: PropTypes.func
};

export default TreecounterGraphicsText;

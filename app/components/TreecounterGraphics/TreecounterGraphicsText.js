import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import NumberToWords from 'number-to-words';

import PlantedDetails from './PlantedDetails';
import TargetComment from './TargetComment';
import ArrowButton from '../Common/ArrowButton';
import { pot, tree } from '../../assets';
import i18n from '../../locales/i18n.js';

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

  convertNumber(n, d) {
    let x = ('' + n).length;
    if (x > 5) {
      let p = Math.pow;
      d = p(10, d);
      x -= x % 3;
      return (
        Math.round(n * d / p(10, x)) / d +
        [
          '',
          ' Thousand',
          ' Million',
          ' Billion',
          ' Trillion',
          ' Quadrillion',
          ' Quintillion'
        ][x / 3]
      );
    } else {
      return n;
    }
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
              {i18n.t('label.target') +
                (this.props.trillion
                  ? ''
                  : targetYear
                    ? ' ' + i18n.t('label.by') + ' ' + targetYear
                    : '') +
                ' '}
              <br />
              <strong>{this.convertNumber(target, 2)}</strong>
              {this.props.trillion ? (
                <div>
                  {/* {this.getTwoWordString(NumberToWords.toWords(target))} */}
                  {target.toLocaleString('en')}
                </div>
              ) : null}
            </span>
          </div>
          {!targetComment || targetComment === '' ? null : (
            <div className="svg-text-container__row--col2">
              <ArrowButton
                onToggle={e => this.setState({ ifTargetComment: e })}
              />{' '}
            </div>
          )}
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
              <strong>{this.convertNumber(parseInt(planted), 2)}</strong>
              {this.props.trillion ? (
                <div>
                  {/* {this.getTwoWordString(NumberToWords.toWords(planted))} */}
                  {planted.toFixed(2).toLocaleString('en')}
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

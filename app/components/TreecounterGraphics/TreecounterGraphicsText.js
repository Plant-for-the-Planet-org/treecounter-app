import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import NumberToWords from 'number-to-words';

import PlantedDetails from './PlantedDetails';
import TargetComment from './TargetComment';
import ArrowButton from '../Common/ArrowButton';
import { pot, tree } from '../../assets';
import i18n from '../../locales/i18n.js';
import ReactTooltip from 'react-tooltip';
import { questionmark_orange, close_green } from '../../assets';

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
        community,
        type
      }
    } = this.props;
    let dom;

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
                <strong>{this.convertNumber(target, 2)}</strong>
                {this.props.trillion ? (
                  <div>
                    {/* {this.getTwoWordString(NumberToWords.toWords(target))} */}
                    {target.toLocaleString('en')}
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
                <strong>{this.convertNumber(parseInt(planted), 2)}</strong>
                {this.props.trillion ? (
                  <div>
                    {/* {this.getTwoWordString(NumberToWords.toWords(planted))} */}
                    {parseInt(planted).toLocaleString('en')}
                  </div>
                ) : null}
              </span>
            </div>
            {this.props.trillion ? null : (
              <div className="svg-text-container__row--col2">
                <ArrowButton
                  onToggle={e => this.setState({ ifPlantedDetails: e })}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="svg-text-container">
          <div className="svg-text-container__row">
            <div className="svg-text-container__row--col2">
              <img
                className="smallImage"
                src={close_green}
                onClick={() => {
                  this.setState({ ifPlantedDetails: false });
                }}
              />
            </div>
          </div>

          <div className="svg-text-container__row">
            <img className="svg-text-container__row--col" src={tree} />
            <div className="svg-text-container__row--col">
              <span>
                <strong>{personal.toFixed().toLocaleString('en')}</strong>
                <span>
                  {i18n.t(
                    'individual' === type
                      ? 'label.individual_plant_personal'
                      : 'label.tpo_plant_personal'
                  )}
                </span>
              </span>
            </div>
          </div>

          <div className="svg-text-container__row">
            <img className="svg-text-container__row--col" src={tree} />
            <div className="svg-text-container__row--col">
              <span>
                <strong>
                  {community.toFixed().toLocaleString('en') + ' '}
                </strong>
                <span>
                  {i18n.t(
                    'individual' === type
                      ? 'label.individual_plant_community'
                      : 'label.tpo_individual_plant_community'
                  )}
                </span>
                <div className="tooltip">
                  <a data-tip data-for="community">
                    <img className="smallImage" src={questionmark_orange} />
                  </a>

                  <ReactTooltip id="community" effect="solid" type="dark">
                    <span className="tooltip-text">
                      Trees planted by people who made this tree counter their
                      community. Your community can be any other profile that
                      you want to support towards reaching their tree target,
                      like your school, city or employer. If you plant or donate
                      trees, these will then also appear in your community’s
                      tree-counter.
                    </span>
                  </ReactTooltip>
                </div>
              </span>
            </div>
          </div>
        </div>
      );
    }
    return dom;
  }
}

TreecounterGraphicsText.propTypes = {
  treecounterData: PropTypes.object.isRequired,
  trillion: PropTypes.bool
};

export default TreecounterGraphicsText;

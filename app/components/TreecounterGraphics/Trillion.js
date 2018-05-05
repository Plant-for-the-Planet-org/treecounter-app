import React, { Component } from 'react';
import NumberToWords from 'number-to-words';

import {
  trillionTreeMessage1,
  trillionTreeMessage2
} from '../../constants/strings';
import { trillionCampaign } from '../../actions/trillionAction';
import LoadingIndicator from '../Common/LoadingIndicator';
import SvgContainer from '../Common/SvgContainer';

class Trillion extends Component {
  constructor() {
    super();
    this.state = {
      svgData: {},
      displayName: '',
      loading: true
    };
  }

  componentWillMount() {
    trillionCampaign()
      .then(({ data }) => {
        this.setState({
          svgData: {
            id: 1,
            target: data.count_target,
            planted: data.count_planted,
            community: data.count_community,
            personal: data.count_personal
          },
          displayName: data.display_name,
          loading: false
        });
        console.log('Success: ', data);
      })
      .catch(error => console.log(error));
  }
  shouldComponentUpdate() {
    this.forceUpdate();
    return true;
  }

  getTwoWordString(sentence) {
    return sentence
      .split(' ')
      .slice(0, 2)
      .join(' ')
      .replace(/,/g, '');
  }

  render() {
    return this.state.loading ? (
      <LoadingIndicator />
    ) : (
        <div className="trillion-container sidenav-wrapper">
          <h3>{this.state.displayName}</h3>
          <h5>{trillionTreeMessage1}</h5>
          <h5>{trillionTreeMessage2}</h5>
          <div className="canvasContainer flex-column">
            <SvgContainer {...this.state.svgData} />
            <div className="trillion-svg-text">
              <div className="trillion-svg-text__row">
                <img src="/web/images/baum_versprochen.png" alt="Smiley face" />
                <span>
                  Target {this.propsctargetYear}
                  <br />
                  <strong>{this.state.svgData.target}</strong>
                  <br />
                  {this.getTwoWordString(
                    NumberToWords.toWords(this.state.svgData.target)
                  )}
                </span>
              </div>
              <div className="trillion-svg-text__row">
                <img src="/web/images/baum.png" alt="Smiley face" />
                <span>
                  Existing trees {this.propsctargetYear}
                  <br />
                  <strong>{this.state.svgData.target}</strong>
                  <br />
                  {this.getTwoWordString(
                    NumberToWords.toWords(this.state.svgData.target)
                  )}
                </span>
              </div>
              <div className="trillion-svg-text__row">
                <img src="/web/images/baum.png" alt="Smiley face" />
                <span>
                  Planted trees<br />
                  <strong>{this.state.svgData.planted}</strong>
                  <br />
                  {this.getTwoWordString(
                    NumberToWords.toWords(this.state.svgData.planted)
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default Trillion;

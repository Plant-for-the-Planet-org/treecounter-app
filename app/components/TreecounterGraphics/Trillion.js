import React, { Component } from 'react';

import {
  trillionTreeMessage1,
  trillionTreeMessage2
} from '../../constants/strings';
import { trillionCampaign } from '../../actions/trillionAction';
import LoadingIndicator from '../Common/LoadingIndicator';
import SvgContainer from '../Common/SvgContainer';
import TreecounterGraphicsText from './TreecounterGraphicsText';
import SecondaryAccentButton from '../Common/Button/SecondaryAccentButton';
import ButtonHeading from '../Common/Heading/ButtonHeading';
import { updateRoute } from '../../helpers/routerHelper';

class Trillion extends Component {
  constructor() {
    super();
    this.state = {
      svgData: {},
      displayName: '',
      loading: true
    };
  }

  componentDidMount() {
    trillionCampaign()
      .then(({ data }) => {
        this.setState({
          svgData: {
            id: 1,
            target: data.countTarget,
            planted: data.countPlanted,
            community: data.countCommunity,
            personal: data.countPersonal
          },
          displayName: data.displayName,
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

  render() {
    return this.state.loading ? (
      <LoadingIndicator />
    ) : (
      <div className="trillion-container sidenav-wrapper">
        <h3>{this.state.displayName}</h3>
        <h5>{trillionTreeMessage1}</h5>
        <h5>{trillionTreeMessage2}</h5>
        <ButtonHeading>
          <SecondaryAccentButton onClick={updateRoute.bind(this, 'app_faq')}>
            FAQs
          </SecondaryAccentButton>
        </ButtonHeading>

        <div className="canvasContainer flex-column">
          <SvgContainer {...this.state.svgData} />
          {this.state.svgData === null ? (
            <div className="circle-inside circle-headline">
              <LoadingIndicator />
            </div>
          ) : (
            <TreecounterGraphicsText treecounterData={this.state.svgData} />
          )}
        </div>
      </div>
    );
  }
}

export default Trillion;

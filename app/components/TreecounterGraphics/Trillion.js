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
import TextHeading from '../Common/Heading/TextHeading';
import TextBlock from '../Common/Text/TextBlock';

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
    return true;
  }

  render() {
    return this.state.loading ? (
      <div className="sidenav-wrapper">
        <LoadingIndicator />
      </div>
    ) : (
      <div className="sidenav-wrapper">
        <TextHeading>
          {this.state.displayName}
          <TextBlock>{trillionTreeMessage1}</TextBlock>
          <TextBlock>{trillionTreeMessage2}</TextBlock>
          <ButtonHeading>
            <SecondaryAccentButton onClick={updateRoute.bind(this, 'app_faq')}>
              FAQs
            </SecondaryAccentButton>
          </ButtonHeading>
        </TextHeading>

        <div className="canvasContainer flex-column">
          <SvgContainer {...this.state.svgData} />
          {this.state.svgData === null ? (
            <div className="circle-inside circle-headline">
              <LoadingIndicator />
            </div>
          ) : (
            <TreecounterGraphicsText
              trillion={true}
              treecounterData={this.state.svgData}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Trillion;

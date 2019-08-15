import React, { Component } from 'react';

import { trillionCampaign } from '../../actions/trillionAction';
import LoadingIndicator from '../Common/LoadingIndicator';
import SvgContainer from '../Common/SvgContainer';
import TreecounterGraphicsText from './TreecounterGraphicsText';
import SecondaryAccentButton from '../Common/Button/SecondaryAccentButton';
import ButtonHeading from '../Common/Heading/ButtonHeading';
import { updateRoute } from '../../helpers/routerHelper';
import TextHeading from '../Common/Heading/TextHeading';
import TextBlock from '../Common/Text/TextBlock';
import i18n from '../../locales/i18n.js';
import { getImageUrl } from '../../actions/apiRouting';
import { pledgeEventSelector } from '../../selectors';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Trillion extends Component {
  constructor() {
    super();
    this.state = {
      svgData: {},
      pledgeEventData: [],
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
            community: data.countReceived,
            personal: data.countPersonal
          },
          displayName: data.displayName,
          loading: false
        });
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
          <TextBlock>{i18n.t('label.trillionTreeMessage1')}</TextBlock>
          <TextBlock>{i18n.t('label.trillionTreeMessage2')}</TextBlock>
        </TextHeading>
        {this.props.pledgeEvents &&
        this.props.pledgeEvents.pledgeEvents.length > 0 ? (
          <div>
            <TextBlock>{i18n.t('label.trillionlabel')}</TextBlock>
            <div className="events_row">
              {this.props.pledgeEvents.pledgeEvents
                .sort((val1, val2) => val1.position > val2.position)
                .map(element => (
                  <div
                    key={element.slug}
                    className="event_item"
                    onClick={() => {
                      updateRoute('app_pledge', null, null, {
                        eventSlug: element.slug
                      });
                    }}
                  >
                    <div className="imgContainer">
                      <img src={getImageUrl('event', 'thumb', element.image)} />
                    </div>

                    <TextBlock>{element.name}</TextBlock>
                  </div>
                ))}
            </div>
          </div>
        ) : null}
        <div className="treecounter_container">
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pledgeEvents: pledgeEventSelector(state)
});
export default connect(mapStateToProps)(Trillion);

Trillion.propTypes = {
  pledgeEvents: PropTypes.object
};

import React, { Component } from 'react';
import SvgContainer from '../../../../../app/components/Common/SvgContainer';
import TreecounterGraphicsText from '../../../../../app/components/TreecounterGraphics/TreecounterGraphicsText';
import SecondaryButton from '../../../../../app/components/Common/Button/SecondaryButton';
import { SideMenuImage } from '../../../../../app/assets';
import PropTypes from 'prop-types';

export default class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="canvasContainer flex-column" tabIndex={'-1'}>
        <div className="pftp-widget-row">
          {this.props.showGraphics && (
            <img src={SideMenuImage} className={'pftp-widget-img'} />
          )}
          <SecondaryButton
            onClick={event => {
              console.log('SecondaryButton', window, windows, this);
              window.pftp.giftTree(event);
            }}
          >
            Plant Trees
          </SecondaryButton>
        </div>

        {/* <button
          className="pftp-button-secondary"
          type="button"
          onClick={event => {
            console.log('SecondaryButton', window, windows, this);
            window.pftp.giftTree(event);
          }}
        >
          Plant Trees
        </button> */}
        <SvgContainer {...this.props} />
        <TreecounterGraphicsText
          trillion={false}
          onToggle={toggleVal => this.updateSvg(toggleVal)}
          treecounterData={this.props}
        />
      </div>
    );
  }
}

App.propTypes = {
  showGraphics: PropTypes.bool
};

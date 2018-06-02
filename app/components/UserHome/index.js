import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TreecounterGraphicsText from '../TreecounterGraphics/TreecounterGraphicsText';
import SvgContainer from '../Common/SvgContainer';
import LoadingIndicator from '../Common/LoadingIndicator';

export default class UserHome extends Component {
  constructor(props) {
    super(props);
    let svgData = {};
    setTimeout(() => {
      const { treecounterData } = props;
      if (treecounterData) {
        svgData = treecounterData;
      }
      this.state = {
        svgData: svgData
      };
    }, 1);
  }

  componentWillReceiveProps(nextProps) {
    setTimeout(() => {
      const { treecounterData } = nextProps;
      if (treecounterData) {
        let svgData = treecounterData;
        this.setState({ svgData });
      }
    }, 1);
  }

  render() {
    console.log('Home Component Render with props- ', this.props);

    const { treecounterData } = this.props;
    let { svgData } = this.state;
    return (
      <div className="canvasContainer flex-column">
        <SvgContainer {...svgData} />
        {treecounterData === null ? (
          <div className="circle-inside circle-headline">
            <LoadingIndicator />
          </div>
        ) : (
          <TreecounterGraphicsText trillion={false} treecounterData={svgData} />
        )}
      </div>
    );
  }
}

UserHome.propTypes = {
  treecounterData: PropTypes.object
};

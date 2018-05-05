import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TreecounterGraphicsText from './TreecounterGraphicsText';
import { userTreecounterDataSelector } from '../../selectors/index';
import SvgContainer from '../Common/SvgContainer';
import LoadingIndicator from '../Common/LoadingIndicator';

class Home extends Component {
  render() {
    console.log('Home Component Render with props- ', this.props);

    const { treecounterData } = this.props;
    // overwrite target with implicit target for treecounter graphic
    const svgData =
      null === treecounterData
        ? {}
        : { ...treecounterData, target: treecounterData.implicitTarget };
    return (
      <div className="canvasContainer flex-column">
        <SvgContainer {...svgData} />
        {treecounterData === null ? (
          <div className="circle-inside circle-headline">
            <LoadingIndicator />
          </div>
        ) : (
            <TreecounterGraphicsText treecounterData={treecounterData} />
          )}
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  console.log('Store updated - Home', state);
  return {
    treecounterData: userTreecounterDataSelector(state)
  };
};

export default connect(mapStateToProps)(Home);

Home.propTypes = {
  treecounterData: PropTypes.object.isRequired
};

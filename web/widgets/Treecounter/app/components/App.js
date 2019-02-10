import React, { Component } from 'react';
import SvgContainer from '../../../../../app/components/Common/SvgContainer';
import TreecounterGraphicsText from '../../../../../app/components/TreecounterGraphics/TreecounterGraphicsText';

export default class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="canvasContainer flex-column">
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

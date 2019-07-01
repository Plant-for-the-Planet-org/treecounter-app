import React, { Component } from 'react';
import NDVIContainer from './NDVIContainer';
// import PropTypes from 'prop-types';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <link href="ndviwidget.css" rel="stylesheet" />
        <NDVIContainer />
      </div>
    );
  }
}

// App.propTypes = {
//   showGraphics: PropTypes.bool,
//   treecounter: PropTypes.object,
//   showDonateButton: PropTypes.bool,
//   serverName: PropTypes.string,
//   baseUrl: PropTypes.string,
//   backgroundColor: PropTypes.string,
//   isStandardTreecounter: PropTypes.bool,
//   projectId: PropTypes.string
// };

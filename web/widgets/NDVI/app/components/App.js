import React, { Component } from 'react';
// import PropTypes from 'prop-types';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>NDVI</h1>
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

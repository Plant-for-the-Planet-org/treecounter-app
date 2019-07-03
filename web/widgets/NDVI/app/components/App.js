import React, { Component } from 'react';
import NDVIContainer from '../../../../../app/components/NDVI/Index';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // const dummyDataPoints = {
  //   monthUid: 201907,
  //   month: 7,
  //   year: 2019,
  //   carbon: 3716,
  //   ndviAggregate: {
  //     min: -0.24662007507553332,
  //     max: 0.7517624439222388,
  //     avg: 0.3811577383449884
  //   }
  // };

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

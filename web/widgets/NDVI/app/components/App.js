import React, { Component } from 'react';
import NDVIContainer from '../../../../../app/components/NDVI/Index';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const dummyDataPoints = [
      {
        monthUid: 201907,
        month: 7,
        year: 2019,
        carbon: 3716,
        ndviAggregate: {
          min: -0.2,
          max: 0.2,
          avg: 0.3811577383449884
        }
      },
      {
        monthUid: 1254,
        month: 8,
        year: 2018,
        carbon: 3716,
        ndviAggregate: {
          min: -2.24662007507553332,
          max: 2.7517624439222388,
          avg: 1.3811577383449884
        }
      }
    ];

    return (
      <div>
        <link href="ndviwidget.css" rel="stylesheet" />
        <NDVIContainer dataPoints={dummyDataPoints} />
      </div>
    );
  }
}

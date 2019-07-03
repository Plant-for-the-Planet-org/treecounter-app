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
          min: -0.24662007507553332,
          max: 0.7517624439222388,
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
    const gradientResultLinePoints = [
      { value: -1.0 },
      { value: -0.9 },
      { value: -0.8 },
      { value: -0.7 },
      { value: -0.6 },
      { value: -0.5 },
      { value: -0.4 },
      { value: -0.3 },
      { value: -0.2 },
      { value: -0.1 },
      { value: 0.0 },
      { value: 0.1 },
      { value: 0.2 },
      { value: 0.3 },
      { value: 0.4 },
      { value: 0.5 },
      { value: 0.6 },
      { value: 0.7 },
      { value: 0.8 },
      { value: 0.9 },
      { value: 1.0 }
    ];

    return (
      <div>
        <link href="ndviwidget.css" rel="stylesheet" />
        <NDVIContainer
          gradientResultLinePoints={gradientResultLinePoints}
          dataPoints={dummyDataPoints}
        />
      </div>
    );
  }
}

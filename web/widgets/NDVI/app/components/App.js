import React, { Component } from 'react';
import NDVIContainer from '../../../../../app/components/NDVI/Index';
//mockData
import mockDataPoints from '../mockDataPoints';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <link href="ndviwidget.css" rel="stylesheet" />
        <NDVIContainer dataPoints={mockDataPoints} />
      </div>
    );
  }
}

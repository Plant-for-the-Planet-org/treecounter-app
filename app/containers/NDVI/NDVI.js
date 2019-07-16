import React from 'react';
import { NDVIAction } from '../../actions/NDVIAction';
import PropTypes from 'prop-types';
import NDVI from '../../components/NDVI';
import mockDataPoints from '../../components/NDVI/mockDataPoints';

class NDVIContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      dataPoints: []
    };
  }

  componentDidMount() {
    NDVIAction(this.props.ndviUid).then(
      success => {
        try {
          this.setState({
            loading: false,
            dataPoints: success.data
          });
        } catch (err) {
          console.log(err);
        }
      },
      error => {
        console.log(error);
        this.setState({
          loading: false,
          dataPoints: mockDataPoints
        });
      }
    );
  }

  render() {
    return !this.state.loading ? (
      <NDVI dataPoints={this.state.dataPoints} />
    ) : null;
  }
}

export default NDVIContainer;

NDVIContainer.propTypes = {
  ndviUid: PropTypes.string
};

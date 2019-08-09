import React from 'react';
import { NDVIAction } from '../../actions/NDVIAction';
import PropTypes from 'prop-types';
import NDVI from '../../components/NDVI';
import mockDataPoints from '../../components/NDVI/mockDataPoints';
import LoadingIndicators from '../../components/Common/LoadingIndicator';

const ENABLED_NDVI = true;
class NDVIContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      dataPoints: []
    };
  }

  handleRefresh = () => {
    NDVIAction(this.props.ndviUid).then(
      success => {
        try {
          this.setState({
            loading: false,
            dataPoints: success.data
          });
          this.props.onViewMoreClick && this.props.onViewMoreClick();
        } catch (err) {
          // this.setState({
          //   loading: false,
          //   dataPoints: mockDataPoints
          // });
          console.log(err);
        }
      },
      error => {
        console.log(error);
        this.setState({
          loading: false,
          dataPoints: { dataPoints: mockDataPoints }
        });
      }
    );
  };

  componentDidMount() {
    this.handleRefresh();
  }

  render() {
    if (!ENABLED_NDVI || !this.props.ndviUid) {
      return null;
    }
    return !this.state.loading ? (
      <NDVI
        dataPoints={this.state.dataPoints.dataPoints}
        refresh={this.handleRefresh}
      />
    ) : (
      <LoadingIndicators />
    );
  }
}

export default NDVIContainer;

NDVIContainer.propTypes = {
  ndviUid: PropTypes.string,
  onViewMoreClick: PropTypes.func
};

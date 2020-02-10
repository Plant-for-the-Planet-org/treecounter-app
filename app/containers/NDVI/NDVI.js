import React from 'react';
import PropTypes from 'prop-types';
import { debug } from '../../debug';
import { NDVIAction } from '../../actions/NDVIAction';
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
    if (!this.props.ndviUid) {
      return;
    }
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
          debug(err);
        }
      },
      error => {
        debug(error);
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

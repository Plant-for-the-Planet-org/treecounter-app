import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { infoGrey } from '../../assets';

@withRouter
export default class BodyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasErrorOccurred: false };
  }

  onRouteChanged() {
    console.log('ROUTE CHANGED');
    this.setState({ hasErrorOccurred: false });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      this.onRouteChanged();
    }
  }
  componentDidCatch(error, info) {
    this.setState({ hasErrorOccurred: true });
    console.log(error, info);
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasErrorOccurred) {
      // You can render any custom fallback UI
      return (
        <div className={'error-container'}>
          <img src={infoGrey} />
          <h1>Something went wrong.</h1>
          <h4>Sorry for the inconveniences.</h4>
          <p>
            We have reported this error to our developers with a cup of coffee.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

BodyErrorBoundary.propTypes = {
  children: PropTypes.any,
  location: PropTypes.any
};

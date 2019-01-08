import React from 'react';
import PropTypes from 'prop-types';
import { infoGrey } from '../../assets';
export default class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasErrorOccurred: false };
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

GlobalErrorBoundary.propTypes = {
  children: PropTypes.any,
  location: PropTypes.any
};

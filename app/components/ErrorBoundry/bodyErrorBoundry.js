import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { infoGrey } from '../../assets';
import { updateRoute } from '../../helpers/routerHelper';

@withRouter
export default class BodyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 30, hasErrorOccurred: false };
    this.secondsRemaining;
    this.intervalHandle;
    // this.handleChange = this.handleChange.bind(this);
    // method that triggers the countdown functionality
    this.startCountDown = this.startCountDown.bind(this);
    this.tick = this.tick.bind(this);
  }

  onRouteChanged() {
    console.log('ROUTE CHANGED');
    clearInterval(this.intervalHandle);
    this.secondsRemaining;
    this.setState({ hasErrorOccurred: false, seconds: 30 });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      this.onRouteChanged();
    }
  }
  componentDidCatch(error, info) {
    this.secondsRemaining = 30;
    this.setState({ hasErrorOccurred: true, seconds: 30 }, this.startCountDown);
    console.log(error, info);

    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  tick() {
    let sec = this.secondsRemaining;
    this.setState({
      seconds: sec
    });
    if (sec === 0) {
      clearInterval(this.intervalHandle);
      updateRoute('app_homepage');
    }
    this.secondsRemaining--;
  }
  startCountDown() {
    this.intervalHandle = setInterval(this.tick, 1000);
    this.secondsRemaining = this.state.seconds;
  }

  render() {
    if (this.state.hasErrorOccurred) {
      // You can render any custom fallback UI
      return (
        <div className={'error-container sidenav-wrapper'}>
          <img src={infoGrey} />
          <h1>Something went wrong.</h1>
          <h4>Sorry for the inconveniences.</h4>
          <p>
            We have reported this error to our developers with a cup of coffee.
          </p>
          <div>
            <p>
              You will be redirected to home page in
              <span className={'counter'}>{' ' + this.secondsRemaining} </span>
              seconds
            </p>
          </div>
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

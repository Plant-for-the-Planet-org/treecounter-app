import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { debug } from '../../debug';
import { info } from '../../assets';
import { updateRoute } from '../../helpers/routerHelper';
import i18n from '../../locales/i18n.js';

class BodyErrorBoundary extends React.Component {
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
    debug(error, info);

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
          <img src={info} />
          <h1>{i18n.t('label.something_went_x')}</h1>
          <h4>{i18n.t('label.sorry_inconveniences')}</h4>
          <p>{i18n.t('label.error_reported')}</p>
          <div>
            <p>
              {i18n.t('label.home_page_redirected', {
                seconds: this.secondsRemaining
              })}
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

export default withRouter(BodyErrorBoundary);

import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
export default class GlobalErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasErrorOccurred: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasErrorOccurred: true });
    //console.log(error, info);
  }

  render() {
    if (this.state.hasErrorOccurred) {
      return (
        <Text>
          We have reported this error to our developers with a cup of coffee.
        </Text>
      );
    }
    return this.props.children;
  }
}

GlobalErrorBoundary.propTypes = {
  children: PropTypes.any,
  location: PropTypes.any
};

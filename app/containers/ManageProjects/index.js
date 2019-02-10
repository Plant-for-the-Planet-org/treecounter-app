import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ManageProjectContainer extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return <div>Test container</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  // return bindActionCreators(
  //   { fetchPledgesAction, postPledge, clearTimeoutAction },
  //   dispatch
  // );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ManageProjectContainer
);

ManageProjectContainer.propTypes = {
  userProfile: PropTypes.object
};

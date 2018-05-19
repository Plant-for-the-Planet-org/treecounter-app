import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';

import Target from '../../components/Target';
import { SubmitTarget } from '../../actions/targetAction';
import { userTreecounterSelector } from '../../selectors/index';

class TargetContainer extends React.Component {
  onSubmitTarget(value) {
    this.props.SubmitTarget(value);
  }

  render() {
    return (
      <Target
        treecounter={this.props.treecounter}
        onSubmitTarget={this.onSubmitTarget}
      />
    );
  }
}

const mapStateToProps = state => ({
  treecounter: userTreecounterSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ SubmitTarget }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TargetContainer);

TargetContainer.propTypes = {
  treecounter: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  SubmitTarget: PropTypes.func.isRequired
};

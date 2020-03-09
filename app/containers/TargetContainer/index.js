import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import PropTypes from 'prop-types';
import { debug } from '../../debug';
import { schemaOptions } from '../../server/parsedSchemas/target';
import Target from '../../components/Target';
import { SubmitTarget } from '../../actions/targetAction';
import { userTreecounterSelector } from '../../selectors/index';
import { handleServerResponseError } from '../../helpers/utils';

class TargetContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schemaOptions
    };
    this.onSubmitTarget = this.onSubmitTarget.bind(this);
  }
  onSubmitTarget = () => {
    debug(
      '\x1b[45m targetCOntainer',
      this.refs.targetContainer.refs.setTargetForm.validate
    );
    debug('\x1b[0m');
    debug(this.refs.targetContainer.refs.setTargetForm.validate());
    let value = this.refs.targetContainer.refs.setTargetForm.getValue();
    if (value) {
      this.props
        .SubmitTarget(value, this.props.navigation)
        .then(val => val)
        .catch(err => {
          let newSchemaOptions = handleServerResponseError(
            err,
            this.state.schemaOptions
          );
          this.setState(
            {
              schemaOptions: {
                ...newSchemaOptions
              }
            },
            () => {
              this.refs.targetContainer.refs.setTargetForm.validate();
            }
          );
        });
    }
  };

  render() {
    return (
      <Target
        ref={'targetContainer'}
        treecounter={this.props.treecounter}
        schemaOptions={this.state.schemaOptions}
        onSubmitTarget={this.onSubmitTarget}
        navigation={this.props.navigation}
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
  SubmitTarget: PropTypes.func.isRequired,
  navigation: PropTypes.any
};

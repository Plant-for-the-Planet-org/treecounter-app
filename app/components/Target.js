import React, { Component } from 'react';
import LiForm from 'liform-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as Schema from '../layouts/TargetSchema';
import CustomForm from './Common/CustomForm';
import LoadingIndicator from './Common/LoadingIndicator';
import { SubmitTarget } from '../actions/targetAction';
import { userTreecounterSelector } from '../selectors/index';

class TargetPage extends Component {
  constructor() {
    super();

    this.state = {
      data: {},
      loading: true,
      label: 'Set',
      schema: {},
      initialValues: {}
    };
  }

  componentDidMount() {
    const { treecounter } = this.props;
    if (null !== treecounter) {
      Schema.TargetSchema(this.props.treecounter.id).subscribe(success => {
        this.setState({
          schema: success.schema,
          loading: false,
          initialValues: success.values,
          label: success.values.countTarget !== 0 ? 'Update' : 'Set'
        });
      });
    }
  }

  render() {
    const { treecounter } = this.props;
    return (
      <div>
        <div className="text-center">
          {this.state.loading ? <LoadingIndicator /> : null}
        </div>
        <LiForm
          schema={this.state.schema}
          initialValues={this.state.initialValues}
          onSubmit={treecounterData =>
            this.props.SubmitTarget(treecounterData, treecounter.id)
          }
          baseForm={CustomForm}
          headline=""
          buttonText={this.state.label}
          buttonWidth="240"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  treecounter: userTreecounterSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ SubmitTarget }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TargetPage);

TargetPage.propTypes = {
  treecounter: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  SubmitTarget: PropTypes.func.isRequired
};

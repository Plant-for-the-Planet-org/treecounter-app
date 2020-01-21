import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import PrimaryButton from '../Common/Button/PrimaryButton';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card';
import {
  singleTreeRegisterFormSchema,
  schemaOptionsSingleTree,
  multipleTreesRegisterFormSchema,
  schemaOptionsMultipleTrees
} from '../../server/parsedSchemas/registerTrees';
import i18n from '../../locales/i18n.js';

let TCombForm = t.form.Form;

const formLayoutSingleTree = locals => {
  return (
    <div className="register-tree__form">
      <div className="register-tree__form--row">
        {locals.inputs.treeCount}
        {locals.inputs.treeSpecies}
      </div>
      <div className="register-tree__form--row">{locals.inputs.plantDate}</div>
      {locals.inputs.geoLocation}
      <div className="register-tree__form--row">
        {locals.inputs.contributionImages}
      </div>
      <div className="register-tree__form--row">
        {locals.inputs.treeClassification}
        <div className="register-tree__form--row__spacer" />
        {locals.inputs.treeScientificName}
      </div>
      <div className="register-tree__form--row">
        {locals.inputs.contributionMeasurements}
      </div>
    </div>
  );
};

const formLayoutMultipleTrees = locals => {
  return (
    <div className="register-tree__form">
      <div className="register-tree__form--row">
        {locals.inputs.treeCount}
        <div className="register-tree__form--row__spacer" />
        {locals.inputs.treeSpecies}
      </div>
      <div className="register-tree__form--row">{locals.inputs.plantDate}</div>
      {locals.inputs.geoLocation}
      <div className="register-tree__form--row">
        {locals.inputs.contributionImages}
      </div>
    </div>
  );
};

const schemaOptionsSingle = {
  template: formLayoutSingleTree,
  ...schemaOptionsSingleTree
};

const schemaOptionsMultiple = {
  template: formLayoutMultipleTrees,
  ...schemaOptionsMultipleTrees
};

export default class EditUserContribution extends Component {
  static mode = {
    singleTree: 'single-tree',
    multipleTrees: 'multiple-trees'
  };

  constructor(props) {
    super(props);
    let mode;
    if (props.userContribution.treeCount > 1) {
      mode = EditUserContribution.mode.multipleTrees;
    } else {
      mode = EditUserContribution.mode.singleTree;
    }
    this.state = {
      mode: mode
    };

    // Bind Local method
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  onSubmitClick(event, mode) {
    this.props.onSubmit(mode, this.editTreeForm.getValue());
    event && event.preventDefault();
  }

  render() {
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>{i18n.t('label.edit_trees')}</TextHeading>
        <CardLayout>
          <form onSubmit={this.onSubmitClick}>
            <div className="register-tree__form">
              {this.state.mode === EditUserContribution.mode.singleTree ? (
                <TCombForm
                  ref={ref => (this.editTreeForm = ref)}
                  type={singleTreeRegisterFormSchema}
                  options={schemaOptionsSingle}
                  value={this.props.userContribution}
                />
              ) : (
                <TCombForm
                  ref="editTreeForm"
                  type={multipleTreesRegisterFormSchema}
                  options={schemaOptionsMultiple}
                  value={this.props.userContribution}
                />
              )}
            </div>
            <PrimaryButton onClick={this.onSubmitClick}>
              {i18n.t('label.update')}
            </PrimaryButton>
          </form>
        </CardLayout>
      </div>
    );
  }
}

EditUserContribution.propTypes = {
  userContribution: PropTypes.object,
  onSubmit: PropTypes.func
};

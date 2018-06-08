import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import Tabs from '../Common/Tabs';
import PrimaryButton from '../Common/Button/PrimaryButton';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import {
  singleTreeRegisterFormSchema,
  schemaOptionsSingleTree,
  multipleTreesRegisterFormSchema,
  schemaOptionsMultipleTrees
} from '../../server/parsedSchemas/registerTrees';

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

export default class RegisterTrees extends Component {
  static data = {
    tabs: [
      {
        name: 'Individual Tree',
        id: 'single-tree'
      },
      {
        name: 'Many Trees',
        id: 'multiple-trees'
      }
    ]
  };

  constructor() {
    super();

    this.state = {
      mode: '',
      individual: {
        treeCount: 1
      }
    };

    // Bind Local method
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.handleModeOptionChange = this.handleModeOptionChange.bind(this);
  }

  onSubmitClick() {
    this.props.onSubmit(this.state.mode);
  }

  handleModeOptionChange(tab) {
    this.setState({ mode: tab });
  }

  render() {
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>Register planted trees</TextHeading>
        <CardLayout>
          <Tabs
            data={RegisterTrees.data.tabs}
            onTabChange={this.handleModeOptionChange}
          >
            {this.state.mode === RegisterTrees.data.tabs[0].id ? (
              <TCombForm
                ref="registerTreeForm"
                type={singleTreeRegisterFormSchema}
                options={schemaOptionsSingle}
                value={this.state.individual}
              />
            ) : (
              <TCombForm
                ref="registerTreeForm"
                type={multipleTreesRegisterFormSchema}
                options={schemaOptionsMultiple}
              />
            )}
          </Tabs>
          <PrimaryButton onClick={this.onSubmitClick}>Register</PrimaryButton>
        </CardLayout>
      </div>
    );
  }
}

RegisterTrees.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import Tabs from '../Common/Tabs';
import PrimaryButton from '../Common/Button/PrimaryButton';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card';
import {
  singleTreeRegisterFormSchema,
  multipleTreesRegisterFormSchema,
  schemaOptionsMultipleTrees
} from '../../server/parsedSchemas/registerTrees';
import i18n from '../../locales/i18n.js';
import RegistrationMap from './RegistrationMap';
import DescriptionHeading from '../../components/Common/Heading/DescriptionHeading';
import { getSelectTemplate } from '../../components/Templates/SelectTemplate';
import { getPlantProjectEnum, isTpo } from '../../helpers/utils';

let TCombForm = t.form.Form;

const getSingleTreeLayout = props1 => {
  const formLayoutSingleTree = locals => {
    return (
      <div className="register-tree__form">
        <div className="register-tree__form--row">
          {locals.inputs.treeCount}
          {locals.inputs.treeSpecies}
        </div>
        <div className="register-tree__form--row">
          {locals.inputs.plantDate}
        </div>
        {locals.inputs.geoLocation}
        <div className="register-tree__form--row">
          {locals.inputs.contributionImages}
        </div>
        {isTpo(props1.currentUserProfile) ? (
          <div className="register-tree__form--row">
            {locals.inputs.plantProject}
          </div>
        ) : null}

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
  return formLayoutSingleTree;
};

const getMultipleTreeLayout = props1 => {
  return locals => {
    return (
      <div className="register-tree__form">
        <div className="register-tree__form--row">
          {locals.inputs.treeCount}
          <div className="register-tree__form--row__spacer" />
          {locals.inputs.treeSpecies}
        </div>
        <div className="register-tree__form--row">
          {locals.inputs.plantDate}
        </div>
        {locals.inputs.geoLocation}
        <div className="register-tree__form--row">
          {locals.inputs.contributionImages}
        </div>
        {isTpo(props1.currentUserProfile) ? (
          <div className="register-tree__form--row">
            {locals.inputs.plantProject}
          </div>
        ) : null}
      </div>
    );
  };
};

const schemaOptionsSingle = (template, plantProjects) => {
  // schemaOptionsSingleTree.fields.plantProject.template = getSelectTemplate(
  //   plantProjects
  // );
  // return {
  //   template,
  //   ...schemaOptionsSingleTree
  // };
  this.props.updateTemplateSingle(template, plantProjects);
};

const schemaOptionsMultiple = (template, plantProjects) => {
  schemaOptionsMultipleTrees.fields.plantProject.template = getSelectTemplate(
    plantProjects
  );
  return {
    template,
    ...schemaOptionsMultipleTrees
  };
};

export default class RegisterTrees extends Component {
  static data = {
    tabs: [
      {
        name: i18n.t('label.individual'),
        id: 'single-tree'
      },
      {
        name: i18n.t('label.many_trees'),
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
    this.handleGeoLocationChange = this.handleGeoLocationChange.bind(this);
  }

  onSubmitClick(event) {
    console.log('event', event);
    this.props.onSubmit(this.state.mode);
    event.preventDefault();
  }

  handleModeOptionChange(tab) {
    this.setState({ mode: tab });
  }

  handleGeoLocationChange(geoLocation) {
    console.log(geoLocation);
  }

  render() {
    const tpoPlantProjects = getPlantProjectEnum(this.props.currentUserProfile);
    const plantProject =
      tpoPlantProjects &&
      tpoPlantProjects.length > 0 &&
      tpoPlantProjects[0].value;
    if (plantProject) {
      schemaOptionsSingle(getSingleTreeLayout(this.props), tpoPlantProjects);
    }

    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>
          {i18n.t('label.heading_register_trees')}
          <DescriptionHeading>
            {i18n.t('label.register_description')}
          </DescriptionHeading>
        </TextHeading>
        <CardLayout>
          <form onSubmit={this.onSubmitClick}>
            <Tabs
              data={RegisterTrees.data.tabs}
              onTabChange={this.handleModeOptionChange}
            >
              {this.state.mode === RegisterTrees.data.tabs[0].id ? (
                <TCombForm
                  ref="registerTreeForm"
                  type={singleTreeRegisterFormSchema}
                  options={this.props.schemaOptionsSingleTree}
                  // value={{ ...this.state.individual, plantProject }}
                />
              ) : (
                <TCombForm
                  ref="registerTreeForm"
                  type={multipleTreesRegisterFormSchema}
                  options={schemaOptionsMultiple(
                    getMultipleTreeLayout(this.props),
                    tpoPlantProjects
                  )}
                  value={{ plantProject }}
                />
              )}
            </Tabs>
            <PrimaryButton onClick={this.onSubmitClick}>
              {i18n.t('label.register')}
            </PrimaryButton>
          </form>
        </CardLayout>
      </div>
    );
  }
}

RegisterTrees.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentUserProfile: PropTypes.any.isRequired,
  updateTemplateSingle: PropTypes.func,
  schemaOptionsSingleTree: PropTypes.object
};

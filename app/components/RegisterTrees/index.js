import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import Tabs from '../Common/Tabs';
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
import RegistrationMap from './RegistrationMap';
import DescriptionHeading from '../../components/Common/Heading/DescriptionHeading';
import { getSelectTemplate } from '../../components/Templates/SelectTemplate';

let TCombForm = t.form.Form;

const isTpo = props1 => {
  const currentUserProfile = props1.currentUserProfile;
  let tpo = false;
  if (currentUserProfile && currentUserProfile.type === 'tpo') {
    tpo = true;
  }
  return tpo;
};

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
        {isTpo(props1) ? (
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
        {isTpo(props1) ? (
          <div className="register-tree__form--row">
            {locals.inputs.plantProject}
          </div>
        ) : null}
      </div>
    );
  };
};

const getPlantProjectEnum = props => {
  const currentUserProfile = props.currentUserProfile;
  if (currentUserProfile && currentUserProfile.type === 'tpo') {
    let newEnum = [];
    for (let plantProject in props.plantProjects) {
      newEnum.push({
        value: props.plantProjects[plantProject].id,
        text: props.plantProjects[plantProject].name
      });
    }
  }
};

const schemaOptionsSingle = (template, props) => {
  schemaOptionsSingleTree.fields.plantProject.template = getSelectTemplate(
    getPlantProjectEnum(props)
  );
  return {
    template,
    ...schemaOptionsSingleTree
  };
};

const schemaOptionsMultiple = (template, props) => {
  schemaOptionsMultipleTrees.fields.plantProject.template = getSelectTemplate(
    getPlantProjectEnum(props)
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

  onSubmitClick() {
    this.props.onSubmit(this.state.mode);
  }

  handleModeOptionChange(tab) {
    this.setState({ mode: tab });
  }

  handleGeoLocationChange(geoLocation) {
    console.log(geoLocation);
  }

  render() {
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
                  options={schemaOptionsSingle(
                    getSingleTreeLayout(this.props),
                    this.props
                  )}
                  value={this.state.individual}
                />
              ) : (
                <TCombForm
                  ref="registerTreeForm"
                  type={multipleTreesRegisterFormSchema}
                  options={schemaOptionsMultiple(
                    getMultipleTreeLayout(this.props),
                    this.props
                  )}
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
  plantProjects: PropTypes.any.isRequired
};

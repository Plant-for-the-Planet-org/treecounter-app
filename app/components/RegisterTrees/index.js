import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import Tabs from '../Common/Tabs';
import PrimaryButton from '../Common/Button/PrimaryButton';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card';
import {
  singleTreeRegisterFormSchema,
  multipleTreesRegisterFormSchema
} from '../../server/parsedSchemas/registerTrees';
import i18n from '../../locales/i18n.js';
import DescriptionHeading from '../../components/Common/Heading/DescriptionHeading';
import { getPlantProjectEnum, isTpo } from '../../helpers/utils';
import { getSelectTemplate } from '../../components/Templates/SelectTemplate';
let TCombForm = t.form.Form;

const getSingleTreeLayout = (
  props1,
  _onClickAddClassification,
  showClassification
) => {
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

        <div className="pftp-addbutton">
          <button type="button" onClick={_onClickAddClassification}>
            +&nbsp;{i18n.t('label.add_classification')}
          </button>
        </div>
        <div
          className={
            'register-tree__form--row ' +
            (!showClassification ? 'register-tree___hide-content' : '')
          }
        >
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

const getMultipleTreeLayout = () => {
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
      </div>
    );
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
      formValueSingle: {
        treeCount: 1
      },
      formValueMultiple: '',
      plantProject: '',
      showClassification: false
    };

    // Bind Local method
    this.onSubmitClick = this.onSubmitClick.bind(this);
    this.handleModeOptionChange = this.handleModeOptionChange.bind(this);
    this.handleGeoLocationChange = this.handleGeoLocationChange.bind(this);
  }

  updateTemplate(template, plantProjects, formSchema) {
    let newFormSchema = Object.assign({}, formSchema);
    if (plantProjects) {
      newFormSchema.fields.plantProject.template = getSelectTemplate(
        plantProjects
      );
    }
    newFormSchema = { template, ...newFormSchema };
    return newFormSchema;
  }

  onChange = event => {
    this.setState({ plantProject: event.target.value });
  };

  onSubmitClick(event) {
    let plantProject = null;
    if (isTpo(this.props.currentUserProfile)) {
      plantProject =
        this.state.plantProject !== ''
          ? this.state.plantProject
          : getPlantProjectEnum(this.props.currentUserProfile).length > 0
            ? getPlantProjectEnum(this.props.currentUserProfile)[0].value
            : null;
    }

    this.props.onSubmit(
      this.state.mode,
      this.registerTreeForm.getValue(),
      plantProject
    );
    event.preventDefault();
  }

  handleModeOptionChange(tab) {
    this.setState({ mode: tab });
  }

  handleGeoLocationChange(geoLocation) {
    console.log(geoLocation);
  }

  onFormChangeSingle = value => {
    this.setState({ formValueSingle: value });
  };

  onFormChangeMultiple = value => {
    this.setState({ formValueMultiple: value });
  };

  toggleClassification = () => {
    this.setState({
      showClassification: !this.state.showClassification
    });
  };
  render() {
    const tpoPlantProjects = getPlantProjectEnum(this.props.currentUserProfile);
    const isSingleTree = this.state.mode === RegisterTrees.data.tabs[0].id;

    const template = isSingleTree
      ? getSingleTreeLayout(
          this.props,
          this.toggleClassification,
          this.state.showClassification
        )
      : getMultipleTreeLayout(this.props);

    let formSchemaOptions = isSingleTree
      ? this.props.schemaOptionsSingleTree
      : this.props.schemaOptionsMultipleTrees;

    formSchemaOptions = this.updateTemplate(template, null, formSchemaOptions);

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
              {isSingleTree ? (
                <TCombForm
                  ref={ref => (this.registerTreeForm = ref)}
                  type={singleTreeRegisterFormSchema}
                  options={formSchemaOptions}
                  value={this.state.formValueSingle}
                  onChange={this.onFormChangeSingle}
                />
              ) : (
                <TCombForm
                  ref="registerTreeForm"
                  type={multipleTreesRegisterFormSchema}
                  options={formSchemaOptions}
                  value={this.state.formValueMultiple}
                  onChange={this.onFormChangeMultiple}
                />
              )}
              {isTpo(this.props.currentUserProfile) &&
              tpoPlantProjects.length > 0 ? (
                <div className="pftp-selectfield">
                  <select
                    key={'hey'}
                    className={'pftp-selectfield__select'}
                    required="required"
                    onChange={this.onChange}
                    value={this.state.plantProject}
                  >
                    {tpoPlantProjects.map(option => (
                      <option
                        key={option.value}
                        className="pftp-selectfield__option"
                        value={option.value}
                      >
                        {i18n.t(option.text)}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}
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
  schemaOptionsSingleTree: PropTypes.object,
  schemaOptionsMultipleTrees: PropTypes.object
};

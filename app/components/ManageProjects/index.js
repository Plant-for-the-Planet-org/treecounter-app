import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../Common/Button/PrimaryButton';
import SecondaryButton from '../Common/Button/SecondaryButton';
import t from 'tcomb-form';
import i18n from '../../locales/i18n.js';
import { plantProjectSchema } from '../../server/parsedSchemas/editProfile';
import PlantProjectTemplate from '../EditUserProfile/PlantProjectTemplate';
import { EditOrange, close_green, MapPinRed } from '../../assets';
import _ from 'lodash';
import TextHeading from '../Common/Heading/TextHeading';
import DescriptionHeading from '../Common/Heading/DescriptionHeading';
import CardLayout from '../Common/Card';
import { postChangeOrder } from '../../actions/manageProject';

let TCombForm = t.form.Form;
const emptyProjectInfo = {
  name: ''
  // location: 'Campeche',
  // country: 'MX',
  // geoLocation: 'geoLongitude=-146.31011&geoLatitude=79.074456&country=MX'
};

export const firstLetterUppercase = string => {
  if (typeof string == 'string') {
    let returnString = string.split(' ');
    returnString = returnString.map(stringData => {
      return (
        stringData && stringData.replace(/^\w/, c => c.toLocaleUpperCase())
      );
    });
    return returnString.join(' ');
  }
  return string;
};

class CollapsiblePlantProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plantProjectsPickerVisibility: !props.plantProject.name
    };
    this.dropProject = this.dropProject.bind(this);
  }
  togglePicker = () => {
    this.setState({
      plantProjectsPickerVisibility: !this.state.plantProjectsPickerVisibility
    });
  };
  dropProject(event, position) {
    let project_id = event.dataTransfer.getData('text/plain');
    let data = {
      position: position
    };
    postChangeOrder(data, { plantProject: project_id });
  }
  render() {
    const { plantProject, children } = this.props;
    return (
      <div
        className="pftp-collapsible-card-layout"
        draggable={!this.state.plantProjectsPickerVisibility}
        onDragStart={event => {
          event.dataTransfer.setData('text/plain', plantProject.id);
          event.dropEffect = 'move';
        }}
        onDrop={event => {
          event.preventDefault();
          // Get the id of the target and add the moved element to the target's DOM
          let data = event.dataTransfer.getData('text/plain');
          this.dropProject(event, plantProject.position);
        }}
        onDragOver={event => {
          event.preventDefault();
          // Get the id of the target and add the moved element to the target's DOM
          event.dataTransfer.dropEffect = 'move';
        }}
      >
        <div className="pftp-card-header">
          <div className="project-editor-row">
            <span className={'plant-project-name'}>
              {firstLetterUppercase(plantProject.name)}
            </span>
            {!this.state.plantProjectsPickerVisibility && (
              <span>
                <img
                  src={EditOrange}
                  className="icon"
                  onClick={event => {
                    this.togglePicker();
                  }}
                />
                <img
                  src={close_green}
                  className="icon"
                  onClick={this.props.deleteProject}
                />
              </span>
            )}
          </div>
          {plantProject.name && (
            <div className="project-basic-info-row">
              {plantProject.location && (
                <span className="row">
                  <img src={MapPinRed} className="small-icon" />
                  <span>{firstLetterUppercase(plantProject.location)}</span>
                </span>
              )}
              <span className="row">
                <span className="margin-item light-text">
                  {plantProject.countPlanted}
                </span>
                <span>{i18n.t('label.trees_planted')}</span>
              </span>
            </div>
          )}
        </div>
        {this.state.plantProjectsPickerVisibility && (
          <div className="pftp-card-picker">{children}</div>
        )}
      </div>
    );
  }
}
CollapsiblePlantProject.propTypes = {
  plantProject: PropTypes.object,
  children: PropTypes.node,
  deleteProject: PropTypes.func.isRequired
};

export default class ManageProjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plantProjects: (props &&
        props.currentUserProfile &&
        props.currentUserProfile.plantProjects) || [emptyProjectInfo]
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      plantProjects: (nextProps &&
        nextProps.currentUserProfile &&
        nextProps.currentUserProfile.plantProjects) || [emptyProjectInfo]
    });
  }

  mergeProjectImages(newPlantProjectImages, oldPlantProjectImages = []) {
    if (!newPlantProjectImages) {
      return oldPlantProjectImages;
    }
    let uploadPlantProjectImages = [];
    uploadPlantProjectImages = newPlantProjectImages.map(newProjectImage => {
      if (newProjectImage.image.includes('base64')) {
        let { image: imageFile, description } = newProjectImage;

        return newProjectImage.id
          ? { imageFile, description, id: newProjectImage.id }
          : { imageFile, description };
      }
      return newProjectImage;
    });

    return uploadPlantProjectImages;
  }

  handleSaveProjectClick = (plantProject, index) => {
    let formRef = 'plantProject' + index;

    let value = this.refs[formRef].getValue();
    if (value) {
      //if image file is same dont update it
      //similarly need to handle for 'plantProjectImages array
      if (value.imageFile == plantProject.imageFile) {
        value = Object.assign({}, value);
        delete value.imageFile;
      }
      let plantProjectImages = this.mergeProjectImages(
        value.plantProjectImages,
        plantProject.plantProjectImages
      );
      if (plantProject.id) {
        this.props.updatePlantProject({
          ...value,
          id: plantProject.id,
          plantProjectImages
        });
      } else {
        this.props.addPlantProject(value);
      }
    }
  };

  handleDeleteProjectCLick = (plantProject, index) => {
    if (plantProject.id) {
      this.props.deletePlantProject(plantProject.id);
    } else {
      const newPlantProjects = [...this.state.plantProjects]; // clone the array
      newPlantProjects.splice(index, 1);
      this.setState({ plantProjects: newPlantProjects });
    }
  };

  componentDidMount() {}

  componentWillUnmount() {}

  getPlantProjectList = () => {
    let plantProjectList = this.state.plantProjects.map(
      (plantProject, index) => {
        return (
          <CollapsiblePlantProject
            key={index}
            plantProject={plantProject}
            ref={'CollapsiblePlantProject' + index}
            deleteProject={() => {
              this.handleDeleteProjectCLick(plantProject, index);
            }}
          >
            <div className="user-profile__project-form-group">
              <div className="plant-project__item">
                <TCombForm
                  ref={'plantProject' + index}
                  type={plantProjectSchema.transformedSchema}
                  options={{
                    template: PlantProjectTemplate(index),
                    ...plantProjectSchema.schemaOptions
                  }}
                  value={plantProject}
                />
                <div className="row">
                  <PrimaryButton
                    onClick={() => {
                      this.handleSaveProjectClick(plantProject, index);
                    }}
                  >
                    {i18n.t('label.save_changes')}
                  </PrimaryButton>
                  <SecondaryButton
                    onClick={() => {
                      if (!plantProject.id) {
                        //delete this
                        this.handleDeleteProjectCLick(plantProject, index);
                      } else {
                        //collapsed all
                        if (this.refs['CollapsiblePlantProject' + index]) {
                          this.refs[
                            'CollapsiblePlantProject' + index
                          ].togglePicker();
                        }
                        // this.setState({
                        //   plantProjects: _.cloneDeep(this.state.plantProjects)
                        // });
                      }
                    }}
                  >
                    {i18n.toString('label.discard_changes')}
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </CollapsiblePlantProject>
        );
      }
    );
    return plantProjectList;
  };

  handleAddNewProject = () => {
    const newPlantProjects = [...this.state.plantProjects]; // clone the array
    newPlantProjects.push(emptyProjectInfo);
    this.setState({ plantProjects: newPlantProjects });
  };

  render() {
    const { type, image } = this.props.currentUserProfile;
    return (
      <div className="app-container__content--center sidenav-wrapper edit-user-profile__container ">
        {type == 'tpo' ? (
          <React.Fragment>
            <TextHeading>
              {i18n.t('label.my_dashboard')}
              <DescriptionHeading>
                {i18n.t('label.project_heading')}
              </DescriptionHeading>
            </TextHeading>
            <div className="manage-project-container">
              <div className="project-list-container plant-project__container edit-user-profile__container">
                {this.getPlantProjectList()}

                <div className="pftp-addbutton">
                  <button
                    onClick={() => {
                      this.handleAddNewProject();
                    }}
                  >
                    +&nbsp;{i18n.t('label.new_project')}
                  </button>
                </div>
              </div>
              <div className="donation-info-list">
                <CardLayout>{i18n.t('label.total_donation')}</CardLayout>
                <CardLayout>{i18n.t('label.connect_to_stripe')}</CardLayout>
                <CardLayout>{i18n.t('label.recent_donations')}</CardLayout>
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}

ManageProjects.propTypes = {
  currentUserProfile: PropTypes.object,
  updatePlantProject: PropTypes.func.isRequired,
  deletePlantProject: PropTypes.func.isRequired,
  addPlantProject: PropTypes.func.isRequired
};

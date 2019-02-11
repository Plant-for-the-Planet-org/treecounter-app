import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PrimaryButton from '../Common/Button/PrimaryButton';
import t from 'tcomb-form';
import i18n from '../../locales/i18n.js';
import { plantProjectSchema } from '../../server/parsedSchemas/editProfile';
import PlantProjectTemplate from '../EditUserProfile/PlantProjectTemplate';

let TCombForm = t.form.Form;
const emptyProjectInfo = {
  name: '',
  location: 'Campeche',
  country: 'MX',
  geoLocation: 'geoLongitude=-146.31011&geoLatitude=79.074456&country=MX'
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
    console.log(this.refs[formRef].validate());

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
          <React.Fragment key={index}>
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
                <PrimaryButton
                  onClick={() => {
                    this.handleSaveProjectClick(plantProject, index);
                  }}
                >
                  {i18n.t('label.save_changes')}
                </PrimaryButton>
                <div
                  key={index}
                  onClick={() => {
                    this.handleDeleteProjectCLick(plantProject, index);
                  }}
                  className="delete-project"
                >
                  {i18n.t('label.delete_project')}
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      }
    );
    return plantProjectList;
  };

  handleAddNewProject = () => {
    console.log('____handleAddNewProject____');
    const newPlantProjects = [...this.state.plantProjects]; // clone the array
    newPlantProjects.push(emptyProjectInfo);
    this.setState({ plantProjects: newPlantProjects });
  };

  render() {
    const { type, image } = this.props.currentUserProfile;
    return (
      <div className="app-container__content--center sidenav-wrapper edit-user-profile__container ">
        {type == 'tpo' ? (
          <div className="plant-project__container">
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

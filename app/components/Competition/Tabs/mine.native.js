import React, { Component } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import PlantProjectSnippet from '../../PlantProjects/PlantProjectSnippet';
import { updateStaticRoute } from '../../../helpers/routerHelper';
import styles from '../../../styles/competition/mine.native';
import scrollStyle from '../../../styles/common/scrollStyle.native';
import imagestyles from '../../../styles/file_picker.native';
import CompetitionSnippet from '../CompetitionSnippet.native';
import ActionButton from 'react-native-action-button';
import CardLayout from '../../Common/Card';
import PropTypes from 'prop-types';
import t from 'tcomb-form-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  competitionFormSchema,
  competitionFormSchemaOptions
} from '../../../server/parsedSchemas/competition';
import i18n from '../../../locales/i18n';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import UserProfileImage from '../../Common/UserProfileImage';
import close_green from '../../../assets/images/icons/close_green.png';
import imageUpload from '../../../assets/images/icons/upload_image.png';

let Form = t.form.Form;
const ImagePicker = require('react-native-image-picker');
const options = {
  title: 'Add Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
const getCompFormLayoutTemplate = () => {
  const formLayoutTreesTemplate = locals => {
    return (
      <View style={styles.competitonCreateMain}>
        {locals.inputs.name}
        <View style={styles.competition_create_row}>
          <View style={{ flex: 1 }}>{locals.inputs.goal}</View>
          <View style={{ flex: 1 }}>{locals.inputs.endDate}</View>
        </View>
        <View style={styles.competition_create_row}>
          <View style={{ flex: 1 }}>{locals.inputs.access}</View>
        </View>
        <View style={styles.competition_image}>
          <View style={{ flex: 1 }}>
            <Text style={styles.addImageTextStyle}>Add Image</Text>
          </View>
          <View style={{ flex: 1 }}>{locals.input.imageFile}</View>
        </View>
        {locals.inputs.description}
      </View>
    );
  };
  return formLayoutTreesTemplate;
};
const getCompFormImageLayoutTemplate = () => {
  console.log('formlayout');
  const formLayoutTreesTemplate = locals => {
    console.log(locals);
    return (
      <View style={imagestyles.filePickerContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.addImageTextStyle}>Add Image</Text>
        </View>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={event => {
            ImagePicker.showImagePicker(options, response => {
              // console.log('Response = ', response);

              if (response.didCancel) {
                //console.log('User cancelled image picker');
              } else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
              } else {
                let source = { uri: response.uri };
                locals.onChange('data:image/jpeg;base64,' + response.data);
              }
            });
          }}
        >
          {!locals.value ? (
            <Image source={imageUpload} style={{ height: 40, width: 40 }} />
          ) : (
            <View>
              <UserProfileImage profileImage={locals.value} />
              <View style={styles.profileImageBackground}>
                <Image
                  resizeMode="contain"
                  style={imagestyles.addIcon}
                  source={close_green}
                />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  return formLayoutTreesTemplate;
};

export default class MineCompetitions extends Component {
  constructor(props) {
    super(props);
    this.createCompetitionForm = element => {
      this.createCompetition = element;
    };
    this.state = {
      expanded: false,
      pageIndex: 0,
      showCompetitionForm: true,
      featuredCompetitions: [],
      formValue: null
    };
    this.onActionButtonPress = this.onActionButtonPress.bind(this);
    this.onCreateCompetition = this.onCreateCompetition.bind(this);
  }

  onActionButtonPress() {
    this.setState({
      showCompetitionForm: true,
      formValue: null
    });
  }

  componentDidMount() {
    let { allCompetitions } = this.props;
    let featuredCompetitions = [];
    if (allCompetitions.length > 0) {
      allCompetitions.forEach(val => {
        if (val.category === 'mine') {
          val.competitions.forEach(comp => {
            featuredCompetitions.push(comp);
          });
        }
      });
    }
    this.setState({
      featuredCompetitions: featuredCompetitions
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.allCompetitions !== this.props.allCompetitions ||
      nextState.showCompetitionForm !== this.state.showCompetitionForm
    ) {
      return true;
    } else {
      let returnValue = false;
      Object.entries(this.props).forEach(
        ([key, val]) =>
          nextProps[key] !== val ? (returnValue = true) : (returnValue = false)
      );
      Object.entries(this.state).forEach(
        ([key, val]) =>
          nextState[key] !== val ? (returnValue = true) : (returnValue = false)
      );
      return returnValue;
    }
  }

  componentWillReceiveProps(nextProps) {
    let { allCompetitions } = nextProps;
    if (allCompetitions !== this.props.allCompetitions) {
      let featuredCompetitions = [];
      if (allCompetitions.length > 0) {
        allCompetitions.forEach(val => {
          if (val.category === 'mine') {
            val.competitions.forEach(comp => {
              featuredCompetitions.push(comp);
            });
          }
        });
      }
      this.setState({
        featuredCompetitions: featuredCompetitions
      });
      if (featuredCompetitions.length === 0) {
        this.setState({
          showCompetitionForm: true
        });
      } else {
        this.setState({
          showCompetitionForm: false
        });
      }
    }
  }

  onCreateCompetition() {
    if (this.createCompetition.refs.input.state.value) {
      this.setState({
        formValue: this.createCompetition.refs.input.state.value
      });
      this.props.onCreateCompetition(
        this.createCompetition.refs.input.state.value,
        this.createCompetition
      );
    }
  }

  render() {
    let { featuredProjects, featuredCompetitions } = this.state;
    let schemaOptions = this.props.competitionFormSchemaOptions;
    if (schemaOptions.fields.imageFile) {
      schemaOptions.fields.imageFile.template = getCompFormImageLayoutTemplate();
    }

    return !this.state.showCompetitionForm ? (
      <View style={styles.mineContainer}>
        <ScrollView
          contentContainerStyle={[
            scrollStyle.styleContainer,
            { paddingBottom: 72 }
          ]}
        >
          {featuredCompetitions.length > 0
            ? featuredCompetitions.map(project => (
                <CompetitionSnippet
                  key={'competition' + project.id}
                  cardStyle={styles.cardStyle}
                  onMoreClick={id => this.props.onMoreClick(id, project.name)}
                  competition={project}
                  leaveCompetition={id => this.props.leaveCompetition(id)}
                  enrollCompetition={id => this.props.enrollCompetition(id)}
                  editCompetition={this.props.editCompetition}
                  type="mine"
                />
              ))
            : null}
        </ScrollView>
        <ActionButton
          buttonColor="rgba(183, 211, 127, 1)"
          buttonTextStyle={styles.action_button}
          offsetY={72}
          onPress={() => this.onActionButtonPress()}
        />
      </View>
    ) : (
      <KeyboardAwareScrollView
        contentContainerStyle={{ paddingBottom: 72 }}
        enableOnAndroid={true}
      >
        <CardLayout style={{ flex: 1 }}>
          <Form
            ref={this.createCompetitionForm}
            type={competitionFormSchema}
            options={schemaOptions}
            value={this.state.formValue}
          />
          <PrimaryButton onClick={() => this.onCreateCompetition()}>
            {i18n.t('label.create_competition')}
          </PrimaryButton>
        </CardLayout>
      </KeyboardAwareScrollView>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(
      ([key, val]) =>
        prevProps[key] !== val && console.log(`Prop '${key}' changed`)
    );
    Object.entries(this.state).forEach(
      ([key, val]) =>
        prevState[key] !== val && console.log(`State '${key}' changed`)
    );
  }
}
MineCompetitions.propTypes = {
  allCompetitions: PropTypes.any,
  onMoreClick: PropTypes.any,
  leaveCompetition: PropTypes.any,
  enrollCompetition: PropTypes.any,
  onCreateCompetition: PropTypes.any,
  editCompetition: PropTypes.any
};

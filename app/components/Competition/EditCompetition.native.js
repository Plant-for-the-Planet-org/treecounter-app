import React, { Component } from 'react';
import CardLayout from '../Common/Card';
import PropTypes from 'prop-types';
import t from 'tcomb-form-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  competitionFormSchema,
  competitionFormSchemaOptions
} from '../../server/parsedSchemas/competition';
import i18n from '../../locales/i18n';
import PrimaryButton from '../Common/Button/PrimaryButton';
import {
  competitionDetailSelector,
  userCompetitionEnrolledSelector,
  userTreecounterSelector
} from '../../selectors';
import { fetchCompetitionDetail } from '../../actions/competition';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import imagestyles from '../../styles/file_picker.native';
import styles from '../../styles/competition/mine.native';
import imageUpload from '../../assets/images/icons/upload_image.png';

import close_green from '../../assets/images/icons/close_green.png';
import UserProfileImage from '../Common/UserProfileImage.native';
let Form = t.form.Form;
const ImagePicker = require('react-native-image-picker');
const options = {
  title: 'Add Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
const getCompFormImageLayoutTemplate = () => {
  const formLayoutTreesTemplate = locals => {
    return (
      <View style={imagestyles.filePickerContainer}>
        <View style={{ flex: 1 }}>
          <Text style={styles.addImageTextStyle}>
            {i18n.t('label.add_image')}
          </Text>
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
              <UserProfileImage
                profileImage={locals.value}
                imageCategory="competition"
                imageType="avatar"
              />
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
class EditCompetition extends Component {
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
      showCompetitionForm: true
    });
  }
  componentDidMount() {
    if (this.props.competition_id) {
      this.props.fetchCompetitionDetail(this.props.competition_id);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
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
  componentWillReceiveProps(nextProps) {
    this.setState({
      formValue: nextProps.competitionDetail
    });
  }
  onCreateCompetition() {
    if (this.createCompetition.refs.input.state.value) {
      this.setState({
        formValue: this.createCompetition.refs.input.state.value
      });
      this.props.editCompetition(
        this.createCompetition.refs.input.state.value,
        this.props.competition_id,
        this.createCompetition
      );
    }
  }

  render() {
    let schemaOptions = this.props.competitionFormSchemaOptions;
    if (schemaOptions.fields.imageFile) {
      schemaOptions.fields.imageFile.template = getCompFormImageLayoutTemplate();
    }
    let formValue = this.state.formValue;
    if (formValue) {
      formValue.imageFile =
        formValue && formValue.image ? formValue.image : null;
    }
    return (
      <KeyboardAwareScrollView enableOnAndroid>
        <CardLayout style={{ flex: 1 }}>
          <Form
            ref={this.createCompetitionForm}
            type={competitionFormSchema}
            options={schemaOptions}
            value={formValue}
          />
          <PrimaryButton onClick={() => this.onCreateCompetition()}>
            {i18n.t('label.edit_competition')}
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
const mapStateToProps = state => ({
  competitionDetail: competitionDetailSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCompetitionDetail
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCompetition);
EditCompetition.propTypes = {
  allCompetitions: PropTypes.any,
  onMoreClick: PropTypes.any,
  leaveCompetition: PropTypes.any,
  enrollCompetition: PropTypes.any,
  onCreateCompetition: PropTypes.any,
  editCompetition: PropTypes.any
};

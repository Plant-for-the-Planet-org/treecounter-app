import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import t from 'tcomb-form-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  competitionFormSchema,
  competitionFormSchemaOptions
} from '../../../server/parsedSchemas/competition';
// import styles from '../../../styles/competition/mine.native';
import scrollStyle from '../../../styles/common/scrollStyle.native';
import imagestyles from '../../../styles/file_picker.native';
import i18n from '../../../locales/i18n';
import CardLayout from '../../Common/Card';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import UserProfileImage from '../../Common/UserProfileImage';
import imageUpload from '../../../assets/images/icons/upload_image.png';
import { Dimensions } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import TouchableItem from '../../../components/Common/TouchableItem.native';

const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20),
    width: Dimensions.get('window').width
  }
};
let Form = t.form.Form;
import ImagePicker from 'react-native-image-picker';
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
      <View>
        <TextField>{locals.inputs.name}</TextField>

        <View style={styles.competition_create_row}>
          <View style={{ flex: 1 }}>{locals.inputs.goal}</View>
          <View style={{ flex: 1 }}>{locals.inputs.endDate}</View>
        </View>
        <View style={styles.competition_create_row}>
          <View style={{ flex: 1 }}>{locals.inputs.access}</View>
        </View>
        <View style={styles.competition_image}>
          <View style={{ flex: 1 }}>
            <Text style={styles.addImageTextStyle}>
              {i18n.t('label.add_image')}
            </Text>
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

export default class createCompetition extends Component {
  state = {
    formValue: null
  };
  createCompetitionForm = element => {
    this.createCompetition = element;
  };

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
    let schemaOptions = competitionFormSchemaOptions;
    if (schemaOptions.fields.imageFile) {
      schemaOptions.fields.imageFile.template = getCompFormImageLayoutTemplate();
    }
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{ paddingBottom: 72, backgroundColor: '#fff' }}
        enableOnAndroid={true}
      >
        <Text
          style={{
            fontSize: 27,
            fontWeight: '800',
            fontStyle: 'normal',
            lineHeight: 40,
            letterSpacing: 0,
            textAlign: 'left',
            color: '#4d5153',
            marginTop: 20,
            marginLeft: 20
          }}
        >
          Add Competition
        </Text>
        <View style={{ marginTop: 20, marginRight: 30, marginLeft: 10 }}>
          <Form
            ref={this.createCompetitionForm}
            type={competitionFormSchema}
            options={schemaOptions}
            value={this.state.formValue}
          />
          <TouchableItem
            style={styles.secondaryButton}
            onClick={() => this.onCreateCompetition()}
          >
            <Text style={styles.secondaryButtonText}>
              {' '}
              {i18n.t('label.create_competition')}
            </Text>
          </TouchableItem>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  competitonCreateMain: {
    margin: 20
  },
  competition_create_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  competition_image: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    marginLeft: 10,
    paddingRight: 16
  },
  profileImageBackground: {
    position: 'absolute',
    height: 15,
    left: 98,
    top: 40,
    width: 15,
    zIndex: 10,
    borderRadius: 15,
    backgroundColor: '#ffffff'
  },
  addImageTextStyle: {
    color: '#686060',
    fontSize: 14
  },
  mineContainer: {
    flex: 1
  },
  mineFContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  action_button: {
    color: '#ff6666'
  },
  mineFormContainer: {
    flexDirection: 'column',

    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.5,
    elevation: 1,
    padding: 0,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  containerDedicateStyle: {
    flex: 1,
    flexDirection: 'row',
    padding: 25,
    width: '100%',
    justifyContent: 'space-between'
  },
  dedicateTreeName: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  textDedicateStyle: {
    fontSize: 14,
    color: '#ff6666',
    maxWidth: '100%',
    textAlign: 'center'
  },
  mineSpecsContainer: {
    height: Layout.window.height * 0.3,
    width: '100%'
  },
  secondaryButton: {
    borderRadius: 4,
    backgroundColor: '#89b53a',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 50,
    borderColor: '#d5d5d5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#fff'
  }
});

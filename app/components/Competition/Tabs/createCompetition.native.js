import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  ScrollView,
  Picker
} from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import buttonStyles from '../../../styles/common/button.native';
import imagestyles from '../../../styles/file_picker.native';
import i18n from '../../../locales/i18n';
import UserProfileImage from '../../Common/UserProfileImage';
import imageUpload from '../../../assets/images/icons/upload_image.png';
import { Dimensions } from 'react-native';
import { Formik } from 'formik';
import { generateFormikSchemaFromFormSchema } from '../../../helpers/utils';
import { TextField } from 'react-native-material-textfield';
import { forward, cameraSolid, imageGallery } from './../../../assets';
import DateTimePicker from '@react-native-community/datetimepicker';

import competitionFormSchema from './../../../server/formSchemas/competition';
import ImagePicker from 'react-native-image-crop-picker';

const validationSchema = generateFormikSchemaFromFormSchema(
  competitionFormSchema
);

const Layout = {
  window: {
    height: Dimensions.get('window').height - (56 + 70 + 20),
    width: Dimensions.get('window').width
  }
};
const options = {
  title: 'Add Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

// const getCompFormLayoutTemplate = () => {
//   const formLayoutTreesTemplate = locals => {
//     return (
//       <View>
//         <TextField>{locals.inputs.name}</TextField>

//         <View style={styles.competition_create_row}>
//           <View style={{ flex: 1 }}>{locals.inputs.goal}</View>
//           <View style={{ flex: 1 }}>{locals.inputs.endDate}</View>
//         </View>
//         <View style={styles.competition_create_row}>
//           <View style={{ flex: 1 }}>{locals.inputs.access}</View>
//         </View>
//         <View style={styles.competition_image}>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.addImageTextStyle}>
//               {i18n.t('label.add_image')}
//             </Text>
//           </View>
//           <View style={{ flex: 1 }}>{locals.input.imageFile}</View>
//         </View>
//         {locals.inputs.description}
//       </View>
//     );
//   };
//   return formLayoutTreesTemplate;
// };

// const getCompFormImageLayoutTemplate = () => {
//   const formLayoutTreesTemplate = locals => {
//     return (
//       <View style={imagestyles.filePickerContainer}>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.addImageTextStyle}>
//             {i18n.t('label.add_image')}
//           </Text>
//         </View>
//         <TouchableOpacity
//           style={{ flex: 1 }}
//           onPress={event => {
//             ImagePicker.showImagePicker(options, response => {
//               if (response.didCancel) {
//                 //console.log('User cancelled image picker');
//               } else if (response.error) {
//                 //console.log('ImagePicker Error: ', response.error);
//               } else if (response.customButton) {
//                 // console.log('User tapped custom button: ', response.customButton);
//               } else {
//                 let source = { uri: response.uri };
//                 locals.onChange('data:image/jpeg;base64,' + response.data);
//               }
//             });
//           }}
//         >
//           {!locals.value ? (
//             <Image source={imageUpload} style={{ height: 40, width: 40 }} />
//           ) : (
//               <View>
//                 <UserProfileImage profileImage={locals.value} />
//                 <View style={styles.profileImageBackground}>
//                   <Image
//                     resizeMode="contain"
//                     style={imagestyles.addIcon}
//                     source={close_green}
//                   />
//                 </View>
//               </View>
//             )}
//         </TouchableOpacity>
//       </View>
//     );
//   };
//   return formLayoutTreesTemplate;
// };

export default class createCompetition extends Component {
  state = {
    formValue: null,
    buttonType: 'competition',
    image: null,
    fileUri: '',
    fileType: '',
    fileName: '',
    fileSize: '',
    showDatePicker: false
  };

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({
      buttonType: '>'
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      buttonType: 'competition'
    });
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

  // Image Uploading
  pickImage() {
    ImagePicker.openPicker({
      multiple: false,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true
    })
      .then(image => {
        console.log('received image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime
          }
        });
      })
      .catch(e => alert(e));
  }

  clickImage(cropping, mediaType = 'photo') {
    ImagePicker.openCamera({
      includeExif: true,
      mediaType
    })
      .then(image => {
        console.log('received image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime
          }
        });
      })
      .catch(e => alert(e));
  }

  renderAsset(image) {
    return this.renderImage(image);
  }

  renderImage(image) {
    return (
      <Image
        style={{ maxWidth: 80, height: 80, marginTop: 6, borderRadius: 4 }}
        source={image}
      />
    );
  }

  render() {
    // let schemaOptions = competitionFormSchemaOptions;
    // if (schemaOptions.fields.imageFile) {
    //   schemaOptions.fields.imageFile.template = getCompFormImageLayoutTemplate();
    // }
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.formScrollView}
          enableOnAndroid={true}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled
        >
          <Text style={styles.add_competition_title}>Add Competition</Text>

          <Formik
            initialValues={{
              competition_name: '',
              competition_goal: '',
              competition_end_date: new Date('2020-06-12T14:42:42'),
              competition_description: '',
              competition_access: ''
            }}
            onSubmit={values => {
              console.log(values);
            }}
            validationSchema={validationSchema}
          >
            {props => (
              <>
                <View>
                  <View>
                    <TextField
                      label={i18n.t('label.competition_name')}
                      value={props.values.competition_name}
                      tintColor={'#89b53a'}
                      titleFontSize={12}
                      returnKeyType="next"
                      lineWidth={1}
                      blurOnSubmit={false}
                      error={
                        props.touched.competition_name &&
                        props.errors.competition_name
                      }
                      onChangeText={props.handleChange('competition_name')}
                      onBlur={props.handleBlur('competition_name')}
                    />
                  </View>
                  <View>
                    <Picker
                      selectedValue={this.state.language}
                      style={{
                        height: 50,
                        width: '100%',
                        padding: 0,
                        margin: 0
                      }}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ language: itemValue })
                      }
                    >
                      <Picker.Item
                        label={i18n.t('label.competition_access')}
                        value={null}
                      />
                      <Picker.Item
                        label={i18n.t('label.competition_access_immediate')}
                        value="immediate"
                      />
                      <Picker.Item
                        label={i18n.t('label.competition_access_request')}
                        value="request"
                      />
                      <Picker.Item
                        label={i18n.t('label.competition_access_invitation')}
                        value="invitation"
                      />
                    </Picker>
                    <View
                      style={{
                        width: '100%',
                        borderBottomWidth: 1,
                        borderBottomColor: '#909090'
                      }}
                    />
                  </View>
                  <View style={styles.formView}>
                    <View style={styles.formHalfTextField}>
                      <TextField
                        label={i18n.t('label.competition_goal')}
                        value={props.values.competition_goal}
                        tintColor={'#89b53a'}
                        titleFontSize={12}
                        returnKeyType="next"
                        lineWidth={1}
                        blurOnSubmit={false}
                        error={
                          props.touched.competition_goal &&
                          props.errors.competition_goal
                        }
                        onChangeText={props.handleChange('competition_goal')}
                        onBlur={props.handleBlur('competition_goal')}
                      />
                    </View>

                    <View style={styles.formHalfTextField}>
                      <TextField
                        label={i18n.t('label.competition_end_date')}
                        value={props.values.competition_end_date}
                        tintColor={'#89b53a'}
                        titleFontSize={12}
                        returnKeyType="next"
                        lineWidth={1}
                        blurOnSubmit={false}
                        error={
                          props.touched.competition_end_date &&
                          props.errors.competition_end_date
                        }
                        onBlur={props.handleBlur('competition_end_date')}
                        onPress={() => this.setState({ showDatePicker: true })}
                      />
                      {this.state.showDatePicker && (
                        <DateTimePicker
                          value={props.values.competition_end_date}
                          mode={'date'}
                          is24Hour={true}
                          display="default"
                          onChangeText={props.handleChange(
                            'competition_end_date'
                          )}
                        />
                      )}
                    </View>
                  </View>
                  <View>
                    <TextField
                      label={i18n.t('label.competition_description')}
                      value={props.values.competition_description}
                      tintColor={'#89b53a'}
                      titleFontSize={12}
                      returnKeyType="next"
                      lineWidth={1}
                      blurOnSubmit={false}
                      multiline={true}
                      error={
                        props.touched.competition_description &&
                        props.errors.competition_description
                      }
                      onChangeText={props.handleChange(
                        'competition_description'
                      )}
                      onBlur={props.handleBlur('competition_description')}
                    />
                  </View>

                  {/* Image Picking Part */}
                  <Text style={{ marginTop: 20, fontSize: 16 }}>Add Image</Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start'
                    }}
                  >
                    {this.state.image
                      ? this.renderAsset(this.state.image)
                      : null}
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginTop: 24,
                      alignItems: 'center',
                      justifyContent: 'flex-start'
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        marginRight: 36,
                        display: 'flex',
                        flexDirection: 'row'
                      }}
                      onPress={this.pickImage.bind(this)}
                    >
                      <Image
                        style={{ maxHeight: 20, width: 24, marginRight: 8 }}
                        source={imageGallery}
                      />
                      <Text style={styles.pickImageButtonText}>Pick Image</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => this.clickImage(true)}
                      style={{
                        justifyContent: 'center',
                        display: 'flex',
                        flexDirection: 'row'
                      }}
                    >
                      <Image
                        style={{ maxHeight: 20, width: 24, marginRight: 8 }}
                        source={cameraSolid}
                      />
                      <Text style={styles.pickImageButtonText}>
                        Click Image
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </Formik>
        </KeyboardAwareScrollView>
        {this.state.buttonType === 'competition' ? (
          <TouchableOpacity
            style={buttonStyles.actionButtonTouchable}
            // onPress={props.handleSubmit}
          >
            <View style={buttonStyles.actionButtonView}>
              <Text style={buttonStyles.actionButtonText}>
                {i18n.t('label.create_competition')}
              </Text>
            </View>
          </TouchableOpacity>
        ) : null}

        {this.state.buttonType === '>' ? (
          <TouchableOpacity
            style={buttonStyles.actionButtonSmallTouchable}
            // onPress={props.handleSubmit}
          >
            <Image
              source={forward}
              resizeMode="cover"
              style={buttonStyles.actionButtonSmallImage}
            />
          </TouchableOpacity>
        ) : null}
      </View>
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
  add_competition_title: {
    fontSize: 27,
    fontWeight: '800',
    fontStyle: 'normal',
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },

  formScrollView: {
    backgroundColor: 'white',
    flexGrow: 1,
    padding: 24,
    paddingBottom: 120
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
  },
  formHalfTextField: { width: '45%' },

  formView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

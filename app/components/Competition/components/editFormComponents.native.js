import React, { useState } from 'react';
import { Alert, Text, View, Image, Platform, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { TextField } from 'react-native-material-textfield';
import { Picker } from '@react-native-picker/picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS, request } from 'react-native-permissions';
import RBSheet from 'react-native-raw-bottom-sheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { debug } from '../../../debug';
import {
  cameraSolid,
  imageGallery,
  forward,
  circleDelete
} from '../../../assets';
import styles from '../../../styles/competition/competition-form.native';
import { formatDateToMySQL } from '../../../helpers/utils';
import { formatDate } from '../../../utils/utils';
import i18n from '../../../locales/i18n';
import competitionFormSchema from '../../../server/formSchemas/competition';
import { generateFormikSchemaFromFormSchema } from '../../../helpers/utils';
import buttonStyles from '../../../styles/common/button.native';
import { getImageUrl } from '../../../actions/apiRouting';
import { updateRoute } from '../../../helpers/routerHelper';

export const FormikForm = props => {
  const validationSchema = generateFormikSchemaFromFormSchema(
    competitionFormSchema
  );
  const buttonType = props.buttonType;

  const handleDelete = () => {
    RBSheetRef.close();
    props
      .onDeleteCompetition(props.competition_id)
      .then((/* success */) => { })
      .catch(err => {
        debug('Error', err);
      });
    updateRoute('app_competitions', props.navigation);
  };
  let RBSheetRef = null;
  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={values => {
        props.onEditCompetition(values, props.competition_id);
      }}
      validationSchema={validationSchema}
    >
      {props => (
        <>
          <View style={styles.view_container}>
            <KeyboardAwareScrollView
              contentContainerStyle={styles.formScrollView}
              enableOnAndroid
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="always"
              resetScrollToCoords={{ x: 0, y: 0 }}
              scrollEnabled
            >
              <Text style={styles.add_competition_title}>
                {i18n.t('label.edit_competition')}
              </Text>
              <View>
                <TextField
                  label={i18n.t('label.competition_name')}
                  value={props.values.name}
                  tintColor={'#89b53a'}
                  titleFontSize={12}
                  returnKeyType="next"
                  lineWidth={1}
                  labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                  titleTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                  affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                  blurOnSubmit={false}
                  error={props.touched.name && props.errors.name}
                  onChangeText={props.handleChange('name')}
                  onBlur={props.handleBlur('name')}
                />
              </View>

              <AccessPicker
                values={props.values}
                touched={props.touched}
                errors={props.errors}
                handleChange={props.handleChange}
                setFieldValue={props.setFieldValue}
              />

              <View style={styles.formView}>
                <View style={styles.formHalfTextField}>
                  <TextField
                    label={i18n.t('label.competition_goal')}
                    value={props.values.goal + ''}
                    tintColor={'#89b53a'}
                    titleFontSize={12}
                    returnKeyType="next"
                    lineWidth={1}
                    labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                    titleTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                    affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                    blurOnSubmit={false}
                    keyboardType="numeric"
                    error={props.touched.goal && props.errors.goal}
                    onChangeText={props.handleChange('goal')}
                    onBlur={props.handleBlur('goal')}
                  />
                </View>

                <CompetitionDatePicker
                  endDate={props.values.endDate}
                  setFieldValue={date => props.setFieldValue('endDate', date)}
                  touched={props.touched.endDate}
                  errors={props.errors.endDate}
                />
              </View>
              <View>
                <TextField
                  label={i18n.t('label.competition_description')}
                  value={props.values.description}
                  tintColor={'#89b53a'}
                  titleFontSize={12}
                  returnKeyType="next"
                  lineWidth={1}
                  blurOnSubmit={false}
                  multiline
                  labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                  titleTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                  affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                  error={props.touched.description && props.errors.description}
                  onChangeText={props.handleChange('description')}
                  onBlur={props.handleBlur('description')}
                />
              </View>

              <AddImage
                image={props.values.imageFile}
                setFieldValue={props.setFieldValue}
              />
            </KeyboardAwareScrollView>

            {buttonType === 'competition' ? (
              <>
                <TouchableOpacity
                  style={buttonStyles.dualActionButtonTouchable1}
                  onPress={() => {
                    RBSheetRef.open();
                  }}
                >
                  <View style={buttonStyles.dualActionButtonView1}>
                    <Text style={buttonStyles.dualActionButtonText1}>
                      {i18n.t('label.delete_competition')}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={buttonStyles.dualActionButtonTouchable2}
                  onPress={props.handleSubmit}
                >
                  <View style={buttonStyles.dualActionButtonView2}>
                    <Text style={buttonStyles.dualActionButtonText2}>
                      {i18n.t('label.save_competition')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </>
            ) : null}

            {buttonType === '>' ? (
              <TouchableOpacity
                style={buttonStyles.actionButtonSmallTouchable}
                onPress={props.handleSubmit}
              >
                <Image
                  source={forward}
                  resizeMode="cover"
                  style={buttonStyles.actionButtonSmallImage}
                />
              </TouchableOpacity>
            ) : null}

            <RBSheet
              ref={ref => {
                RBSheetRef = ref;
              }}
              height={300}
              duration={250}
              customStyles={{
                container: {
                  justifyContent: 'center'
                }
              }}
            >
              <View style={buttonStyles.baContainer}>
                <Text style={buttonStyles.baMessage}>
                  {i18n.t('label.confirm_delete_message')}
                </Text>

                <View style={buttonStyles.baButtonContainer}>
                  <TouchableOpacity
                    style={buttonStyles.baLaterButton}
                    onPress={() => {
                      RBSheetRef.close();
                    }}
                  >
                    <Text style={buttonStyles.baLaterText}>
                      {i18n.t('label.cancel')}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={buttonStyles.baContinueButton}
                    onPress={handleDelete}
                  >
                    <Text style={buttonStyles.baContinueText}>
                      {i18n.t('label.delete')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </RBSheet>
          </View>
        </>
      )}
    </Formik>
  );
};

export function AccessPicker(props) {
  const onChange = value => {
    props.setFieldValue('access', value);
  };
  return (
    <View>
      <Picker
        selectedValue={props.values.access}
        style={{ fontSize: 15, fontFamily: 'OpenSans-Regular' }}
        itemStyle={{ fontSize: 15, fontFamily: 'OpenSans-Regular' }}
        mode="dialog"
        prompt={i18n.t('label.competition_access')}
        onValueChange={onChange}>
        <Picker.Item key="immediate" label={i18n.t('label.competition_access_immediate')} value="immediate" />
        <Picker.Item key="request" label={i18n.t('label.competition_access_request')} value="request" />
        <Picker.Item key="invitation" label={i18n.t('label.competition_access_invitation')} value="invitation" />
      </Picker>
    </View>
  );
}

export function AddImage(props) {
  let image = props.image;

  const options = {
    // title: i18n.t('label.add_image'),
    // cancelButtonTitle: i18n.t('label.cancel'),
    // takePhotoButtonTitle: i18n.t('label.take_photo'),
    // chooseFromLibraryButtonTitle: i18n.t('label.choose_from_library'),
    // 'permissionDenied.title': i18n.t('label.permission_denied_title'),
    // 'permissionDenied.text': i18n.t('label.permission_denied_text'),
    // 'permissionDenied.reTryTitle': i18n.t(
    //   'label.permission_denied_retry_title'
    // ),
    // 'permissionDenied.okTitle': i18n.t('label.permission_denied_ok_title'),
    // storageOptions: {
    //   skipBackup: true,
    //   path: 'images'
    // }
    mediaType: 'photo',
    includeBase64: true,
  };

  return (
    <View>
      <Text style={styles.addImageTitle}>{i18n.t('label.add_image')}</Text>
      <View style={styles.showImage}>
        {image && image != 'null' ? (
          image.includes('base64') ? (
            <View style={styles.projectImageContainer}>
              <TouchableOpacity
                style={styles.competitionDeleteButton}
                onPress={() => props.setFieldValue('imageFile', 'null')}
              >
                <Image
                  style={styles.competitionDeleteImage}
                  source={circleDelete}
                />
              </TouchableOpacity>
              <Image
                style={styles.teaser__projectImage}
                source={{ uri: image }}
                resizeMode={'cover'}
              />
            </View>
          ) : (
            <View style={styles.projectImageContainer}>
              <TouchableOpacity
                style={styles.competitionDeleteButton}
                onPress={() => props.setFieldValue('imageFile', 'null')}
              >
                <Image
                  style={styles.competitionDeleteImage}
                  source={circleDelete}
                />
              </TouchableOpacity>
              <Image
                style={styles.teaser__projectImage}
                source={{
                  uri: getImageUrl('competition', 'medium', image)
                }}
                resizeMode={'cover'}
              />
            </View>
          )
        ) : null}
      </View>
      <View style={styles.addImageButtonContainer}>
        <TouchableOpacity
          style={styles.addImageButton1}
          onPress={() => {
            request(
              Platform.select({
                android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
                ios: PERMISSIONS.IOS.PHOTO_LIBRARY
              })
            ).then((/*response*/) => {
              launchImageLibrary(options, response => {
                if (response.didCancel) {
                  //debug('User cancelled image picker');
                } else if (response.errorCode) {
                  debug('ImagePicker Error: ', response.errorCode, response.errorMessage);
                  Alert.alert(
                    i18n.t('label.permission_denied_title'),
                    i18n.t('label.permission_denied_text'),
                  );
                } else {
                  props.setFieldValue(
                    'imageFile',
                    'data:image/jpeg;base64,' + response.base64
                  );
                }
              });
            }).catch(err => {
              debug(err);
            });
          }}
        >
          <Image style={styles.addImageButtonIcon} source={imageGallery} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            request(
              Platform.select({
                android: PERMISSIONS.ANDROID.CAMERA,
                ios: PERMISSIONS.IOS.CAMERA
              })
            ).then((/*response*/) => {
              launchCamera(options, response => {
                if (response.didCancel) {
                  //debug('User cancelled image picker');
                } else if (response.errorCode) {
                  debug('ImagePicker Error: ', response.errorCode, response.errorMessage);
                  Alert.alert(
                    i18n.t('label.permission_denied_title'),
                    i18n.t('label.permission_denied_text'),
                  );
                } else {
                  props.setFieldValue(
                    'imageFile',
                    'data:image/jpeg;base64,' + response.base64
                  );
                }
              });
            }).catch(err => {
              debug(err);
            });
          }}
          style={styles.addImageButton2}
        >
          <Image style={styles.addImageButtonIcon} source={cameraSolid} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function CompetitionDatePicker(props) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  return (
    <View style={styles.formHalfTextField}>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <View>
          <Text style={styles.labelEndDate}>
            {i18n.t('label.competition_end_date')}
          </Text>
          <Text style={styles.EndDate}>
            {formatDate(formatDateToMySQL(props.endDate))}</Text>
          {props.errors && props.errors.endDate ? (
            <Text>{props.errors.endDate}</Text>
          ) : null}
        </View>
        <View style={styles.datePickerUnderline} />
      </TouchableOpacity>

      <DateTimePicker
        isVisible={showDatePicker}
        onConfirm={date => {
          (date = date || props.endDate),
            setShowDatePicker(false),
            props.setFieldValue(
              formatDate(formatDateToMySQL(new Date(date)), 'yyyy-MM-dd')
            );
        }}
        date={new Date(props.endDate)}
        onCancel={() => setShowDatePicker(false)}
        minimumDate={new Date(new Date().valueOf() + 1000 * 3600 * 24)}
        headerTextIOS={i18n.t('label.datePickerTitle')}
        cancelTextIOS={i18n.t('label.datePickerCancel')}
        confirmTextIOS={i18n.t('label.datePickerConfirm')}
      />
    </View>
  );
}

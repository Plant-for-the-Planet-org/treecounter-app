import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import {
  cameraSolid,
  imageGallery,
  forward,
  circleDelete
} from '../../../assets';
import styles from '../../../styles/competition/competition-form.native';
import { formatDateToMySQL } from './../../../helpers/utils';
import { formatDate } from './../../../utils/utils';
import DateTimePicker from 'react-native-modal-datetime-picker';
import i18n from '../../../locales/i18n';
import { Formik } from 'formik';
import { TextField } from 'react-native-material-textfield';
import competitionFormSchema from './../../../server/formSchemas/competition';
import { generateFormikSchemaFromFormSchema } from '../../../helpers/utils';
import ImagePicker from 'react-native-image-picker';
import buttonStyles from '../../../styles/common/button.native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dropdown } from 'react-native-material-dropdown';

export const FormikForm = props => {
  const validationSchema = generateFormikSchemaFromFormSchema(
    competitionFormSchema
  );

  const buttonType = props.buttonType;

  return (
    <Formik
      initialValues={props.initialValues}
      onSubmit={values => {
        props.onCreateCompetition(values);
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
                {i18n.t('label.add_competition')}
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
                    value={props.values.goal}
                    tintColor={'#89b53a'}
                    titleFontSize={12}
                    returnKeyType="next"
                    lineWidth={1}
                    blurOnSubmit={false}
                    labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                    titleTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                    affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                    keyboardType="numeric"
                    error={props.touched.goal && props.errors.goal}
                    onChangeText={props.handleChange('goal')}
                    onBlur={props.handleBlur('goal')}
                  />
                </View>

                <CompetitionDatePicker
                  endDate={props.values.endDate}
                  setFieldValue={props.setFieldValue}
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
                  labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                  titleTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                  affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                  multiline
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
              <TouchableOpacity
                style={buttonStyles.actionButtonTouchable}
                onPress={props.handleSubmit}
              >
                <View style={buttonStyles.actionButtonView}>
                  <Text style={buttonStyles.actionButtonText}>
                    {i18n.t('label.create_competition')}
                  </Text>
                </View>
              </TouchableOpacity>
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
          </View>
        </>
      )}
    </Formik>
  );
};

export function AccessPicker(props) {
  let data = [
    {
      label: i18n.t('label.competition_access_immediate'),
      value: 'immediate'
    },
    {
      label: i18n.t('label.competition_access_request'),
      value: 'request'
    },
    {
      label: i18n.t('label.competition_access_invitation'),
      value: 'invitation'
    }
  ];

  const onChange = value => {
    props.setFieldValue('access', value);
  };

  return (
    <View>
      <Dropdown
        ref={ref => (this.dropdown = ref)}
        label={i18n.t('label.competition_access')}
        data={data}
        onChangeText={onChange}
        lineWidth={1}
        error={props.touched.access && props.errors.access}
        itemTextStyle={{ fontFamily: 'OpenSans-Regular' }}
        labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
      />
    </View>
  );
}

export function AddImage(props) {
  const image = props.image;

  const options = {
    title: 'Add Image',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  };

  const renderAsset = image => {
    return (
      <View style={styles.projectImageContainer}>
        <TouchableOpacity
          style={styles.competitionDeleteButton}
          onPress={() => props.setFieldValue('imageFile', '')}
        >
          <Image style={styles.competitionDeleteImage} source={circleDelete} />
        </TouchableOpacity>
        <Image
          style={styles.teaser__projectImage}
          source={{ uri: image }}
          resizeMode={'cover'}
        />
      </View>
    );
  };
  return (
    <View>
      <Text style={styles.addImageTitle}>{i18n.t('label.add_image')}</Text>
      <View style={styles.showImage}>
        {image && image != 'null' ? renderAsset(image) : null}
      </View>
      <View style={styles.addImageButtonContainer}>
        <TouchableOpacity
          style={styles.addImageButton1}
          onPress={() => {
            ImagePicker.launchImageLibrary(options, response => {
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else {
                props.setFieldValue(
                  'imageFile',
                  'data:image/jpeg;base64,' + response.data
                );
              }
            });
          }}
        >
          <Image style={styles.addImageButtonIcon} source={imageGallery} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            ImagePicker.launchCamera(options, response => {
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else {
                props.setFieldValue(
                  'imageFile',
                  'data:image/jpeg;base64,' + response.data
                );
              }
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
            {formatDate(formatDateToMySQL(props.endDate))}
          </Text>
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
            props.setFieldValue('endDate', date);
        }}
        onCancel={() => setShowDatePicker(false)}
        minimumDate={new Date(new Date().valueOf() + 1000 * 3600 * 24)}
        titleIOS={i18n.t('label.datePickerTitle')}
        cancelTextIOS={i18n.t('label.datePickerCancel')}
        confirmTextIOS={i18n.t('label.datePickerConfirm')}
      />
    </View>
  );
}

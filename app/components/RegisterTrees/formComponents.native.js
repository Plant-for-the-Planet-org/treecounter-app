/* eslint-disable no-underscore-dangle,react-native/no-color-literals */
import React, {useState, useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Switch} from 'react-native-switch';
import {cameraSolid, circleDelete, imageGallery} from '../../assets';
import styles from '../../styles/register_trees.native';
import {formatDateToMySQL} from './../../helpers/utils';
import {formatDate} from './../../utils/utils';
import DateTimePicker from 'react-native-modal-datetime-picker';
import i18n from '../../locales/i18n';
import {Formik} from 'formik';
import {TextField} from 'react-native-material-textfield';
import schemaOptionsMultiple from '../../server/formSchemas/registerTrees';
import {generateFormikSchemaFromFormSchema} from '../../helpers/utils';
import ImagePicker from 'react-native-image-picker';
import buttonStyles from '../../styles/common/button.native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Dropdown} from 'react-native-material-dropdown';
import MapboxMap from '../Map/MapboxMap.native';


export const FormikFormTree = props => {
  const [showClassification, setShowClassificationSwitch] = useState(false);
  const [geometry, setGeometry] = useState(props.geometry);
  const [geoLocation, setGeoLocation] = useState(props.geoLocation);
  useEffect(() => {

    setGeometry(props.geometry);
  }, [props.geometry]);
   useEffect(() => {
     setGeoLocation(props.geoLocation);
  }, [props.geoLocation]);

  const parentProps = props;
  const isMultipleTree = props.mode === 'multiple-trees';
  const validationSchema = generateFormikSchemaFromFormSchema(
    isMultipleTree ? schemaOptionsMultiple.multiple_trees : schemaOptionsMultiple.single_tree
  );
  return (
    <Formik
      initialValues={parentProps.initialValues}
      onSubmit={parentProps.onCreateCompetition}
      validationSchema={validationSchema}
    >
      {props => (
        <>
          <View>
            <KeyboardAwareScrollView
              contentContainerStyle={styles.formScrollView}
              enableOnAndroid
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="always"
              resetScrollToCoords={{x: 0, y: 0}}
              scrollEnabled
            >
              <View style={styles.formView}>
                <View>

                  <View style={!isMultipleTree ? styles.formHalfTextField : ''}>
                    <View style={!isMultipleTree ? styles.formNameFields : ''}>
                      <TextField
                        label={i18n.t('label.trees_name')}
                        value={props.values.treeSpecies}
                        tintColor={'#89b53a'}
                        titleFontSize={12}
                        returnKeyType="next"
                        lineWidth={1}
                        blurOnSubmit={false}
                        labelTextStyle={{fontFamily: 'OpenSans-Regular'}}
                        titleTextStyle={{fontFamily: 'OpenSans-Regular'}}
                        affixTextStyle={{fontFamily: 'OpenSans-Regular'}}
                        error={props.touched.treeSpecies && props.errors.treeSpecies}
                        onChangeText={props.handleChange('treeSpecies')}
                        onBlur={props.handleBlur('treeSpecies')}
                      />
                    </View>
                    <View style={isMultipleTree ? styles.formHalfTextField : {flex: 1}}>
                      {parentProps.mode === 'multiple-trees' && (
                        <View style={isMultipleTree ? styles.formNameFields : ''}>
                          <TextField
                            label={i18n.t('label.tree_count')}
                            value={props.values.treeCount}
                            tintColor={'#89b53a'}
                            titleFontSize={12}
                            returnKeyType="next"
                            lineWidth={1}
                            blurOnSubmit={false}
                            labelTextStyle={{fontFamily: 'OpenSans-Regular'}}
                            titleTextStyle={{fontFamily: 'OpenSans-Regular'}}
                            affixTextStyle={{fontFamily: 'OpenSans-Regular'}}
                            error={props.touched.treeCount && props.errors.treeCount}
                            onChangeText={props.handleChange('treeCount')}
                            onBlur={props.handleBlur('treeCount')}
                          />
                        </View>
                      )}

                      <View style={isMultipleTree ? {flex: 1} : ''}>
                        <CompetitionDatePicker
                          endDate={props.values.plantDate}
                          label={i18n.t('label.plant_date')}
                          setFieldValue={props.setFieldValue}
                          touched={props.touched.plantDate}
                          errors={props.errors.plantDate}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View styles={styles.formLabel}>
                <Text style={styles.formPlantingLocation}>
                  {i18n.t('label.planting_location')}
                </Text>
                <Text style={styles.formPlantingDescription}>
                  {parentProps.mode === 'multiple-trees' ? (i18n.t('label.many_tree_planting_location_description')) : (i18n.t('label.single_tree_planting_location_description'))}
                </Text>
              </View>
              <View>
                <View style={
                  (parentProps.mode === 'single-tree' && props.touched.geoLocation && props.errors.geoLocation) ||
                  (parentProps.mode === 'multiple-trees' && props.touched.geometry && props.errors.geometry) ? styles.errorView : ''}>
                  <MapboxMap
                    mode={'single-tree'}
                    mapStyle={{height: 200}}
                    geometry={geometry}
                    geoLocation={geoLocation}
                    onPress={() => {
                      parentProps.openModel(props);
                    }}/>
                </View>
                <View>
                  {parentProps.mode === 'single-tree' && props.touched.geoLocation && props.errors.geoLocation && <Text style={styles.errorText}>{props.errors.geoLocation}</Text>}
                  {parentProps.mode === 'multiple-trees' && props.touched.geometry && props.errors.geometry && <Text style={styles.errorText}>{props.errors.geometry}</Text>}
                </View>
              </View>
              <View style={styles.formAddImageBlock}>
                <AddImage
                  image={props.values.imageFile}
                  setFieldValue={props.setFieldValue}
                />
              </View>
              {!isMultipleTree && <View>
                <View style={styles.formSwitchView}>
                  <Text style={styles.formClassificationLabel}>
                    {i18n.t('label.add_classification')}
                  </Text>
                  <View>
                    <CustomSwitch
                      value={showClassification}
                      onChange={setShowClassificationSwitch}
                    />
                  </View>
                </View>
                <View>
                  {showClassification && (
                    <View style={styles.classificationBlock}>
                      <View style={styles.formClassificationFields}>
                        <TextField
                          label={i18n.t('label.tree_classification')}
                          value={props.values.treeClassifications}
                          tintColor={'#89b53a'}
                          titleFontSize={12}
                          returnKeyType="next"
                          lineWidth={1}
                          blurOnSubmit={false}
                          labelTextStyle={{fontFamily: 'OpenSans-Regular'}}
                          titleTextStyle={{fontFamily: 'OpenSans-Regular'}}
                          affixTextStyle={{fontFamily: 'OpenSans-Regular'}}
                          onChangeText={props.handleChange('treeClassifications')}
                          onBlur={props.handleBlur('treeClassifications')}
                        />
                      </View>
                      <View style={{flex: 1}}>
                        <TextField
                          label={i18n.t('label.tree_scientific_name')}
                          value={props.values.treeScientificName}
                          tintColor={'#89b53a'}
                          titleFontSize={12}
                          returnKeyType="next"
                          lineWidth={1}
                          blurOnSubmit={false}
                          labelTextStyle={{fontFamily: 'OpenSans-Regular'}}
                          titleTextStyle={{fontFamily: 'OpenSans-Regular'}}
                          affixTextStyle={{fontFamily: 'OpenSans-Regular'}}
                          onChangeText={props.handleChange('treeScientificName')}
                          onBlur={props.handleBlur('treeScientificName')}
                        />
                      </View>
                    </View>
                  )}
                </View>
                <AddMeasurements props={props}/>

              </View>}

              {parentProps.isTpo ? (
                parentProps.plantProjects.length > 0 ? (
                  <Dropdown
                    value={props.values.plantProject}
                    onChangeText={props.handleChange('plantProject')}
                    onBlur={props.handleBlur('plantProject')}
                    label={i18n.t('label.plant_project')}
                    data={parentProps.plantProjects.map(item => {
                      return {value: item.value, label: item.text};
                    })}
                  />
                ) : <View/>
              ) : <View/>}
            </KeyboardAwareScrollView>
            <View style={buttonStyles.buttonContainer}>
              <TouchableOpacity
                style={buttonStyles.actionButtonTouchable}
                onPress={props.handleSubmit}
              >
                <View style={buttonStyles.actionButtonView}>
                  <Text style={buttonStyles.actionButtonText}>
                    {i18n.t('label.register')}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {console.log({FormProps:props, parentProps})}
        </>
      )}
    </Formik>
  );
};

export class AddMeasurements extends React.Component {
  constructor(props) {
    super(props);
    this.counter = 1;
    this.state = {
      switchValue: false,
      counter: 1,
      measurementView: [{
        isVisible: false,
        id: 1
      }],
      showMeasurement: false
    };
    this._addMeasurementView();
  }

  _addMeasurementView = (val, index) => {
    const {measurementView} = this.state;
    if (val) {
      let ele = measurementView;
      if (ele[index]) {
        ele[index].isVisible = val;
      }
      // NOTE:
      // check is last switch is enabled, if yes add new item
      // temporary commented logic for add dynamic fields
      // eslint-disable-next-line no-constant-condition
      if ((index + 1) === this.counter && false) {
        this.counter++;

        ele.push({
          isVisible: false,
          id: this.counter
        });
      }
      this.setState({
        measurementView: ele
      });
    } else {
      if (measurementView[index]) {
        measurementView[index].isVisible = val;
        this.setState({
          measurementView
        });
      }
    }
  };

  render() {
    const {measurementView} = this.state;
    const {props} = this.props;
    return (
      <View>
        {measurementView.map((item, index) => {
          return (
            <View key={item.id}>
              <View style={styles.formSwitchView}>
                <Text style={styles.formClassificationLabel}>
                  {i18n.t('label.add_measurements') + (item.id <= 1 ? '' : item.id)}
                </Text>
                <View>
                  <CustomSwitch
                    value={item.isVisible}
                    onChange={val => {
                      this._addMeasurementView(val, index);
                    }}
                  />
                </View>
              </View>

              <View>
                {item.isVisible && (
                  <View>
                    <View style={styles.classificationBlock}>
                      <View style={styles.formClassificationFields}>
                        <TextField
                          label={i18n.t('label.tree_diameter')}
                          value={props.values.treeDiameter}
                          tintColor={'#89b53a'}
                          titleFontSize={12}
                          returnKeyType="next"
                          lineWidth={1}
                          blurOnSubmit={false}
                          keyboardType="numeric"
                          labelTextStyle={{fontFamily: 'OpenSans-Regular'}}
                          titleTextStyle={{fontFamily: 'OpenSans-Regular'}}
                          affixTextStyle={{fontFamily: 'OpenSans-Regular'}}
                          renderRightAccessory={() => (
                            <Text style={{fontSize: 16, color: '#4d5153'}}>
                              cm
                            </Text>
                          )}
                          error={props.touched.treeDiameter && props.errors.treeDiameter}
                          onChangeText={props.handleChange('treeDiameter')}
                          onBlur={props.handleBlur('treeDiameter')}
                        />
                      </View>
                      <View style={{flex: 1}}>
                        <TextField
                          label={i18n.t('label.tree_height')}
                          value={props.values.treeHeight}
                          tintColor={'#89b53a'}
                          titleFontSize={50}
                          labelFontSize={12}
                          returnKeyType="next"
                          renderRightAccessory={() => (
                            <Text style={{fontSize: 16, color: '#4d5153'}}>
                              meter
                            </Text>
                          )}
                          prefix={''}
                          keyboardType="numeric"
                          lineWidth={1}
                          blurOnSubmit={false}
                          labelTextStyle={{fontFamily: 'OpenSans-Regular'}}
                          titleTextStyle={{fontFamily: 'OpenSans-Regular'}}
                          affixTextStyle={{fontFamily: 'OpenSans-Regular'}}
                          error={props.touched.treeHeight && props.errors.treeHeight}
                          onChangeText={props.handleChange('treeHeight')}
                          onBlur={props.handleBlur('treeHeight')}
                        />
                      </View>
                    </View>
                    <View style={{width: '47%', paddingTop: 20}}>
                      <CompetitionDatePicker
                        endDate={props.values.treeMeasurementData}
                        label={i18n.t('label.measurement_date')}
                        setFieldValue={props.setFieldValue}
                        touched={props.touched.treeMeasurementData}
                        errors={props.errors.treeMeasurementData}
                      />
                    </View>
                  </View>
                )}
              </View>
            </View>
          )
        })}

      </View>
    );
  }
}

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
        itemTextStyle={{fontFamily: 'OpenSans-Regular'}}
        labelTextStyle={{fontFamily: 'OpenSans-Regular'}}
      />
    </View>
  );
}

export class CustomSwitch extends React.Component {

  render() {
    return (
      <View>
        <Switch
          value={this.props.value}
          onValueChange={this.props.onChange}
          disabled={false}
          circleSize={22}
          barHeight={16}
          circleBorderWidth={0}
          backgroundActive={'#d9e7bf'}
          backgroundInactive={'#c7c7c7'}
          circleActiveColor={'#89b53a'}
          innerCircleStyle={
            this.props.value ? '' : styles.masurmentSwitch
          }
          circleInActiveColor={'#ffffff'}
          outerCircleStyle={{}} // style for outer animated circle
          switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
          switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
          switchWidthMultiplier={2} // multipled by the `circleSize` prop to calculate total width of the Switch
        />
      </View>
    );
  }
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
          <Image style={styles.competitionDeleteImage} source={circleDelete}/>
        </TouchableOpacity>
        <Image
          style={styles.teaser__projectImage}
          source={{uri: image}}
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
          <Image style={styles.addImageButtonIcon} source={imageGallery}/>
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
          <Image style={styles.addImageButtonIcon} source={cameraSolid}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function CompetitionDatePicker(props) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  return (
    <View>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <View>
          <Text style={styles.labelEndDate}>{props.label}</Text>
          <Text style={styles.EndDate}>
            {formatDate(formatDateToMySQL(props.endDate))}
          </Text>
          {props.errors && props.errors.endDate ? (
            <Text>{props.errors.endDate}</Text>
          ) : null}
        </View>
        <View style={styles.datePickerUnderline}/>
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
/* eslint-disable no-underscore-dangle,react-native/no-color-literals */
import React, { useState, useEffect, useRef } from 'react';
import {
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback
} from 'react-native';
import { Switch } from 'react-native-switch';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Formik } from 'formik';
import { TextField } from 'react-native-material-textfield';
import ImagePicker from 'react-native-image-picker';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import { filter } from 'lodash';
import { debug } from '../../debug';
import { cameraSolid, imageGallery, deleteOutlineWhite } from '../../assets';
import styles from '../../styles/register_trees.native';
import { formatDateToMySQL } from './../../helpers/utils';
import { formatDate } from './../../utils/utils';
import i18n from '../../locales/i18n';
import schemaOptionsMultiple from '../../server/formSchemas/registerTrees';
import { generateFormikSchemaFromFormSchema } from '../../helpers/utils';
import buttonStyles from '../../styles/common/button.native';
import NativeMapView from '../Map/NativeMapView.native';
import CardLayout from '../Common/Card';
import { getImageUrl } from '../../actions/apiRouting';
import colors from '../../utils/contants';

export const FormikFormTree = props => {
  const [showClassification, setShowClassificationSwitch] = useState(
    (props.initialValues &&
      (props.initialValues.treeClassification ||
        props.initialValues.treeScientificName)) ||
    false
  );
  const [geometry, setGeometry] = useState(props.geometry);
  const [geoLocation, setGeoLocation] = useState(props.geoLocation);
  const [initValue, setInitValue] = useState(props.initialValues);
  useEffect(() => {
    setGeometry(props.geometry);
  }, [props.geometry]);
  useEffect(() => {
    setInitValue(props.initialValues);
  }, [props]);
  useEffect(() => {
    setGeoLocation(props.geoLocation);
  }, [props.geoLocation]);

  const parentProps = props;
  const isMultipleTree = props.mode === 'multiple-trees';

  const validationSchema = generateFormikSchemaFromFormSchema(
    isMultipleTree
      ? schemaOptionsMultiple.multiple_trees
      : schemaOptionsMultiple.single_tree
  );
  let inputs = [];
  const inputEl = useRef(null);

  // function to focus the field
  function focusTheField(id) {
    inputs[id].focus();
  }
  const isContributionImage = props => {
    if (parentProps.isEdit) {
      const contributImage =
        props.values.contributionImages &&
          props.values.contributionImages.length &&
          props.values.contributionImages[0] &&
          props.values.contributionImages[0].image
          ? props.values.contributionImages[0].image
          : '';
      return (
        (contributImage &&
          getImageUrl('contribution', 'medium', contributImage)) ||
        (props.values.contributionImages &&
          props.values.contributionImages.length &&
          props.values.contributionImages[0].imageFile
          ? props.values.contributionImages[0].imageFile
          : '')
      );
    } else {
      return props.values.contributionImages &&
        props.values.contributionImages.length &&
        props.values.contributionImages[0].imageFile
        ? props.values.contributionImages[0].imageFile
        : '';
    }
  };

  return (
    <Formik
      initialValues={initValue}
      initialStatus={initValue}
      onSubmit={parentProps.onCreateCompetition}
      validationSchema={validationSchema}
      isInitialValid={!!parentProps.isEdit}
      mapPropsToStatus={initValue}
    >
      {props => (
        <>
          <View>
            <View style={styles.formScrollView}>
              <CardLayout style={{ marginTop: 9 }}>
                {!parentProps.isEdit && parentProps.isTpo ? (
                  parentProps.plantProjects &&
                    parentProps.plantProjects.length > 0 ? (
                      <View
                        style={{
                          marginTop: 10,
                          marginBottom: 10,
                          position: 'relative'
                        }}
                      >
                        <View>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: 'OpenSans-Regular',
                              color: '#4d5153'
                            }}
                          >
                            {i18n.t('label.register_tree_tpo_label')}{' '}
                            <TouchableWithoutFeedback
                              onPress={() => {
                                inputEl &&
                                  inputEl.current &&
                                  inputEl.current.focus();
                              }}
                            >
                              <Text
                                style={{
                                  color: '#87b738',
                                  fontFamily: 'OpenSans-Regular',
                                  textAlign: 'center'
                                }}
                              >
                                {!props.values.plantProject &&
                                  parentProps.plantProjects.length >= 1
                                  ? parentProps.plantProjects[0].text
                                  : filter(parentProps.plantProjects, {
                                    value: props.values.plantProject
                                  })[0].text}{' '}
                                <Icon
                                  name="angle-down"
                                  size={20}
                                  color="#87b738"
                                />
                              </Text>
                            </TouchableWithoutFeedback>
                          </Text>
                        </View>
                        <Dropdown
                          value={
                            props.values.plantProject ||
                            (parentProps.plantProjects.length >= 1 &&
                              parentProps.plantProjects[0].value)
                          }
                          ref={inputEl}
                          containerStyle={{
                            height: 0,
                            position: 'absolute',
                            top: 0,
                            width: '100%'
                          }}
                          onChangeText={props.handleChange('plantProject')}
                          onBlur={props.handleBlur('plantProject')}
                          inputContainerStyle={{
                            borderBottomWidth: 0,
                            display: 'none'
                          }}
                          label={i18n.t('label.plant_project')}
                          dropdownOffset={{ top: 0 }}
                          data={parentProps.plantProjects.map(item => {
                            return { value: item.value, label: item.text };
                          })}
                        />
                      </View>
                    ) : (
                      <View />
                    )
                ) : (
                    <View />
                  )}
                <View style={styles.formView}>
                  <View>
                    <View
                      style={!isMultipleTree ? styles.formHalfTextField : ''}
                    >
                      <View
                        style={!isMultipleTree ? styles.formNameFields : ''}
                      >
                        <TextField
                          ref={input => {
                            inputs['treeSpecies'] = input;
                          }}
                          onSubmitEditing={() => {
                            (isMultipleTree && focusTheField('treeCount')) ||
                              (showClassification &&
                                focusTheField('treeClassifications'));
                          }}
                          label={i18n.t('label.trees_name')}
                          value={props.values.treeSpecies}
                          tintColor={'#4d5153'}
                          titleFontSize={12}
                          labelFontSize={12}
                          fontSize={18}
                          returnKeyType="next"
                          lineWidth={1}
                          blurOnSubmit={false}
                          labelTextStyle={styles.textFiledLabel}
                          titleTextStyle={styles.textFieldTitle}
                          textColor={'#4d5153'}
                          error={
                            props.touched.treeSpecies &&
                            props.errors.treeSpecies
                          }
                          onChangeText={props.handleChange('treeSpecies')}
                          onBlur={props.handleBlur('treeSpecies')}
                        />
                      </View>
                      <View
                        style={
                          isMultipleTree
                            ? styles.formHalfTextField
                            : { flex: 1 }
                        }
                      >
                        {parentProps.mode === 'multiple-trees' && (
                          <View
                            style={isMultipleTree ? styles.formNameFields : ''}
                          >
                            <TextField
                              label={i18n.t('label.number_of_trees')}
                              ref={input => {
                                inputs['treeCount'] = input;
                              }}
                              onSubmitEditing={() => {
                                showClassification &&
                                  focusTheField('treeClassifications');
                              }}
                              value={'' + props.values.treeCount}
                              keyboardType="numeric"
                              tintColor={'#4d5153'}
                              titleFontSize={12}
                              labelFontSize={12}
                              fontSize={18}
                              returnKeyType="next"
                              lineWidth={1}
                              textColor={'#4d5153'}
                              blurOnSubmit={false}
                              labelTextStyle={styles.textFiledLabel}
                              titleTextStyle={styles.textFieldTitle}
                              error={
                                props.touched.treeCount &&
                                props.errors.treeCount
                              }
                              onChangeText={props.handleChange('treeCount')}
                              onBlur={props.handleBlur('treeCount')}
                            />
                          </View>
                        )}

                        <View style={isMultipleTree ? { flex: 1 } : ''}>
                          <CompetitionDatePicker
                            endDate={props.values.plantDate}
                            label={i18n.t('label.plant_date')}
                            setFieldValue={date =>
                              props.setFieldValue('plantDate', date)
                            }
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
                    {parentProps.mode === 'multiple-trees'
                      ? i18n.t(
                        'label.single_tree_planting_location_description'
                      )
                      : i18n.t(
                        'label.single_tree_planting_location_description'
                      )}
                  </Text>
                </View>
              </CardLayout>
              <View>
                <View
                  style={
                    (parentProps.mode === 'single-tree' &&
                      props.touched.geoLocation &&
                      props.errors.geoLocation) ||
                      (parentProps.mode === 'multiple-trees' &&
                        props.touched.geometry &&
                        props.errors.geometry)
                      ? styles.errorView
                      : ''
                  }
                >
                  <NativeMapView
                    mode={'single-tree'}
                    mapStyle={{ height: 200 }}
                    geometry={geometry}
                    address={parentProps.address}
                    geoLocation={geoLocation}
                    onPress={() => {
                      parentProps.openModel(props);
                    }}
                  />
                </View>
                <View>
                  {parentProps.mode === 'single-tree' &&
                    props.touched.geoLocation &&
                    props.errors.geoLocation && (
                      <Text style={styles.errorText}>
                        {props.errors.geoLocation}
                      </Text>
                    )}
                  {parentProps.mode === 'multiple-trees' &&
                    props.touched.geometry &&
                    props.errors.geometry && (
                      <Text style={styles.errorText}>
                        {props.errors.geometry}
                      </Text>
                    )}
                </View>
              </View>
              <CardLayout>
                <View style={styles.formAddImageBlock}>
                  <AddImage
                    image={isContributionImage(props)}
                    setFieldValue={props.setFieldValue}
                  />
                </View>
                {!isMultipleTree && (
                  <View>
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
                        <View>
                          <View style={styles.formClassificationFields}>
                            <TextField
                              label={i18n.t('label.tree_classification')}
                              ref={input => {
                                inputs['treeClassifications'] = input;
                              }}
                              onSubmitEditing={() => {
                                focusTheField('treeScientificName');
                              }}
                              value={props.values.treeClassification}
                              tintColor={'#4d5153'}
                              titleFontSize={12}
                              labelFontSize={12}
                              fontSize={18}
                              returnKeyType="next"
                              lineWidth={1}
                              textColor={'#4d5153'}
                              multiline
                              blurOnSubmit={false}
                              labelTextStyle={styles.textFiledLabel}
                              titleTextStyle={styles.textFieldTitle}
                              onChangeText={props.handleChange(
                                'treeClassification'
                              )}
                              onBlur={props.handleBlur('treeClassification')}
                            />
                          </View>
                          <View style={{ flex: 1 }}>
                            <TextField
                              label={i18n.t('label.tree_scientific_name')}
                              ref={input => {
                                inputs['treeScientificName'] = input;
                              }}
                              value={props.values.treeScientificName}
                              tintColor={'#4d5153'}
                              titleFontSize={12}
                              labelFontSize={12}
                              labelHeight={50}
                              fontSize={18}
                              returnKeyType="next"
                              lineWidth={1}
                              blurOnSubmit={false}
                              textColor={'#4d5153'}
                              labelTextStyle={styles.textFiledLabel}
                              titleTextStyle={styles.textFieldTitle}
                              onChangeText={props.handleChange(
                                'treeScientificName'
                              )}
                              onBlur={props.handleBlur('treeScientificName')}
                            />
                          </View>
                        </View>
                      )}
                    </View>
                    <AddMeasurements
                      props={props}
                      textFiledRef={(name, input) => {
                        inputs[name] = input;
                      }}
                      handleChange={value => {
                        props.setFieldValue('contributionMeasurements', value);
                      }}
                      focusField={name => focusTheField(name)}
                    />
                  </View>
                )}
              </CardLayout>
            </View>
            <CardLayout style={styles.buttonContainer}>
              <View style={buttonStyles.buttonContainer}>
                <TouchableOpacity
                  style={buttonStyles.actionButtonTouchable}
                  onPress={props.handleSubmit}
                  disabled={!props.isValid}
                >
                  <View
                    style={
                      props.isValid
                        ? buttonStyles.actionButtonView
                        : buttonStyles.disabledButtonView
                    }
                  >
                    <Text style={buttonStyles.actionButtonText}>
                      {parentProps.isEdit
                        ? i18n.t('label.update')
                        : i18n.t('label.register')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </CardLayout>
          </View>
        </>
      )}
    </Formik>
  );
};

export class AddMeasurements extends React.Component {
  constructor(props) {
    super(props);
    const contributionMeasurements =
      props.props &&
      props.props.values &&
      props.props.values.contributionMeasurements;

    this.counter = 1;
    this.elementMasument = contributionMeasurements || [];
    this.state = {
      switchValue: false,
      counter: 1,
      measurementView: [
        {
          isVisible: false,
          id: 1
        }
      ],
      showMeasurement: false,
      elementMasument: contributionMeasurements || []
    };
    debug(
      'props.props.value.contributionMeasurements',
      props.props &&
      props.props.values &&
      props.props.values.contributionMeasurements
    );
    if (contributionMeasurements) {
      contributionMeasurements.length &&
        contributionMeasurements.map((item, index) => {
          this._addMeasurementView(true, index, item, contributionMeasurements);
          debug('measurementView', this.state.elementMasument);
        });

      this._addMeasurementView();
    } else {
      this._addMeasurementView();
    }
  }

  _addMeasurementView = (val, index, defaultValue = null) => {
    const { measurementView } = this.state;
    if (val) {
      let ele = measurementView;
      if (ele[index]) {
        ele[index].isVisible = val;
      }
      // NOTE:
      // check is last switch is enabled, if yes add new item
      // temporary commented logic for add dynamic fields
      // eslint-disable-next-line no-constant-condition
      if (index + 1 === this.counter) {
        this.counter++;
        if (!defaultValue)
          this.elementMasument.push({
            diameter: 0,
            height: 0,
            measurementDate: formatDate(
              formatDateToMySQL(new Date()),
              'yyyy-MM-dd'
            )
          });

        ele.push({
          isVisible: false,
          id: defaultValue ? index + 1 : this.counter
        });
      }
      this.setState({
        measurementView: ele,
        elementMasument: this.elementMasument
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
  onChangeHandler = (field, value, index) => {
    debug('this.elementMasument', field, value, index);

    this.elementMasument[index][field] = value;
    this.setState({
      elementMasument: this.elementMasument
    });
    //this.props.handleChange(field, value);
    debug('this.elementMasument', this.elementMasument);
    this.props.handleChange(this.elementMasument);
  };

  render() {
    const { measurementView, elementMasument } = this.state;
    const { props } = this.props;
    return (
      <View key="form">
        {measurementView &&
          measurementView.map((item, index) => {
            return (
              <View key={item.id}>
                <View style={styles.formSwitchView}>
                  <Text style={styles.formClassificationLabel}>
                    {`${i18n.t('label.add_measurements')} ${
                      item.id <= 1 ? '' : item.id
                      }`}
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
                      <View style={[styles.classificationBlock]}>
                        <View
                          style={[
                            styles.formClassificationFields,
                            { marginRight: 10 }
                          ]}
                        >
                          <TextField
                            label={i18n.t('label.tree_diameter')}
                            value={
                              parseInt(elementMasument[index]['diameter']) ||
                              props.values.treeDiameter
                            }
                            onSubmitEditing={() => {
                              this.props.focusField('treeHeight');
                            }}
                            ref={input =>
                              this.props.textFiledRef('treeDiameter', input)
                            }
                            tintColor={'#4d5153'}
                            titleFontSize={12}
                            labelFontSize={12}
                            fontSize={18}
                            returnKeyType="next"
                            textColor={'#4d5153'}
                            lineWidth={1}
                            blurOnSubmit={false}
                            keyboardType="numeric"
                            labelTextStyle={styles.textFiledLabel}
                            titleTextStyle={styles.textFieldTitle}
                            renderRightAccessory={() => (
                              <Text style={{ fontSize: 16, color: '#4d5153' }}>
                                cm
                              </Text>
                            )}
                            error={
                              props.touched.treeDiameter &&
                              props.errors.treeDiameter
                            }
                            onChangeText={value =>
                              this.onChangeHandler(
                                'diameter',
                                parseInt(value),
                                index
                              )
                            }
                          />
                        </View>
                        <View
                          style={[
                            styles.formClassificationFields,
                            { marginLeft: 10 }
                          ]}
                        >
                          <TextField
                            label={i18n.t('label.tree_height')}
                            value={
                              parseInt(elementMasument[index]['height']) ||
                              props.values.treeHeight
                            }
                            ref={input =>
                              this.props.textFiledRef('treeHeight', input)
                            }
                            tintColor={'#4d5153'}
                            fontSize={18}
                            titleFontSize={12}
                            labelFontSize={12}
                            textColor={'#4d5153'}
                            returnKeyType="next"
                            renderRightAccessory={() => (
                              <Text style={{ fontSize: 16, color: '#4d5153' }}>
                                meter
                              </Text>
                            )}
                            prefix={''}
                            keyboardType="numeric"
                            lineWidth={1}
                            blurOnSubmit={false}
                            labelTextStyle={styles.textFiledLabel}
                            titleTextStyle={styles.textFieldTitle}
                            error={
                              props.touched.treeHeight &&
                              props.errors.treeHeight
                            }
                            onChangeText={value =>
                              this.onChangeHandler(
                                'height',
                                parseInt(value),
                                index
                              )
                            }
                          />
                        </View>
                      </View>
                      <View style={{ width: '47%', paddingTop: 20 }}>
                        <CompetitionDatePicker
                          endDate={
                            elementMasument[index]['measurementDate'] ||
                            new Date()
                          }
                          label={i18n.t('label.measurement_date')}
                          setFieldValue={value =>
                            this.onChangeHandler(
                              'measurementDate',
                              value,
                              index
                            )
                          } //props.setFieldValue}
                          touched={props.touched.contributionMeasurements}
                          errors={props.errors.contributionMeasurements}
                        />
                      </View>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
      </View>
    );
  }
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
          barHeight={Platform.OS === 'ios' ? 16 : 27}
          circleBorderWidth={0}
          backgroundActive={'#d9e7bf'}
          backgroundInactive={'#c7c7c7'}
          circleActiveColor={'#89b53a'}
          innerCircleStyle={this.props.value ? '' : styles.masurmentSwitch}
          circleInActiveColor={colors.WHITE}
          outerCircleStyle={{}} // style for outer animated circle
          switchLeftPx={Platform.OS === 'ios' ? 2 : 3} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
          switchRightPx={Platform.OS === 'ios' ? 2 : 3} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
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

  const renderAsset = (image, index) => {
    debug('Images====>', image);
    return (
      <View key={index} style={[{ position: 'relative', marginRight: 8 }]}>
        <Image
          style={[styles.teaser__projectImage, { width: '95%', height: 150 }]}
          source={{ uri: image }}
        // resizeMode={'cover'}
        />
        <View style={[styles.competitionDeleteButton]}>
          <TouchableOpacity
            onPress={() => props.setFieldValue('contributionImages', [])}
            style={styles.addDeleteButtonIcon}
          >
            <Image
              style={{ height: 28, width: 28 }}
              source={deleteOutlineWhite}
            />
            <Text
              style={{
                color: colors.WHITE,
                fontFamily: 'OpenSans-Regular',
                fontSize: 14,
                lineHeight: 28
              }}
            >
              Remove
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.addImageTitle}>{i18n.t('label.add_images')}</Text>
      {image && image != 'null' ? renderAsset(image) : null}
      <View style={styles.addImageButtonContainer}>
        <TouchableOpacity
          style={styles.addImageButton1}
          onPress={() => {
            ImagePicker.launchImageLibrary(options, response => {
              if (response.didCancel) {
                debug('User cancelled image picker');
              } else if (response.error) {
                debug('ImagePicker Error: ', response.error);
              } else {
                props.setFieldValue('contributionImages', [
                  {
                    imageFile: 'data:image/jpeg;base64,' + response.data
                  }
                ]);
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
                debug('User cancelled image picker');
              } else if (response.error) {
                debug('ImagePicker Error: ', response.error);
              } else {
                props.setFieldValue('contributionImages', [
                  {
                    imageFile: 'data:image/jpeg;base64,' + response.data
                  }
                ]);
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
    <View>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <View>
          <Text style={styles.labelEndDate}>{props.label}</Text>
          <Text style={styles.EndDate}>
            {formatDate(formatDateToMySQL(new Date(props.endDate)))}
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
            props.setFieldValue(
              formatDate(formatDateToMySQL(new Date(date)), 'yyyy-MM-dd')
            );
        }}
        date={new Date(props.endDate)}
        onCancel={() => setShowDatePicker(false)}
        maximumDate={new Date()}
        minimumDate={new Date('1/01/2006')}
        titleIOS={i18n.t('label.datePickerTitle')}
        cancelTextIOS={i18n.t('label.datePickerCancel')}
        confirmTextIOS={i18n.t('label.datePickerConfirm')}
        pickerContainerStyleIOS={{ color: '#89B53A' }}
      />
    </View>
  );
}

/* eslint-disable react-native/no-color-literals */
import React, { PureComponent } from 'react';
// import t from 'tcomb-form-native';
import { Text, View, Linking, Alert, Platform } from 'react-native';
import Modal from 'react-native-modalbox';
import PropTypes from 'prop-types';
import { FormikFormTree } from './formComponents.native';
import MapboxMap from '../Map/NativeMapView.native';

import i18n from '../../locales/i18n';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TouchableItem from '../../components/Common/TouchableItem';
import PopupNative from '../Common/ModalDialog/Popup.native';
import { updateRoute } from '../../helpers/routerHelper';
import { context } from '../../config';

const { host, scheme } = context;
const backgroundColor = 'white';
let isVisible = false;
export default class RegisterTreeTab extends PureComponent {
  constructor(props) {
    super(props);
    const defaultSingleInitValue = {
      plantDate: (props.value && props.value.plantDate) || new Date(),
      treeClassification: (props.value && props.value.treeClassification) || '',
      treeSpecies: (props.value && props.value.treeSpecies) || '',
      treeScientificName: (props.value && props.value.treeScientificName) || '',
      treeCount: (props.value && props.value.treeCount) || 1,
      contributionMeasurements:
        (props.value && props.value.contributionMeasurements) || [],
      contributionImages: (props.value && props.value.contributionImages) || [],
      geoLocation: '',
      plantProject: props.isTpo
        ? props.plantProjects.length > 0
          ? props.plantProjects[0].value
          : ''
        : '',
    };
    const defaultMultipleInitValue = {
      plantDate: (props.value && props.value.plantDate) || new Date(),
      treeSpecies: (props.value && props.value.treeSpecies) || '',
      treeCount: (props.value && props.value.treeCount) || 5,
      contributionImages: (props.value && props.value.contributionImages) || [],
      geoLocation: (props.value && props.value.geoLocation) || '',
      plantProject: props.isTpo
        ? props.plantProjects.length > 0
          ? props.plantProjects[0].value
          : ''
        : '',
    };
    this.state = {
      plantProject: props.isTpo
        ? props.plantProjects.length > 0
          ? props.plantProjects[0].value
          : ''
        : '',
      defaultSingleInitValue: defaultSingleInitValue,
      defaultMultipleInitValue: defaultMultipleInitValue,

      defaultValue:
        props.mode === 'single-tree'
          ? defaultSingleInitValue
          : defaultMultipleInitValue,

      isOpen: false,
      mode: props.mode,
      //  geometry: (props.value && props.value.geometry) || null,
      geoLocation: (props.value && props.value.geoLocation) || null,
      showAddProjectModel:
        !props.isEdit &&
        props.isTpo &&
        props.plantProjects &&
        props.plantProjects.length <= 0
    };
    // this.isVisiable = false;
    // isAndroid() && this.alertBox(this.state.showAddProjectModel)
  }

  componentDidMount() {
    Platform.OS === 'android' &&
      !isVisible &&
      this.alertBox(this.state.showAddProjectModel);
  }

  alertBox = showAddProjectModel => {
    isVisible = true;
    return setTimeout(() => {
      showAddProjectModel &&
        Alert.alert(
          i18n.t('label.register_tree_tpo_no_plant_project_header'),
          i18n.t('label.register_tree_tpo_no_plant_project_description'),
          [
            {
              text: i18n.t('label.go_back'),
              onPress: () => updateRoute('app_userHome', this.props.navigation)
            },

            {
              text: i18n.t('label.add_project'),
              onPress: () =>
                Linking.openURL(`${scheme}://${host}/manage-plant-projects`)
            }
          ],
          { cancelable: false }
        );
    }, 1500);
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      mode: nextProps.mode
    });
  }

  openModel = formProps => {
    // if (!isEqual(this.formProps, formProps)) {
    this.formProps = formProps;
    this.renderFullscreenMap = (
      <MapboxMap
        mode={'single-tree'}
        /*geometry={
          this.formProps && this.formProps.values
            ? this.formProps.values.geometry
            : null
        }*/
        geoLocation={
          this.formProps && this.formProps.values
            ? this.formProps.values.geoLocation
            : null
        }
        mapStyle={{ flex: 1, opacity: 1 }}
        fullScreen
        onContinue={(geoLocation, geometry, mode, address) => {
          this.onModelClosed(geoLocation, geometry, mode, address);
        }}
      />
    );
    // }
    this.setState({
      isOpen: true
    });
  };

  onModelClosed = (geoLocation, geometry, mode, address = null) => {
    this.setState(
      {
        geoLocation: geoLocation,
        //geometry: geometry,
        address,
        isOpen: false
      },
      () => {
        if (this.formProps) {
          this.formProps.setFieldValue('geoLocation', geoLocation);
          //this.formProps.setFieldValue('geometry', geometry);
        }
      }
    );
  };
  onClosed = () => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    const {
      isOpen,
      geometry,
      geoLocation,
      defaultValue,
      address,
      showAddProjectModel
    } = this.state;
    /*if (geometry) {
      defaultValue.geometry = geometry;
    }*/
    if (geoLocation) {
      defaultValue.geoLocation = geoLocation;
    }

    return (
      <View style={{ backgroundColor: backgroundColor, flex: 1 }}>
        {this.state.mode === 'single-tree' ? (
          <FormikFormTree
            onCreateCompetition={value => {
              if (this.props.onRegister) {
                this.props.onRegister(
                  this.props.mode,
                  value,
                  this.state.plantProject === ''
                    ? null
                    : value.plantProject
                );
              }
            }}
            {...this.props}
            isTpo={this.props.isTpo}
            isEdit={this.props.isEdit}
            mode={this.props.mode}
            plantProjects={this.props.plantProjects || ''}
            geometry={geometry}
            address={address}
            geoLocation={geoLocation}
            initialValues={this.state.defaultSingleInitValue}
            openModel={formProps => this.openModel(formProps)}
          />
        ) : (
          this.state.mode === 'multiple-trees' && (
            <FormikFormTree
              onCreateCompetition={value => {
                if (this.props.mode === 'single-tree') {
                  //  value.geometry = undefined;
                  // delete value.geometry;
                } else {
                  // value.geometry = JSON.stringify(value.geometry);
                }
                if (this.props.onRegister) {
                  this.props.onRegister(
                    this.props.mode,
                    value,
                    this.state.plantProject === ''
                      ? null
                      : this.state.plantProject
                  );
                }
              }}
              isTpo={this.props.isTpo}
              isEdit={this.props.isEdit}
              {...this.props}
              mode={this.props.mode}
              plantProjects={this.props.plantProjects || ''}
              geometry={geometry}
              address={address}
              geoLocation={geoLocation}
              initialValues={this.state.defaultMultipleInitValue}
              openModel={formProps => this.openModel(formProps)}
            />
          )
        )}
        {Platform.OS === 'ios' && (
          <PopupNative
            isOpen={showAddProjectModel}
            headerText={i18n.t(
              'label.register_tree_tpo_no_plant_project_header'
            )}
            bodyText={
              <Text
                style={{
                  fontFamily: 'OpenSans-Regular',
                  fontSize: 14,
                  lineHeight: 26
                }}
              >
                {i18n.t('label.register_tree_tpo_no_plant_project_description')}
              </Text>
            }
            onCancel={() => {
              updateRoute('app_userHome', this.props.navigation);
            }}
            cancelText={i18n.t('label.go_back')}
            applyText={i18n.t('label.add_project')}
            onApply={() => {
              Linking.openURL(`${scheme}://${host}/manage-plant-projects`);
            }}
          />
        )}
        <Modal
          // position={'bottom'}
          isOpen={isOpen}
          position={'top'}
          onClosed={this.onClosed}
          backdropPressToClose={false}
          coverScreen
          keyboardTopOffset={0}
          swipeToClose={false}
        >
          <View
            style={{
              height: 70,
              opacity: 1
            }}
          >
            <TouchableItem
              // key={button.type}
              style={{
                height: 70
              }}
              onPress={this.onClosed}
            >
              <Icon
                name="keyboard-arrow-down"
                size={48}
                color="#4d5153"
                style={{
                  top: 40,
                  left: 18
                }}
              />
            </TouchableItem>
          </View>

          <View
            style={{
              paddingTop: 25,
              padding: 25,
              backgroundColor: 'white',
              position: 'relative'
            }}
          >
            <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                paddingBottom: 10,
                fontStyle: 'normal',
                lineHeight: 30,
                letterSpacing: 0,
                textAlign: 'left',
                color: '#4d5153'
              }}
            >
              {i18n.t('label.planting_location')}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontStyle: 'normal',
                lineHeight: 19,
                letterSpacing: 0,
                color: '#4d5153'
              }}
            >
              {i18n.t('label.planting_location_desc')}
            </Text>
          </View>
          {this.renderFullscreenMap}
        </Modal>
      </View>
    );
  }
}

RegisterTreeTab.propTypes = {
  mode: PropTypes.string.isRequired,
  onRegister: PropTypes.func,
  value: PropTypes.any,
  plantProjects: PropTypes.any,
  isTpo: PropTypes.bool,
  isEdit: PropTypes.bool
};

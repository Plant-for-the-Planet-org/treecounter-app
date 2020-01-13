/* eslint-disable react-native/no-color-literals */
import React, { PureComponent } from 'react';
// import t from 'tcomb-form-native';
import { Text, View, Linking } from 'react-native';
import Modal from 'react-native-modalbox';
import PropTypes from 'prop-types';
import { FormikFormTree } from './formComponents.native';
import MapboxMap from '../Map/NativeMapView.native';
import isEqual from 'lodash/isEqual';

import i18n from '../../locales/i18n';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TouchableItem from '../../components/Common/TouchableItem';
import PopupNative from '../Common/ModalDialog/Popup.native';
import {updateRoute} from '../../helpers/routerHelper';
import { context } from '../../config';

const { host, scheme } = context;
const backgroundColor = 'white';
const defaultInitValue = {
  plantDate: new Date(),
  treeClassification: '',
  treeSpecies: '',
  treeScientificName: '',
  treeDiameter: '',
  treeHeight: '',
  access: '',
  treeCount: 1,
  plantProject: '',
  treeMeasurementData: new Date(),
  imageFile: '',
  geoLocation: '',
  geometry: ''
};

export default class RegisterTreeTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      plantProject: props.isTpo
        ? props.plantProjects.length > 0
          ? props.plantProjects[0].value
          : ''
        : '',
      formValueSingle: props.value
        ? props.value
        : {
            treeCount: 1
          },
      formValueMultiple: props.value ? props.value : '',
      defaultValue: defaultInitValue,
      isOpen: false,
      geometry: null,
      geoLocation: null
    };
  }

  openModel = formProps => {
   // if (!isEqual(this.formProps, formProps)) {
      this.formProps = formProps;
      this.renderFullscreenMap = (
        <MapboxMap
          mode={'single-tree'}
          geometry={
            this.formProps && this.formProps.values
              ? this.formProps.values.geometry
              : null
          }
          geoLocation={
            this.formProps && this.formProps.values
              ? this.formProps.values.geoLocation
              : null
          }
          mapStyle={{ flex: 1, opacity: 1 }}
          fullScreen
          onContinue={(geoLocation, geometry,mode,address) => {
            this.onModelClosed(geoLocation, geometry,mode,address);
          }}
        />
      );
   // }
    this.setState({
      isOpen: true
    });
  };

  onModelClosed = (geoLocation, geometry,mode,address=null) => {
    this.setState(
      {
        geoLocation: geoLocation,
        geometry: geometry,
        address,
        isOpen: false
      },
      () => {
        if (this.formProps) {
          this.formProps.setFieldValue('geoLocation', geoLocation);
          this.formProps.setFieldValue('geometry', geometry);
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
    /*const schemaOptionsMultiple = {
      template: getFormLayoutTemplate(this.props.mode, this.props.isTpo),
      ...this.props.schemaOptions
    };*/
    const { isOpen, geometry, geoLocation, defaultValue,address } = this.state;
    if (geometry) {
      defaultValue.geometry = geometry;
    }
    if (geoLocation) {
      defaultValue.geoLocation = geoLocation;
    }
    return (
      <View style={{ backgroundColor: backgroundColor, flex: 1 }}>
        <FormikFormTree
          onCreateCompetition={value => {
            if (this.props.mode === 'single-tree') {
              value.geometry = undefined;
              // delete value.geometry;
            } else {
              value.geometry = JSON.stringify(value.geometry);
            }
            if (this.props.onRegister) {
              this.props.onRegister(
                this.props.mode,
                value,
                this.state.plantProject === '' ? null : this.state.plantProject
              );
            }
          }}
          isTpo={this.props.isTpo}
          mode={this.props.mode}
          plantProjects={this.props.plantProjects || ''}
          geometry={geometry}
          address={address}
          geoLocation={geoLocation}
          initialValues={this.state.defaultValue}
          openModel={formProps => this.openModel(formProps)}
        />
        <PopupNative
          isOpen={
            this.props.isTpo &&
            this.props.plantProjects &&
            this.props.plantProjects.length <= 0
          }
          headerText={i18n.t('label.register_tree_tpo_no_plant_project_header')}
          bodyText={i18n.t(
            'label.register_tree_tpo_no_plant_project_description'
          )}
          onCancel={() => {
            updateRoute('app_userHome', this.props.navigation.navigation)
          }}
          cancelText={i18n.t('label.go_back')}
          applyText={i18n.t('label.add_project')}
          onApply={() => {
            Linking.openURL(`${scheme}://${host}/manage-plant-projects`);
          }}
        />
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
  schemaType: PropTypes.any.isRequired,
  schemaOptions: PropTypes.any.isRequired,
  value: PropTypes.any,
  plantProjects: PropTypes.any,
  buttonTitle: PropTypes.string,
  isTpo: PropTypes.bool
};

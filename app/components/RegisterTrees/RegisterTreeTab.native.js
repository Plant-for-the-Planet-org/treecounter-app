/* eslint-disable react-native/no-color-literals */
import React, { PureComponent } from 'react';
// import t from 'tcomb-form-native';
import {Text, View} from 'react-native';
import Modal from 'react-native-modalbox';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FormikFormTree } from './formComponents.native';
import MapboxMap from '../Map/MapboxMap.native';
import i18n from '../../locales/i18n';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TouchableItem from '../../components/Common/TouchableItem';
const backgroundColor = 'white';
const defaultInitValue = {
  plantDate: new Date(new Date().valueOf() + 1000 * 3600 * 24),
  treeClassification: '',
  treeSpecies:'',
  treeScientificName: '',
  treeDiameter: '',
  treeHeight: '',
  access: '',
  treeCount:1,
  plantProject: '',
  treeMeasurementData: new Date(new Date().valueOf() + 1000 * 3600 * 24),
  imageFile: '',
  geoLocation:'',
  geometry:'',
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
      geoLocation: null,
    };
  }

  openModel = (formProps) => {
    this.formProps = formProps;
    this.setState({
      isOpen: true
    })
  };

  onModelClosed = (geoLocation, geometry) => {
    if(this.formProps){
      this.formProps.setFieldValue('geoLocation', geoLocation)
      this.formProps.setFieldValue('geometry', geometry)
    }
    this.setState({
      geoLocation: geoLocation,
      geometry: geometry,
      isOpen: false
    });
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
    const { isOpen, geometry, geoLocation, defaultValue } = this.state;
    if(geometry){
      defaultValue.geometry = geometry;
    }
    if(geoLocation){
      defaultValue.geoLocation = geoLocation;
    }
    return (
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps={'always'}
      >
        <View style={{ backgroundColor: backgroundColor, flex: 1 }}>
          <FormikFormTree
            onCreateCompetition={(value) => {
              if(this.props.mode === 'single-tree'){
                value.geometry= undefined;
                // delete value.geometry;
              }
              else {
                value.geometry= JSON.stringify(value.geometry)
              }
              console.log('value in RegisterTab:',value);
              if(this.props.onRegister){
                this.props.onRegister(this.props.mode, value, this.state.plantProject === '' ? null : this.state.plantProject);
              }
            }}
            isTpo={this.props.isTpo}
            mode={this.props.mode}
            plantProjects={this.props.plantProjects}
            geometry={geometry}
            geoLocation={geoLocation}
            initialValues={this.state.defaultValue}
            openModel={this.openModel}
          />
          <Modal
            // position={'bottom'}
            isOpen={isOpen}
            onClosed={this.onClosed}
            coverScreen
            swipeToClose={false}
          >
            <View style={{
              height: 80,  opacity: 1,
            }} >
              <TouchableItem
                // key={button.type}
                style={{
                  height: 80,
                }}
                onPress={this.onClosed}
              >
                <Icon name="keyboard-arrow-down" size={48} color="#4d5153" style={{
                  top: 50,
                  left: 18
                }}/>
              </TouchableItem>

            </View>

            <View style={{
              paddingTop: 25,
              padding: 25,
              backgroundColor: 'white',
              position: 'relative',
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
                }}>
                {i18n.t('label.planting_location_desc')}
              </Text>
            </View>
            <MapboxMap
              mode={'single-tree'}
              geometry={this.formProps && this.formProps.values ? this.formProps.values.geometry : null}
              geoLocation={this.formProps && this.formProps.values ? this.formProps.values.geoLocation : null}
              mapStyle={{ opacity: 1 }}
              fullScreen
              onContinue={(geoLocation, geometry) => {
                this.onModelClosed(geoLocation, geometry);
              }} />
          </Modal>
        </View>
      </KeyboardAwareScrollView>
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

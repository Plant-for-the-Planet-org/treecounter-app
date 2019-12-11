import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../Common/LoadingIndicator';
import PrimaryButton from '../Common/Button/PrimaryButton';
import CardLayout from '../Common/Card';
import i18n from '../../locales/i18n.js';
import TouchableItem from '../../components/Common/TouchableItem';
import {
  redeemSignIn, // Need to delete image from assets if not needed anywhere else
  redeemRed, // Need to delete image from assets if not needed anywhere else
  redeemGreen, // Need to delete image from assets if not needed anywhere else
  close_green, // Need to delete image from assets if not needed anywhere else
  redeemImage
} from '../../assets';
import styles from '../../styles/redeem';
import { View, Image, TextInput, Text, TouchableOpacity } from 'react-native';
import { updateRoute } from '../../helpers/routerHelper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextField } from 'react-native-material-textfield';
import PlantProjectSnippet from '../PlantProjects/PlantProjectSnippet.native';

export default class Redemption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.code
    };
    this.onChange = this.onChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.code });
  }
  onSetRedemption() {
    if (this.state.value) {
      this.props.setRedemptionCode(this.state.value);
    }
  }
  onValidationCode() {
    if (this.state.value) {
      this.props.validateCode(this.state.value);
    }
    console.log(this.props.tpos);
  }
  onChange(value) {
    this.setState({ value: value });
  }
  render() {
    let content,
      button,
      icon,
      errorText,
      successText,
      actionText,
      statusText,
      subheading,
      plantprojectSnippet,
      form = null;
    errorText = this.props.errorText ? (
      <Text style={styles.errorTextStyle}>{this.props.errorText}</Text>
    ) : null;
    successText = this.props.successText ? (
      <Text style={styles.descriptionTextStyle}>{this.props.successText}</Text>
    ) : null;
    actionText = this.props.actionText ? (
      <Text style={styles.descriptionTextStyle}>{this.props.actionText}</Text>
    ) : null;
    statusText = this.props.statusText ? (
      <Text style={styles.descriptionTextStyle}>{this.props.statusText}</Text>
    ) : null;
    content = (
      <View>
        {statusText}
        {successText}
        {actionText}
      </View>
    );
    if (
      this.props.pageStatus === 'code-validated' &&
      this.props.codeStatus === 'error'
    ) {
      button = (
        <TouchableOpacity
          style={styles.validateCodeButton}
          onPress={() => this.onValidationCode()}
        >
          <View style={styles.validateCodeButtonView}>
            <Text style={styles.validateCodeButtonText}>
              {i18n.t('label.validate_code')}
            </Text>
          </View>
        </TouchableOpacity>
      );
      icon = (
        <Image
          style={styles.imageStyle}
          resizeMode="contain"
          source={redeemImage}
        />
      );
      subheading = i18n.t('label.redeem_heading');
    } else if (this.props.pageStatus === 'code-unknown') {
      button = (
        <TouchableOpacity
          style={styles.validateCodeButton}
          onPress={() => this.onValidationCode()}
        >
          <View style={styles.validateCodeButtonView}>
            <Text style={styles.validateCodeButtonText}>
              {i18n.t('label.validate_code')}
            </Text>
          </View>
        </TouchableOpacity>
      );
      icon = (
        <Image
          style={styles.imageStyle}
          resizeMode="contain"
          source={redeemImage}
        />
      );
      subheading = i18n.t('label.redeem_heading');
    } else if (this.props.pageStatus === 'not-logged-in') {
      button = (
        <View style={styles.loginButtons}>
          <TouchableOpacity
            style={styles.validateCodeButton}
            onPress={this.props.loginButton}
          >
            <View style={styles.validateCodeButtonView}>
              <Text style={styles.validateCodeButtonText}>
                {i18n.t('label.login')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.validateCodeButton}
            onPress={this.props.signupButton}
          >
            <View style={styles.validateCodeButtonView}>
              <Text style={styles.validateCodeButtonText}>
                {i18n.t('label.signUp')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      button = (
        <TouchableOpacity
          style={styles.validateCodeButton}
          onPress={() => this.onSetRedemption()}
        >
          <View style={styles.validateCodeButtonView}>
            <Text style={styles.validateCodeButtonText}>Add to My Trees</Text>
          </View>
        </TouchableOpacity>
      );
      subheading = i18n.t(
        'Planted at Yucatan Reforestation by Plant-for-the-Planet'
      );
      // plantprojectSnippet = (
      //   <PlantProjectSnippet
      //   key={'projectFull' + this.props.plantProject.id}
      //   showMoreButton={false}
      //   clickable={false}
      //   plantProject={this.props.plantProject}
      //   onSelectClickedFeaturedProjects={id =>
      //     this.props.selectProject(id)
      //   }
      //   tpoName={tpo_name}
      // />
      // )
    }

    let value = this.state.value;
    if (this.props.pageStatus !== 'success') {
      let disabled = false;
      if (this.props.pageStatus === 'code-unknown') {
        disabled = false;
      } else {
        disabled = true;
      }
      const onCrossClick = () => {
        updateRoute('app_redeem', this.props.navigation, null, {
          code: null
        });
      };

      form = (
        <View>
          <TextField
            label={i18n.t('Please type Code to Redeem')}
            value={value}
            tintColor={'#89b53a'}
            titleFontSize={12}
            returnKeyType="next"
            lineWidth={1}
            blurOnSubmit={false}
            labelPadding={12}
            inputContainerPadding={12}
            onChangeText={value => this.onChange(value)}
            error={errorText}
            disabled={disabled}
          />
        </View>
      );
    } else {
      form = null;
      button = (
        <TouchableOpacity
          style={styles.validateCodeButton}
          onPress={() => updateRoute('app_myTrees', this.props.navigation)}
        >
          <View style={styles.validateCodeButtonView}>
            <Text style={styles.validateCodeButtonText}>Add to My Trees</Text>
          </View>
        </TouchableOpacity>
      );
    }
    let heading;
    if (this.props.path === 'redeem') {
      heading = i18n.t('label.redeem_trees');
    } else if (this.props.path === 'claim') {
      heading = i18n.t('label.claim_trees');
    }
    return this.props.loading ? (
      <View style={styles.loadingContainer}>
        <LoadingIndicator />
      </View>
    ) : (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            paddingBottom: 72,
            backgroundColor: '#fff'
          }}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          style={styles.keyboardScrollView}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
        >
          <View style={styles.parentContainer}>
            <View style={styles.cardContainer}>
              <Text style={styles.mainTitle}>{heading}</Text>
              <Text style={styles.titleText}>{subheading}</Text>
              {plantprojectSnippet}
            </View>
            <View style={styles.cardContainer}>
              {icon}
              <View style={{ marginTop: 40 }}>{form}</View>
              {/* {content} */}
              {button}
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

Redemption.propTypes = {
  pageStatus: PropTypes.string,
  code: PropTypes.string,
  isLoggedIn: PropTypes.any,
  route: PropTypes.func,
  setRedemptionCode: PropTypes.func,
  validateCode: PropTypes.func,
  loginButton: PropTypes.func,
  signupButton: PropTypes.func,
  path: PropTypes.string,
  loading: PropTypes.any,
  codeStatus: PropTypes.string,
  statusText: PropTypes.string,
  successText: PropTypes.string,
  errorText: PropTypes.string,
  actionText: PropTypes.string,
  buttonText: PropTypes.string,
  tpos: PropTypes.array,
  navigation: PropTypes.any
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../Common/LoadingIndicator';
import PrimaryButton from '../Common/Button/PrimaryButton';
import CardLayout from '../Common/Card';
import i18n from '../../locales/i18n.js';
import TouchableItem from '../../components/Common/TouchableItem';
import {
  redeemSignIn, // Need to delete images from assets
  redeemRed,
  redeemGreen,
  close_green,
  redeemImage
} from '../../assets';
import styles from '../../styles/redeem';
import { View, Image, TextInput, Text, TouchableOpacity } from 'react-native';
import { updateRoute } from '../../helpers/routerHelper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TabContainer from '../../containers/Menu/TabContainer';
import { TextField } from 'react-native-material-textfield';

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
  }
  onChange(value) {
    this.setState({ value: value });
  }
  render() {
    let content,
      button,
      errorText,
      successText,
      actionText,
      statusText,
      form,
      right_icon = null;
    errorText = this.props.errorText ? (
      <View>
        <Text style={styles.errorTextStyle}>{this.props.errorText}</Text>
      </View>
    ) : null;
    successText = this.props.successText ? (
      <View>
        <Text style={styles.descriptionTextStyle}>
          {this.props.successText}
        </Text>
      </View>
    ) : null;
    actionText = this.props.actionText ? (
      <View>
        <Text style={styles.descriptionTextStyle}>{this.props.actionText}</Text>
      </View>
    ) : null;
    statusText = this.props.statusText ? (
      <View>
        <Text style={styles.descriptionTextStyle}>{this.props.statusText}</Text>
      </View>
    ) : null;
    content = (
      <View>
        {errorText}
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
          onClick={() => this.onValidationCode()}
        >
          <View style={styles.validateCodeButtonView}>
            <Text style={styles.validateCodeButtonText}>
              {i18n.t('label.validate_code')}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else if (this.props.pageStatus === 'code-unknown') {
      button = (
        <TouchableOpacity
          style={styles.validateCodeButton}
          onClick={() => this.onValidationCode()}
        >
          <View style={styles.validateCodeButtonView}>
            <Text style={styles.validateCodeButtonText}>
              {i18n.t('label.validate_code')}
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else if (this.props.pageStatus === 'not-logged-in') {
      button = (
        <View style={styles.loginButtons}>
          <TouchableOpacity
            style={styles.validateCodeButton}
            onClick={this.props.loginButton}
          >
            <View style={styles.validateCodeButtonView}>
              <Text style={styles.validateCodeButtonText}>
                {i18n.t('label.login')}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.validateCodeButton}
            onClick={this.props.signupButton}
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
          onClick={() => this.onSetRedemption()}
        >
          <View style={styles.validateCodeButtonView}>
            <Text style={styles.validateCodeButtonText}>
              {this.props.buttonText}
            </Text>
          </View>
        </TouchableOpacity>
      );
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
      right_icon = disabled ? (
        <TouchableItem onPress={() => onCrossClick()}>
          <Image style={styles.glyphiconStyle} source={close_green} />
        </TouchableItem>
      ) : null;
      form = (
        <View style={styles.redeemInputView}>
          <TextInput
            style={styles.inputStyle}
            editable={!disabled}
            value={value}
            maxLength={20}
            onChangeText={evt => this.onChange(evt)}
            autoCapitalize={'sentences'}
          />
          {right_icon}
        </View>
      );
    } else {
      form = null;
      button = (
        <TouchableOpacity
          style={styles.validateCodeButton}
          onClick={() => updateRoute('app_myTrees', this.props.navigation)}
        >
          <View style={styles.validateCodeButtonView}>
            <Text style={styles.validateCodeButtonText}>
              {this.props.buttonText}
            </Text>
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
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            paddingBottom: 72,
            backgroundColor: '#fff'
          }}
        >
          <View style={styles.parentContainer}>
            <View style={styles.cardContainer}>
              <Text style={styles.mainTitle}>Redeem Trees</Text>
              <Text style={styles.titleText}>
                {i18n.t('label.redeem_heading')}
              </Text>
            </View>
            <View style={styles.cardContainer}>
              <Image
                style={styles.imageStyle}
                resizeMode="contain"
                source={redeemImage}
              />
              <View style={{ marginTop: 40 }}>
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
                  onChangeText={value => this.setState({ value })}
                />
              </View>
              {/* {form} */}

              {button}
            </View>
          </View>
        </KeyboardAwareScrollView>
        <TabContainer {...this.props} />
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

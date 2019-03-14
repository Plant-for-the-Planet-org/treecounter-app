import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../Common/LoadingIndicator';
import PrimaryButton from '../Common/Button/PrimaryButton';
import CardLayout from '../Common/Card';
import i18n from '../../locales/i18n.js';
import TouchableItem from '../../components/Common/TouchableItem';
import {
  redeemSignIn,
  redeemRed,
  redeemGreen,
  close_green
} from '../../assets';
import styles from '../../styles/redeem';
import { View, Image, TextInput, Text } from 'react-native';
import { updateRoute } from '../../helpers/routerHelper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TabContainer from '../../containers/Menu/TabContainer';

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
      icon,
      errorText,
      successText,
      actionText,
      statusText,
      form;
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
        <View style={styles.buttonStyle}>
          <PrimaryButton onClick={() => this.onValidationCode()}>
            {i18n.t('label.validate_code')}
          </PrimaryButton>
        </View>
      );
      icon = <Image style={styles.imageStyle} source={redeemRed} />;
      // icon = redeemRed;
    } else if (this.props.pageStatus === 'code-unknown') {
      button = (
        <View style={styles.buttonStyle}>
          <PrimaryButton onClick={() => this.onValidationCode()}>
            {i18n.t('label.validate_code')}
          </PrimaryButton>
        </View>
      );
      icon = <Image style={styles.imageStyle} source={redeemGreen} />;
    } else if (this.props.pageStatus === 'not-logged-in') {
      button = (
        <View style={styles.loginButtons}>
          <PrimaryButton
            style={styles.loginButton1}
            onClick={this.props.loginButton}
          >
            {i18n.t('label.login')}
          </PrimaryButton>
          <PrimaryButton
            style={styles.loginButton1}
            onClick={this.props.signupButton}
          >
            {i18n.t('label.signUp')}
          </PrimaryButton>
        </View>
      );
      icon = <Image style={styles.imageLoginStyle} source={redeemSignIn} />;
    } else {
      button = (
        <View style={styles.buttonStyle}>
          <PrimaryButton onClick={() => this.onSetRedemption()}>
            {this.props.buttonText}
          </PrimaryButton>
        </View>
      );
      icon = <Image style={styles.imageStyle} source={redeemGreen} />;
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
      let right_icon = disabled ? (
        <TouchableItem
          style={styles.glyphiconTouch}
          onPress={() => onCrossClick()}
        >
          <Image style={styles.glyphiconStyle} source={close_green} />
        </TouchableItem>
      ) : null;
      form = (
        <View style={styles.redeemInputView}>
          <View>
            <TextInput
              style={styles.inputStyle}
              editable={!disabled}
              value={value}
              maxLength={20}
              onChangeText={evt => this.onChange(evt)}
            />
            {right_icon}
          </View>
        </View>
      );
    } else {
      form = null;
      button = (
        <View className="row">
          <PrimaryButton
            onClick={() => updateRoute('app_myTrees', this.props.navigation)}
          >
            {this.props.buttonText}
          </PrimaryButton>
        </View>
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
        <KeyboardAwareScrollView enableOnAndroid={true}>
          <View style={styles.parentContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.titleText}>
                {i18n.t('label.redeem_heading')}
              </Text>
            </View>
            <CardLayout style={styles.cardContainer}>
              {icon}
              {content}
              {form}
              {button}
            </CardLayout>
          </View>
        </KeyboardAwareScrollView>

        <View
          style={{
            position: 'absolute',
            bottom: 0
          }}
        >
          <TabContainer {...this.props} />
        </View>
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

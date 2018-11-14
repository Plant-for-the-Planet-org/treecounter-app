import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import LoadingIndicator from '../Common/LoadingIndicator';
import PrimaryButton from '../Common/Button/PrimaryButton';
import TextHeading from '../Common/Heading/TextHeading';
import TextBlock from '../Common/Text/TextBlock';
import CardLayout from '../Common/Card';
import i18n from '../../locales/i18n.js';
import DescriptionHeading from '../Common/Heading/DescriptionHeading';
import {
  redeemSignIn,
  redeem_outline_red,
  redeem_outline,
  close_green
} from '../../assets';
import styles from '../../styles/redeem';
import { ScrollView, View, Image, TextInput } from 'react-native';
let TCombForm = t.form.Form;

// const allSchemaOptions = {
//   template: formLayout,
//   ...schemaOptions
// };
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
    // let value = this.refs.redemptionForm.getValue();
    if (this.state.value) {
      this.props.setRedemptionCode(this.state.value);
    }
  }
  onValidationCode() {
    // let value = this.refs.redemptionForm.getValue();
    if (this.state.value) {
      this.props.validateCode(this.state.value);
    }
  }
  onChange(value) {
    this.setState({ value: value });
  }
  render() {
    const { code } = this.props;
    let content,
      button,
      icon,
      errorText,
      successText,
      actionText,
      statusText,
      form;
    errorText = this.props.errorText ? (
      <View>{this.props.errorText}</View>
    ) : null;
    successText = this.props.successText ? (
      <View>{this.props.successText}</View>
    ) : null;
    actionText = this.props.actionText ? (
      <View className="pftp-description-heading">{this.props.actionText}</View>
    ) : null;
    statusText = this.props.statusText ? (
      <View className="pftp-description-heading">{this.props.statusText}</View>
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
        <View className="row">
          <PrimaryButton onClick={() => this.onValidationCode()}>
            {i18n.t('label.validate_code')}
          </PrimaryButton>
        </View>
      );
      icon = redeem_outline_red;
    } else if (this.props.pageStatus === 'code-unknown') {
      button = (
        <View className="row">
          <PrimaryButton onClick={() => this.onValidationCode()}>
            {i18n.t('label.validate_code')}
          </PrimaryButton>
        </View>
      );
      icon = redeem_outline;
    } else if (this.props.pageStatus === 'not-logged-in') {
      button = (
        <View className="row">
          <PrimaryButton onClick={this.props.loginButton}>
            {i18n.t('label.login')}
          </PrimaryButton>
          <button
            className="pftp-button-primary1"
            onClick={this.props.signupButton}
          >
            {i18n.t('label.signUp')}
          </button>
        </View>
      );
      icon = redeemSignIn;
    } else {
      button = (
        <View className="row">
          <PrimaryButton onClick={() => this.onSetRedemption()}>
            {this.props.buttonText}
          </PrimaryButton>
        </View>
      );
      icon = redeem_outline;
    }

    let value = this.state.value;
    if (this.props.pageStatus !== 'success') {
      let disabled = false;
      if (this.props.pageStatus === 'code-unknown') {
        disabled = false;
        // form = (
        //   <TCombForm
        //     ref="redemptionForm"
        //     type={redemptionEditableFormSchema}
        //     options={schemaOptionsRedeemEditable}
        //     value={value}
        //     onChange={this.onCrossClick()}
        //   />
        // );
      } else {
        disabled = true;
        // form = (
        //   <TCombForm
        //     ref="redemptionForm"
        //     type={redemptionNonEditableFormSchema}
        //     options={schemaOptionsRedeemNonEditable}
        //     value={value}
        //   />
        // );
      }
      const onCrossClick = () => {
        this.props.route('app_redeem');
      };
      let right_icon = disabled ? (
        <img
          className="glyphicon"
          src={close_green}
          onClick={() => onCrossClick()}
        />
      ) : null;
      form = (
        <View className="pftp-textfield-container">
          <View className="pftp-textfield">
            <View className="pftp-textfield_redeeminput">
              <View>
                {right_icon}
                <TextInput
                  type="text"
                  autoComplete="new-password"
                  required="required"
                  disabled={disabled}
                  value={value}
                  onChange={evt => this.onChange(evt.target.value)}
                />
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      form = null;
      button = (
        <View className="row">
          <PrimaryButton onClick={() => this.props.route('app_myTrees')}>
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
      <View>
        <LoadingIndicator />
      </View>
    ) : (
      <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.headerContainer}>
          {heading}
          {/*<DescriptionHeading>*/}
          {/*{i18n.t('label.redeem_heading')}*/}
          {/*</DescriptionHeading>*/}
        </View>
        <CardLayout>
          {/*<View>*/}
          <Image source={icon} />
          {/*</View>*/}
          {content}
          {form}
          {button}
        </CardLayout>
      </ScrollView>
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

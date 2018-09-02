import React from 'react';
import PropTypes from 'prop-types';
import i18n from '../../../locales/i18n';
import { checkedIcon, uncheckedIcon } from '../../../assets';
import PrimaryButton from '../../Common/Button/PrimaryButton';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

class CheckBox extends React.Component {
  containerStyle = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    flex: 1
  };
  imageStyle = {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'center'
  };

  textboxStyle = {
    flex: 1
  };
  onValueChange = data => {
    this.props.onValueChange(this.props.checkBoxState);
  };
  render() {
    return (
      <View style={this.containerStyle}>
        <TouchableOpacity onPress={this.onValueChange}>
          {this.props.value ? (
            <Image style={this.imageStyle} source={checkedIcon} />
          ) : (
            <Image style={this.imageStyle} source={uncheckedIcon} />
          )}
        </TouchableOpacity>
        <Text style={this.textboxStyle}>{this.props.title}</Text>
      </View>
    );
  }
}

class Offline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkboxState: false
    };
  }

  handleSubmit = () => {
    if (this.state.checkboxState) {
      this.props.onSuccess({
        userMessage: 'Success',
        isConfirmed: this.state.checkboxState
      });
    }
  };
  handleArrowClick = () => {
    this.props.handleExpandedClicked('4');
  };

  render() {
    const { account, amount, currency } = this.props;
    const userMessage = `${i18n.t(
      'label.confirm'
    )} ${amount} ${currency} ${i18n.t('label.following_account')}`;

    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          width: '100%'
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <CheckBox
            style={{
              flex: 1
            }}
            value={this.state.checkboxState}
            onValueChange={() =>
              this.setState({ checkboxState: !this.state.checkboxState })
            }
            title={userMessage}
          />
        </View>

        <Text
          style={{
            textAlign: 'justify',
            color: '#b7d37f',
            marginTop: 15,
            marginLeft: 5,
            alignSelf: 'flex-start'
          }}
        >
          {account.full_text}
        </Text>
        <PrimaryButton onClick={ev => this.handleSubmit(ev)}>
          {i18n.t('label.pay_via')}
        </PrimaryButton>
      </View>
    );
  }
}

Offline.propTypes = {
  account: PropTypes.object.isRequired,
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  expanded: PropTypes.bool,
  handleExpandedClicked: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func
};

export default Offline;

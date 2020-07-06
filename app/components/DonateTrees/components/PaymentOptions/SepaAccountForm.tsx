import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  TextInput
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { sepa } from "../../../../assets";
import CheckBox from "react-native-check-box";
import styles from "../../../../styles/donation/donation.native";

export default class SepaAccountForm extends Component {
  state = {
    sepaInfo: false,
    showNewSepaAccount: false,
    showPay: true,
    sepaIbanNumber: "",
    sepaIbanNumberList: [
      {
        id: 0,
        selected: false,
        cardNumber: "5997"
      },
      {
        id: 1,
        selected: true,
        cardNumber: "5997"
      }
    ]
  };

  toggleSepaInfo = () => {
    this.setState({
      sepaInfo: !this.state.sepaInfo
    });
  };

  selectNewSepaAccount = () => {
    let sepaIbanList = this.state.sepaIbanNumberList;
    sepaIbanList.map(sepa => {
      sepa.selected = false;
    });

    this.setState({ showNewSepaAccount: !this.state.showNewSepaAccount });
  };

  selectSepaIban = id => {
    let sepaIbanNumberList = this.state.sepaIbanNumberList;

    // Setting all the other cards as unselected
    sepaIbanNumberList.map(sepa => {
      sepa.selected = false;
    });

    // Setting new credit card field as unselected
    this.setState({ showNewSepaAccount: false });

    //Getting card with this id to select it
    let sepaIbanAccount = { ...sepaIbanNumberList[id] };
    sepaIbanAccount.selected = !sepaIbanAccount.selected;
    sepaIbanNumberList[id] = sepaIbanAccount;
    this.setState({ sepaIbanNumberList });
  };

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({
      showPay: false
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      showPay: true
    });
  };

  render() {
    return (
      <View>
        {/* SEPA Information Card */}
        <View style={styles.paymentCardView}>
          <TouchableOpacity
            style={styles.paymentModeView}
            onPress={() => {
              this.toggleSepaInfo();
            }}
          >
            <Image source={sepa} style={styles.creditCardsDesign} />
            <Text style={styles.paymentModeTitle}>SEPA Direct Debit</Text>
            {this.state.sepaInfo ? (
              <Icon
                name="chevron-up"
                size={14}
                color="rgba(0, 0, 0, 0.38)"
                style={{ marginLeft: 10 }}
              />
            ) : (
              <Icon
                name="chevron-down"
                size={14}
                color="rgba(0, 0, 0, 0.38)"
                style={{ marginLeft: 10 }}
              />
            )}
          </TouchableOpacity>

          {/* Hidden until expanded by User */}
          {this.state.sepaInfo ? (
            <View>
              {this.state.sepaIbanNumberList.map(sepaIbanAccount => (
                <TouchableOpacity
                  style={{ flexDirection: "row", marginTop: 28 }}
                  onPress={() => {
                    this.selectSepaIban(sepaIbanAccount.id);
                  }}
                >
                  <View
                    style={
                      sepaIbanAccount.selected
                        ? styles.selectedRadioButton
                        : styles.unselectedRadioButton
                    }
                  >
                    <View
                      style={
                        sepaIbanAccount.selected
                          ? styles.selectedRadioButtonCircle
                          : null
                      }
                    />
                  </View>

                  <Text style={{ fontWeight: "bold", marginRight: 10 }}>
                    SEPA IBAN Ending in 2000
                  </Text>
                </TouchableOpacity>
              ))}

              {/* View for New Sepa Card  */}
              <View>
                <TouchableOpacity
                  style={{ flexDirection: "row", marginTop: 28 }}
                  onPress={() => {
                    this.selectNewSepaAccount();
                  }}
                >
                  <View
                    style={
                      this.state.showNewSepaAccount
                        ? styles.selectedRadioButton
                        : styles.unselectedRadioButton
                    }
                  >
                    <View
                      style={
                        this.state.showNewSepaAccount
                          ? styles.selectedRadioButtonCircle
                          : null
                      }
                    />
                  </View>
                  <Text style={styles.sepaPaymentMethodText}>
                    Use a New Payment method
                  </Text>
                </TouchableOpacity>
                {this.state.showNewSepaAccount ? (
                  <View style={{ marginLeft: 36, marginTop: 18 }}>
                    <Text style={styles.sepaMandateInfoTitle}>
                      Mandate Information
                    </Text>
                    <Text style={styles.sepaMandateInfoText}>
                      By providing your IBAN and confirming this payment, you
                      are authorizing Plant-for-the-Planet and Stripe, our
                      payment service provider, to send instructions to your
                      bank to debit your account and your bank to debit your
                      account in accordance with those instructions. You are
                      entitled to a refund from your bank under the terms and
                      conditions of your agreement with your bank. A refund must
                      be claimed within 8 weeks starting from the date on which
                      your account was debited.
                    </Text>
                    <Text style={styles.sepaIbanTitle}>IBAN</Text>

                    <View style={styles.sepaIbanTextView}>
                      <View style={styles.sepaInputTextImage} />
                      <TextInput
                        style={styles.sepaIbanTextInput}
                        onChangeText={sepaIbanNumber =>
                          this.setState({ sepaIbanNumber })
                        }
                        value={this.state.sepaIbanNumber}
                        maxLength={22}
                      />
                    </View>
                    <CheckBox
                      style={{ flex: 1, marginTop: 20 }}
                      onClick={() => {
                        this.setState({
                          isCheckedSepa: !this.state.isCheckedSepa
                        });
                      }}
                      rightText={
                        "Save this payment method in my account for future donations"
                      }
                      rightTextStyle={styles.checkBoxText}
                      isChecked={this.state.isCheckedSepa}
                      checkBoxColor={"#89b53a"}
                    />
                  </View>
                ) : null}
              </View>
              {/* View for New Credit Card Ended  */}
            </View>
          ) : null}
          {/* Hidden until expanded by User */}
        </View>
        {/* SEPA Information Card Ended */}
      </View>
    );
  }
}

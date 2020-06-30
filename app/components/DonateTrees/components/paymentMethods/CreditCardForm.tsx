import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "../../../../styles/donation/donation.native";
import {
  visa,
  masterCard,
  americanExpress,
  discover,
  creditCard,
  creditCardBack
} from "../../../../assets";
import CheckBox from "react-native-check-box";
import { CreditCardInput } from "react-native-credit-card-input";

export default class CreditCardForm extends Component {
  state = {
    creditCardInfo: false,
    creditCardsList: [],
    showNewCreditCard: false,
    showPay: true,
    cardValues: null,
    changeInCardValue: false
  };

  togglecreditCardInfo = () => {
    this.setState({
      creditCardInfo: !this.state.creditCardInfo
    });
  };

  selectCreditCard = id => {
    let creditCardsList = this.state.creditCardsList;

    // Setting all the other cards as unselected
    creditCardsList.map(creditCard => {
      creditCard.selected = false;
    });
    // Setting new credit card field as unselected
    this.setState({ showNewCreditCard: false });
    //Getting card with this id to select it
    let creditCard = { ...creditCardsList[id] };
    creditCard.selected = !creditCard.selected;
    creditCardsList[id] = creditCard;
    this.setState({ creditCardsList });
  };

  selectNewCreditCard = () => {
    let creditCardsList = this.state.creditCardsList;
    creditCardsList.map(creditCard => {
      creditCard.selected = false;
    });
    this.setState({ showNewCreditCard: !this.state.showNewCreditCard });
  };

  _onChange = form => {
    this.setState({
      cardValues: form,
      changeInCardValue: true
    });
  };

  render() {
    if (
      this.state.cardValues &&
      this.state.cardValues.valid &&
      this.state.changeInCardValue
    ) {
      this.setState({
        changeInCardValue: false
      });
      this.props.setcardValid(true);
      let expArr = this.state.cardValues.values.expiry.split("/");
      let cardDetails = {
        number: this.state.cardValues.values.number,
        cvc: this.state.cardValues.values.cvc,
        expMonth: expArr[0],
        expYear: expArr[1]
      };
      this.props.setcardValues(cardDetails);
    }
    return (
      <View>
        {/* Payment Information Card */}
        <View style={styles.paymentCardView}>
          <TouchableOpacity
            style={styles.paymentModeView}
            onPress={() => {
              this.togglecreditCardInfo();
            }}
          >
            <Text style={styles.paymentModeTitle}>CREDIT CARD</Text>
            <Image source={visa} style={styles.creditCardsDesign} />
            <Image source={masterCard} style={styles.creditCardsDesign} />
            <Image source={americanExpress} style={styles.creditCardsDesign} />

            {this.state.creditCardInfo ? (
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
          {this.state.creditCardInfo ? (
            <View>
              {this.state.creditCardsList.map(creditCardsList => (
                <TouchableOpacity
                  style={{ flexDirection: "row", marginTop: 28 }}
                  onPress={() => {
                    this.selectCreditCard(creditCardsList.id);
                  }}
                >
                  <View
                    style={
                      creditCardsList.selected
                        ? styles.selectedRadioButton
                        : styles.unselectedRadioButton
                    }
                  >
                    <View
                      style={
                        creditCardsList.selected
                          ? styles.selectedRadioButtonCircle
                          : null
                      }
                    />
                  </View>
                  <Image
                    source={creditCardsList.image}
                    style={[styles.creditCardsDesign, { marginRight: 20 }]}
                  />
                  <Text style={{ fontWeight: "bold", marginRight: 10 }}>
                    {creditCardsList.cardNumber}
                  </Text>

                  <Text
                    style={
                      creditCardsList.expiryDate == "Expired"
                        ? { color: "red" }
                        : null
                    }
                  >
                    {creditCardsList.expiryDate}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* View for New Credit Card  */}
              <View>
                <TouchableOpacity
                  style={{ flexDirection: "row", marginTop: 28 }}
                  onPress={() => {
                    this.selectNewCreditCard();
                  }}
                >
                  <View
                    style={
                      this.state.showNewCreditCard
                        ? styles.selectedRadioButton
                        : styles.unselectedRadioButton
                    }
                  >
                    <View
                      style={
                        this.state.showNewCreditCard
                          ? styles.selectedRadioButtonCircle
                          : null
                      }
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "OpenSans-Bold",
                      lineHeight: 19,
                      letterSpacing: 0,
                      textAlign: "left",
                      color: "rgba(0, 0, 0, 0.6)"
                    }}
                  >
                    Add New Payment method
                  </Text>
                </TouchableOpacity>
                {this.state.showNewCreditCard ? (
                  <View style={{ marginTop: 18 }}>
                    <CreditCardInput
                      onChange={this._onChange}
                      inputContainerStyle={{
                        maxWidth: 120,
                        fontFamily: "OpenSans-Regular"
                      }}
                      cardImageFront={creditCard}
                      cardImageBack={creditCardBack}
                      cardFontFamily={"OpenSans-Regular"}
                      labelStyle={{ fontFamily: "OpenSans-Regular" }}
                      allowScroll
                      placeholderColor={"#d5d5d5"}
                    />

                    <CheckBox
                      style={{ flex: 1, marginTop: 20 }}
                      onClick={() => {
                        this.setState({
                          isChecked: !this.state.isChecked
                        });
                      }}
                      rightText={
                        "Save this payment method in my account for future donations"
                      }
                      rightTextStyle={styles.checkBoxText}
                      isChecked={this.state.isChecked}
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
        {/* Payment Information Card Ended */}
      </View>
    );
  }
}

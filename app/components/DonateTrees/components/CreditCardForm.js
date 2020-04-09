import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../../../styles/donation/donation.native';
import {
  visa,
  masterCard,
  americanExpress,
  discover,
  creditCard,
  creditCardBack
} from './../../../assets';
import CheckBox from 'react-native-check-box';
import {
  CreditCardInput,
  LiteCreditCardInput
} from 'react-native-credit-card-input';

import { TextField } from 'react-native-material-textfield';
import i18n from '../../../locales/i18n';

export default class CreditCardForm extends Component {
  state = {
    creditCardInfo: false,
    creditCardsList: [
      {
        id: 0,
        selected: false,
        image: discover,
        cardNumber: '*** 5997',
        expiryDate: 'Expired',
        cvv: '453'
      },
      {
        id: 1,
        selected: true,
        image: americanExpress,
        cardNumber: '*** 5997',
        expiryDate: '10/20',
        cvv: '234'
      }
    ],
    showNewCreditCard: false,
    showPay: true
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

  _onChange = form => console.log(form);

  render() {
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
                  style={{ flexDirection: 'row', marginTop: 28 }}
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
                  <Text style={{ fontWeight: 'bold', marginRight: 10 }}>
                    {creditCardsList.cardNumber}
                  </Text>

                  <Text
                    style={
                      creditCardsList.expiryDate == 'Expired'
                        ? { color: 'red' }
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
                  style={{ flexDirection: 'row', marginTop: 28 }}
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
                      fontWeight: 'bold',
                      fontStyle: 'normal',
                      lineHeight: 19,
                      letterSpacing: 0,
                      textAlign: 'left',
                      color: 'rgba(0, 0, 0, 0.6)'
                    }}
                  >
                    Add New Payment method
                  </Text>
                </TouchableOpacity>
                {this.state.showNewCreditCard ? (
                  <View style={{ marginTop: 18 }}>
                    <CreditCardInput
                      onChange={this._onChange}
                      inputContainerStyle={{ maxWidth: 120 }}
                      cardImageFront={creditCard}
                      cardImageBack={creditCardBack}
                    />
                    {/* <LiteCreditCardInput onChange={this._onChange}
                    // inputContainerStyle={{ maxWidth: 100 }}
                    /> */}

                    <CheckBox
                      style={{ flex: 1, marginTop: 20 }}
                      onClick={() => {
                        this.setState({
                          isChecked: !this.state.isChecked
                        });
                      }}
                      rightText={
                        'Save this payment method in my account for future donations'
                      }
                      rightTextStyle={styles.checkBoxText}
                      isChecked={this.state.isChecked}
                      checkBoxColor={'#89b53a'}
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

// Changes to be made in library page - CreditCardInput
{
  /* <ScrollView ref="Form"
    keyboardShouldPersistTaps="always"
    scrollEnabled={allowScroll}
    showsHorizontalScrollIndicator={false}
    style={s.form}> removed horizontal prop
    <CCInput {...this._inputProps("number")}
      keyboardType="numeric"
      containerStyle={[s.inputContainer, inputContainerStyle, { width: CARD_NUMBER_INPUT_WIDTH }]} />
    <View style={{ flexDirection: "row", marginTop: 21 }}> Added View
      <CCInput {...this._inputProps("expiry")}
        keyboardType="numeric"
        containerStyle={[s.inputContainer, inputContainerStyle, { width: EXPIRY_INPUT_WIDTH }]} />
      {requiresCVC &&
        <CCInput {...this._inputProps("cvc")}
          keyboardType="numeric"
          containerStyle={[s.inputContainer, inputContainerStyle, { width: CVC_INPUT_WIDTH }]} />}
    </View> */
}

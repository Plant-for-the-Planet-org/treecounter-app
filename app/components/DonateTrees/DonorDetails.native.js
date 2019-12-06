import React, { useEffect, useState } from 'react';
import Header from './DonationDetailsComponents/Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
  Animated
} from 'react-native';
import { Formik } from 'formik';
import { TextField } from 'react-native-material-textfield';
import CheckBox from 'react-native-check-box';

import styles from '../../styles/donations/donationDetails';
import {
  currencyIcon,
  gPayLogo,
  blackLock,
  nextArrowWhite
} from '../../assets';
import { formatNumber, delimitNumbers } from '../../utils/utils';
import i18n from '../../locales/i18n.js';

export default function DonorDetails(props) {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  const [buttonType, setButtonType] = useState('donate');

  useEffect(() => {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      setButtonType('>')
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      setButtonType('donate')
    );
    // clean up
    return () => {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Header
        scrollY={scrollY}
        navigation={props.navigation}
        title={'Contact Details'}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        style={styles.keyboardScrollView}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled
      >
        <Formik
          initialValues={{
            firstname: '',
            lastname: '',
            email: '',
            country: '',
            isCompany: false,
            companyName: ''
          }}
          onSubmit={values => {
            console.log(values);
          }}
        >
          {props => (
            <>
              <View>
                <View style={styles.formView}>
                  <View style={styles.formHalfTextField}>
                    <TextField
                      label={i18n.t('label.pledgeFormFName')}
                      value={props.values.firstname}
                      tintColor={'#89b53a'}
                      titleFontSize={12}
                      returnKeyType="next"
                      lineWidth={1}
                      labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                      affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      blurOnSubmit={false}
                      error={props.touched.firstname && props.errors.firstname}
                      onChangeText={props.handleChange('firstname')}
                      onBlur={props.handleBlur('firstname')}
                    />
                  </View>

                  <View style={styles.formHalfTextField}>
                    <TextField
                      label={i18n.t('label.pledgeFormLName')}
                      value={props.values.lastname}
                      tintColor={'#89b53a'}
                      titleFontSize={12}
                      returnKeyType="next"
                      lineWidth={1}
                      labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                      affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      error={props.touched.lastname && props.errors.lastname}
                      onChangeText={props.handleChange('lastname')}
                      onBlur={props.handleBlur('lastname')}
                    />
                  </View>
                </View>

                <View>
                  <TextField
                    label={i18n.t('label.pledgeFormEmail')}
                    value={props.values.email}
                    tintColor={'#89b53a'}
                    titleFontSize={12}
                    lineWidth={1}
                    keyboardType="email-address"
                    error={props.touched.email && props.errors.email}
                    labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                    titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                    affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                    returnKeyType="next"
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')}
                  />
                </View>

                <View style={{ width: '100%', marginTop: 30 }}>
                  <CheckBox
                    onClick={() => {
                      console.log('null');
                    }}
                    checkedCheckBoxColor="#89b53a"
                    isChecked={props.values.isCompany}
                    rightTextStyle={{
                      fontFamily: 'OpenSans-Regular'
                    }}
                    rightText="Is Company ?"
                  />
                </View>
              </View>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>

      <PaymentOption
        treeCount={props.treeCount}
        treeCost={props.treeCost}
        selectedCurrency={props.selectedCurrency}
        commissionSwitch={props.commissionSwitch}
        navigation={props.navigation}
      />
    </View>
  );
}

DonorDetails.navigationOptions = {
  header: null
};
export function PaymentOption(props) {
  return (
    <View style={styles.bottomButtonView}>
      <View style={styles.leftSection}>
        <View style={styles.paymentTreeDetails}>
          <Text style={styles.paymentTreeAmount}>
            {formatNumber(
              props.commissionSwitch
                ? props.treeCost * props.treeCount +
                  (props.treeCount / 100 * 2.9 + 0.3)
                : props.treeCost * props.treeCount,
              null,
              props.selectedCurrency
            )}
          </Text>
          <Text style={styles.paymentTreeCount}>
            for {props.treeCount} trees
          </Text>
        </View>

        {/* <TouchableOpacity style={styles.otherPaymentButton}>
            <Text style={styles.otherPaymentText}>Other payment methods</Text>
          </TouchableOpacity> */}
        <View>
          <Text style={styles.otherPaymentText}>Click Continue to proceed</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          updateStaticRoute('donor_details_form', props.navigation);
        }}
        style={styles.continueButtonView}
      >
        <View style={{ alignItems: 'center' }}>
          <Image
            style={{ maxHeight: 24 }}
            source={nextArrowWhite}
            resizeMode="contain"
          />
          <Text style={styles.continueButtonText}>Continue</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

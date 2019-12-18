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
  Animated,
  Switch
} from 'react-native';
import { Formik } from 'formik';
import { TextField } from 'react-native-material-textfield';
import CheckBox from 'react-native-check-box';
import { Dropdown } from 'react-native-material-dropdown';
import HeaderAnimated from './../Header/HeaderAnimated.native';

import styles from '../../styles/donations/donorDetails';
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

  const keyboardDidShow = () => {
    setButtonType('>');
  };

  const keyboardDidHide = () => {
    setButtonType('donate');
  };

  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow
    );
    keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide
    );
    // clean up
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <HeaderAnimated
        scrollY={scrollY}
        navigation={props.navigation}
        title={'Contact Details'}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollView}
        keyboardDismissMode="on-drag"
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        extraScrollHeight={72}
        extraHeight={72}
        enableOnAndroid
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } }
        ])}
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

                <CountryPicker
                  values={props.values}
                  touched={props.touched}
                  errors={props.errors}
                  handleChange={props.handleChange}
                  setFieldValue={props.setFieldValue}
                />

                <View style={styles.coverCommissionView}>
                  <Text style={styles.coverCommissionText}>
                    This is a Company Donation
                  </Text>
                  <Switch
                    style={styles.coverCommissionSwitch}
                    onValueChange={props.handleChange('isCompany')}
                    thumbColor={'#89b53a'}
                    trackColor={{
                      false: '#f2f2f7',
                      true: 'rgba(137, 181, 58, 0.8)'
                    }}
                    value={props.values.isCompany}
                  />
                </View>

                {props.values.isCompany ? (
                  <View>
                    <TextField
                      label={'Company Name'}
                      value={props.values.companyName}
                      tintColor={'#89b53a'}
                      titleFontSize={12}
                      lineWidth={1}
                      error={
                        props.touched.companyName && props.errors.companyName
                      }
                      labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                      affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      returnKeyType="next"
                      onChangeText={props.handleChange('companyName')}
                      onBlur={props.handleBlur('companyName')}
                    />
                  </View>
                ) : null}
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

export function CountryPicker(props) {
  let data = [
    {
      label: 'Germany',
      value: 'germany'
    },
    {
      label: 'India',
      value: 'india'
    },
    {
      label: 'USA',
      value: 'usa'
    }
  ];

  const refContainer = React.useRef('dropdown');

  return (
    <View>
      <Dropdown
        ref={refContainer}
        label={'Country'}
        data={data}
        onChangeText={props.handleChange('country')}
        lineWidth={1}
        itemTextStyle={{ fontFamily: 'OpenSans-Regular' }}
        labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
      />
    </View>
  );
}

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

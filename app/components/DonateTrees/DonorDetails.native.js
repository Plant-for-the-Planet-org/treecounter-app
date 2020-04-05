import React, { useEffect, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Text,
  View,
  Keyboard,
  Animated,
  Switch,
  TouchableOpacity,
  Image
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import styles from '../../styles/donations/donorDetails';
import i18n from '../../locales/i18n.js';
import buttonStyles from './../../styles/common/button.native';
import { forward } from '../../assets';
import HeaderAnimated from './../Header/HeaderAnimated.native';
import { Formik } from 'formik';
import CheckBox from 'react-native-check-box';
import {
  currencyIcon,
  gPayLogo,
  blackLock,
  nextArrowWhite
} from '../../assets';
import { formatNumber, delimitNumbers } from '../../utils/utils';
import { updateStaticRoute } from '../../helpers/routerHelper';
import GooglePlacesInput from './DonationDetailsComponents/AutoComplete.native'
export default function DonorDetails(props) {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [buttonType, setButtonType] = useState('donate');
  const [isCompanySwitch, setisCompanySwitch] = React.useState(false); // for Switching whether the user wants receipt or not

  const keyboardDidShow = () => {
    setButtonType('>');
  };

  const keyboardDidHide = () => {
    setButtonType('donate');
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
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
        extraScrollHeight={32}
        extraHeight={32}
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
          {formikProps => (
            <>
              <View>
                <View style={styles.formView}>
                  <View style={styles.formHalfTextField}>
                    <TextField
                      label={i18n.t('label.pledgeFormFName')}
                      value={formikProps.values.firstname}
                      tintColor={'#89b53a'}
                      titleFontSize={12}
                      returnKeyType="next"
                      lineWidth={1}
                      labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                      affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      blurOnSubmit={false}
                      error={formikProps.touched.firstname && formikProps.errors.firstname}
                      onChangeText={formikProps.handleChange('firstname')}
                      onBlur={formikProps.handleBlur('firstname')}
                    />
                  </View>

                  <View style={styles.formHalfTextField}>
                    <TextField
                      label={i18n.t('label.pledgeFormLName')}
                      value={formikProps.values.lastname}
                      tintColor={'#89b53a'}
                      titleFontSize={12}
                      returnKeyType="next"
                      lineWidth={1}
                      labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                      affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      error={formikProps.touched.lastname && formikProps.errors.lastname}
                      onChangeText={formikProps.handleChange('lastname')}
                      onBlur={formikProps.handleBlur('lastname')}
                    />
                  </View>
                </View>

                <View>
                  <TextField
                    label={i18n.t('label.pledgeFormEmail')}
                    value={formikProps.values.email}
                    tintColor={'#89b53a'}
                    titleFontSize={12}
                    lineWidth={1}
                    keyboardType="email-address"
                    error={formikProps.touched.email && formikProps.errors.email}
                    labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                    titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                    affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                    returnKeyType="next"
                    onChangeText={formikProps.handleChange('email')}
                    onBlur={formikProps.handleBlur('email')}
                  />
                </View>

                <GooglePlacesInput
                  placeholder={'Address'}
                  initialValue={formikProps.values.country ? formikProps.values.country : ''}
                  setFieldValue={formikProps.setFieldValue}
                />
                {/* <CountryPicker
                  values={formikProps.values}
                  touched={formikProps.touched}
                  errors={formikProps.errors}
                  handleChange={formikProps.handleChange}
                  setFieldValue={formikProps.setFieldValue}
                /> */}

                <View style={styles.coverCommissionView}>
                  <Text style={styles.coverCommissionText}>
                    This is a Company Donation
                  </Text>
                  <Switch
                    style={styles.coverCommissionSwitch}
                    onValueChange={(value) => formikProps.setFieldValue('isCompany', value)}
                    thumbColor={'#89b53a'}
                    trackColor={{
                      false: '#f2f2f7',
                      true: 'rgba(137, 181, 58, 0.8)'
                    }}
                    value={formikProps.values.isCompany}
                  />
                </View>
                {formikProps.values.isCompany ? (
                  <View>
                    <TextField
                      label={'Company Name'}
                      value={formikProps.values.companyName}
                      tintColor={'#89b53a'}
                      titleFontSize={12}
                      lineWidth={1}
                      error={
                        formikProps.touched.companyName && formikProps.errors.companyName
                      }
                      labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                      affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                      returnKeyType="next"
                      onChangeText={formikProps.handleChange('companyName')}
                      onBlur={formikProps.handleBlur('companyName')}
                    />
                  </View>
                ) : null}
              </View>
            </>
          )}
        </Formik>


      </KeyboardAwareScrollView>

      <PaymentOption
        treeCount={props.navigation.getParam('treeCount')}
        treeCost={props.navigation.getParam('treeCost')}
        selectedCurrency={props.navigation.getParam('selectedCurrency')}
        commissionSwitch={props.navigation.getParam('commissionSwitch')}
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
        onChangeText={(value) => props.handleChange(value, 'country')}
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
          updateStaticRoute('payment_details_form', props.navigation);
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
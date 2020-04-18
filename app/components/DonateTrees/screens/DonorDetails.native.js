import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, Image, Keyboard, Switch, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextField } from 'react-native-material-textfield';
import { nextArrowWhite } from '../../../assets';
import { updateStaticRoute } from '../../../helpers/routerHelper';
import i18n from '../../../locales/i18n.js';
import styles from '../../../styles/donations/donorDetails';
import { formatNumber } from '../../../utils/utils';
import HeaderAnimated from '../../Header/HeaderAnimated.native';
import GooglePlacesInput from '../components/AutoComplete.native';

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
  });


  console.log('Context in Donor Details page', props.context)

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <HeaderAnimated
        scrollY={scrollY}
        navigation={props.navigation}
        title={'Contact Details'}
      />

      <KeyboardAwareScrollView
        contentContainerStyle={[styles.scrollView, { flex: 1 }]}
        keyboardDismissMode="on-drag"
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled
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
            firstname: props.currentUserProfile ? props.currentUserProfile.firstname : '',
            lastname: props.currentUserProfile ? props.currentUserProfile.lastname : '',
            email: props.currentUserProfile ? props.currentUserProfile.email : '',
            address: props.currentUserProfile ? props.currentUserProfile.address : '',
            isCompany: false,
            companyName: ''
          }}
          onSubmit={values => {
            console.log(values);
            props.contextActions.setDonorDetails(values)
            updateStaticRoute('payment_details_form', props.navigation, {
              navigation: props.navigation
            });
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
                      error={
                        formikProps.touched.firstname &&
                        formikProps.errors.firstname
                      }
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
                      error={
                        formikProps.touched.lastname &&
                        formikProps.errors.lastname
                      }
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
                    error={
                      formikProps.touched.email && formikProps.errors.email
                    }
                    labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                    titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                    affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                    returnKeyType="next"
                    onChangeText={formikProps.handleChange('email')}
                    onBlur={formikProps.handleBlur('email')}
                  />
                </View>
                <View style={styles.coverCommissionView}>
                  <GooglePlacesInput
                    placeholder={'Address'}
                    initialValue={
                      formikProps.values.address ? formikProps.values.address : ''
                    }
                    setFieldValue={formikProps.setFieldValue}
                  />
                </View>


                <View style={styles.coverCommissionView}>
                  <Text style={styles.coverCommissionText}>
                    This is a Company Donation
                  </Text>
                  <Switch
                    style={styles.coverCommissionSwitch}
                    onValueChange={value =>
                      formikProps.setFieldValue('isCompany', value)
                    }
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
                        formikProps.touched.companyName &&
                        formikProps.errors.companyName
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
              {props.context && props.context.donationDetails &&
                props.context.donationDetails.totalTreeCount ? (
                  <PaymentOption
                    treeCount={props.context.donationDetails.totalTreeCount}
                    treeCost={props.context.projectDetails.selectedProjectDetails.amountPerTree}
                    selectedCurrency={props.context.projectDetails.selectedProjectDetails.currency}
                    navigation={props.navigation}
                    onSubmit={formikProps.handleSubmit}
                  />
                ) : <ActivityIndicator size="large" color="#0000ff" />
              }
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>

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
                ((props.treeCount / 100) * 2.9 + 0.3)
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
          props.onSubmit()
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

DonorDetails.navigationOptions = {
  header: null
};


import PropTypes from 'prop-types';
import React from 'react';
import {
  Animated,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updateStaticRoute } from '../../../helpers/routerHelper';
import { paymentFee } from '../../../helpers/utils';
import styles from '../../../styles/donations/donationDetails';
import HeaderAnimated from '../../Header/HeaderAnimated.native';
import {
  NoPlantProjectDetails,
  PaymentOption,
  PlantProjectDetails,
  SelectCountryModal,
  // SelectFrequency,
  SelectTreeCount,
  SupportUserDetails,
  TaxReceipt,
  PledgeOnComponent,
  PledgeTreeCount
} from '../components/donationComponents.native';
import { GiftTreesComponent } from '../components/giftDontaionComponents.native';
import ProjectModal from '../components/ProjectModal.native';
import stripe from 'tipsi-stripe';
import { TextField } from 'react-native-material-textfield';
import i18n from '../../../locales/i18n.js';
import { Formik } from 'formik';
import * as Yup from 'yup';

const DonationDetailsValidation = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required')
});

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Email is Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

function DonationDetails(props) {
  const [commissionSwitch, setCommissionSwitch] = React.useState(false); // for Switching whether the user wants to pay the commission of payment portal
  const [taxReceiptSwitch, setTaxReceiptSwitch] = React.useState(false); // for Switching whether the user wants receipt or not
  const [treeCount, setTreeCount] = React.useState(0); // for Selecting Tree Count
  // const [frequency, setFrequency] = React.useState('once'); // for Selecting Frequency of Donations
  const [countryForTax, setCountryForTax] = React.useState(''); // for Selecting the Country
  const [scrollY, setScrollY] = React.useState(new Animated.Value(0));
  const [showTaxCountryModal, setShowTaxCountryModal] = React.useState(false);


  const [selectedTaxCountry, setSelectedTaxCountry] = React.useState(
    props.paymentSetup && props.paymentSetup.defaultCountry
  );
  const [currency, setCurrency] = React.useState(props.selectedCurrency);
  const [token, setToken] = React.useState(null);
  const [applePayStatus, setApplePayStatus] = React.useState('');


  const [email, setEmail] = React.useState(props.currentUserProfile ? props.currentUserProfile.email : '');
  // this is to test whether Apple/Google pay is allowed or not
  stripe.setOptions({
    publishableKey: 'pk_test_9L6XVwL1f0D903gMcdbjRabp00Zf7jYJuw',
    merchantId: '', // Optional
    androidPayMode: 'test' // Android only
  });
  const [allowedNativePay, setallowedNativePay] = React.useState(false);

  React.useEffect(() => {
    const allowedNativePay = stripe.deviceSupportsNativePay();
    setallowedNativePay(allowedNativePay);
  }, []);

  // show hide project modal
  const [showProjectModal, setProjectModal] = React.useState(false);

  // Function for Switching the state of commission
  const toggleSetCommission = value => {
    setCommissionSwitch(value);
  };

  // Function for Switching the state of tax receipt
  const toggleTaxReceipt = value => {
    setTaxReceiptSwitch(value);
  };

  let context = { ...props.context };

  // this is to redraw the form after you change project or cancel project selected on details page on project
  if (
    context.donationDetails.totalTreeCount &&
    context.donationDetails.totalTreeCount != treeCount
  ) {
    setTreeCount(context.donationDetails.totalTreeCount);
  }
  // if (
  //   context.donationDetails.frequency &&
  //   context.donationDetails.frequency != frequency
  // ) {
  //   setFrequency(context.donationDetails.frequency);
  // }
  if (
    context.donationDetails.countryForTax &&
    context.donationDetails.countryForTax != countryForTax
  ) {
    setSelectedTaxCountry(context.donationDetails.countryForTax);
  }

  const saveContext = () => {
    if (context.contextType === 'direct') {
      props.contextActions.setDonationDetails({
        ...props.context.donationDetails,
        totalTreeCount: treeCount,
        // frequency: frequency,
        taxReceiptSwitch: taxReceiptSwitch,
        countryForTax: countryForTax,
        selectedProject: props.selectedProject
      });
    }
  };
  const onContinue = () => {
    // Set Donation Details and then switch the page
    if (context.contextType === 'direct') {
      saveContext();
      updateStaticRoute('donor_details_form', props.navigation, {
        navigation: props.navigation
      });
    }
  };

  console.log('Payment Setup', props.paymentSetup)

  return (
    <View style={{ backgroundColor: 'white' }}>
      <Formik
        initialValues={{ email: props.currentUserProfile ? props.currentUserProfile.email : '' }}
        validationSchema={DonationDetailsValidation}
        onSubmit={values => {
          console.log(values);
        }}
        validateOnChange
      >
        {formikProps => (
          <>
            <StatusBar hidden />

            <ProjectModal
              hideModal={setProjectModal}
              show={showProjectModal}
              navigation={props.navigation}
              handleProjectChange={project => {
                setProjectModal(false);
              }}
              context={context}
            />

            <HeaderAnimated
              scrollY={scrollY}
              navigation={props.navigation}
              title={'Tree Donation'}
              showClose
              onBack={props.contextActions.clearDonationReducer}
            />

            <KeyboardAwareScrollView
              contentContainerStyle={styles.scrollView}
              keyboardDismissMode="on-drag"
              resetScrollToCoords={{ x: 0, y: 0 }}
              scrollEnabled
              extraScrollHeight={100}
              extraHeight={100}
              enableOnAndroid
              scrollEventThrottle={16}
              onScroll={Animated.event([
                { nativeEvent: { contentOffset: { y: scrollY } } }
              ])}
            >
              {/* Plant Project Details */}
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>DONATION TO</Text>
                {props.selectedProject ? (
                  <TouchableOpacity
                    onPress={() => {
                      saveContext();
                      setProjectModal(true);
                    }}
                  >
                    <Text style={styles.sectionRightButton}>Change</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
              {props.selectedProject ? (
                <PlantProjectDetails
                  treeCost={props.selectedProject.treeCost}
                  selectedCurrency={
                    props.globalCurrency
                      ? props.globalCurrency.currency
                      : currency
                  }
                  selectedProject={props.selectedProject}
                  rates={
                    props.currencies.currencies.currency_rates[
                      props.selectedProject.currency
                    ].rates
                  }
                  fee={paymentFee}
                  globalCurrency={props.globalCurrency}
                  setCurrency={setCurrency}
                />
              ) : (
                  <NoPlantProjectDetails />
                )}

              {context.contextType === 'direct' || context.contextType === 'support' ? (
                <SelectTreeCount
                  treeCount={treeCount}
                  setTreeCount={setTreeCount}
                  selectedProject={props.selectedProject}
                  treeCountOptions={props.paymentSetup.treeCountOptions}
                />
              ) : null}

              {/* Donation Context */}

              {context.contextType === 'support' ? (
                <SupportUserDetails context={context} />
              ) : null}

              {/* Gift Trees */}
              {context.contextType === 'gift-contact' ||
                context.contextType === 'gift-invitation' ? (
                  <GiftTreesComponent
                    treeCount={treeCount}
                    setTreeCount={setTreeCount}
                    selectedProject={props.selectedProject}
                    context={context}
                    treeCountOptions={props.paymentSetup.treeCountOptions}
                  />
                ) : null}

              {context.contextType === 'pledge' ? (
                <>
                  <PledgeOnComponent pledgeDetails={context.pledgeDetails} />
                  <PledgeTreeCount
                    treeCount={treeCount}
                    treeCountPledged={context.pledgeDetails.treeCount}
                    setTreeCount={setTreeCount}
                  />
                </>
              ) : null}

              {/* <SelectFrequency frequency={frequency} setFrequency={setFrequency} /> */}
              <View
                style={[styles.horizontalDivider, { width: '14%', marginTop: 30 }]}
              />

              {/* Commission Covering */}
              {/* {context.treeCount ? (
          <CoverFee
            selectedProject={props.selectedProject.tpoSlug}
            treeCount={context.treeCount}
            selectedCurrency={props.selectedCurrency}
            toggleSetCommission={toggleSetCommission}
            commissionSwitch={context.commissionSwitch}
          />
        ) : null} */}

              {/* Tax Receipt */}
              {props.hasTaxDeduction && (
                <TaxReceipt
                  taxReceiptSwitch={taxReceiptSwitch}
                  toggleTaxReceipt={toggleTaxReceipt}
                  setShowTaxCountryModal={setShowTaxCountryModal}
                  selectedTaxCountry={selectedTaxCountry}
                  oneTaxCountry={
                    props.taxDeductibleCountries.length > 1 ? true : false
                  }
                />
              )}




              <View style={{ marginTop: 12 }}>
                <TextField
                  label={i18n.t('label.pledgeFormEmail')}
                  value={formikProps.values.email}
                  tintColor={'#89b53a'}
                  titleFontSize={12}
                  lineWidth={1}
                  keyboardType="email-address"
                  labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                  titleTextStyle={{ fontFamily: 'OpenSans-SemiBold' }}
                  affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                  returnKeyType="next"
                  onEndEditing={(email) => { setEmail(email) }}
                  onChangeText={formikProps.handleChange('email')}
                  onBlur={formikProps.handleBlur('email')}
                  error={
                    formikProps.touched.email && formikProps.errors.email
                  }
                // validate={validateEmail}
                />
              </View>

              <SelectCountryModal
                selectedCountry={selectedTaxCountry}
                setSelectedCountry={setSelectedTaxCountry}
                showModal={showTaxCountryModal}
                setShowModal={setShowTaxCountryModal}
                taxDeductibleCountries={props.paymentSetup.taxDeductionCountries}
              />

              {/* Needed In Future */}
              {/* <UserContactDetails donorDetails={donorDetails} /> */}
              {/* <UserPaymentDetails paymentDetails={paymentDetails} /> */}
              {/* <PaymentsProcessedBy/> */}
            </KeyboardAwareScrollView>

            <PaymentOption
              treeCount={treeCount}
              commissionSwitch={commissionSwitch}
              navigation={props.navigation}
              onContinue={onContinue}
              // frequency={frequency}
              showNativePay={
                allowedNativePay ? (Platform.OS === 'ios' ? 'apple' : 'google') : null
              }
              token={token}
              setToken={setToken}
              stripe={stripe}
              setApplePayStatus={setApplePayStatus}
              currentUserProfile={props.currentUserProfile}
              context={context}
              createDonation={props.createDonation}
              setDonorDetails={props.setDonorDetails}
              donationPay={props.donationPay}
              selectedProject={props.selectedProject}
              treeCost={props.selectedProject.treeCost}
              selectedCurrency={
                currency
              }
              rates={
                props.currencies.currencies.currency_rates[
                  props.selectedProject.currency
                ].rates
              }
              fee={paymentFee}
              globalCurrency={props.globalCurrency}
              isValid={formikProps.isValid}
            />
          </>
        )}
      </Formik>
    </View>
  );
}

DonationDetails.propTypes = {
  currencies: PropTypes.object.isRequired,
  selectedCurrency: PropTypes.string.isRequired,
  treeCountOptions: PropTypes.object.isRequired,
  selectedTreeCount: PropTypes.number.isRequired,
  rates: PropTypes.object.isRequired,
  fees: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  showNextButton: PropTypes.bool,
  onNextClick: PropTypes.func,
  selectedProject: PropTypes.object.isRequired
};

export default DonationDetails;

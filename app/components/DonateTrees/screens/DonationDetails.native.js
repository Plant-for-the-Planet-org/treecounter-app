import PropTypes from 'prop-types';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Platform,
  Image,
  ScrollView,
  Keyboard
} from 'react-native';
import { updateStaticRoute } from '../../../helpers/routerHelper';
import { paymentFee } from '../../../helpers/utils';
import styles from '../../../styles/donations/donationDetails';
import { SelectCountryModal } from '../components/DonationDetails/CountrySelector';
import { SupportUserDetails } from './../components/DonationDetails/SupportUserDetails';
import { PlantProjectDetails } from './../components/DonationDetails/PlantProjectDetails';
import { NoPlantProjectDetails } from './../components/DonationDetails/NoPlantProjectDetails';
import { TaxReceipt } from './../components/DonationDetails/TaxReceipt';
import {
  PledgeOnComponent,
  PledgeTreeCount
} from '../components/DonationDetails/PledgeOnComponent';
import { SelectTreeCount } from './../components/DonationDetails/SelectTreeCount';
import { Header } from './../components/Header';
import { GiftTreesComponent } from '../components/DonationDetails/GiftTreesComponent';
import ProjectModal from './../components/DonationDetails/ProjectModal';
import stripe from 'tipsi-stripe';
import SafeAreaView from 'react-native-safe-area-view';
import PaymentLoader from '../components/PaymentLoader';
import { nextArrowWhite } from '../../../assets';
import { formatNumber } from '../../../utils/utils';
import { handleNativePayPress } from '../components/PaymentOptions/NativePay';

import { SvgXml } from 'react-native-svg';
import google_pay from '../../../assets/svgAssets/donations/Gpay_Black';
import apple_pay from '../../../assets/svgAssets/donations/ApplePay_Black';
import colors from '../../../utils/constants';

function DonationDetails(props) {
  const [commissionSwitch] = React.useState(false); // for Switching whether the user wants to pay the commission of payment portal
  const [taxReceiptSwitch, setTaxReceiptSwitch] = React.useState(false); // for Switching whether the user wants receipt or not
  const [treeCount, setTreeCount] = React.useState(0); // for Selecting Tree Count
  // const [frequency, setFrequency] = React.useState('once'); // for Selecting Frequency of Donations
  const [showTaxCountryModal, setShowTaxCountryModal] = React.useState(false);

  const [loading, setLoading] = React.useState(false); // This starts the loader while payment is happening

  const useUserCountry =
    props.selectedProject.paymentSetup &&
    props.selectedProject.paymentSetup.taxDeductionCountries.includes(
      props.userCountry
    );
  let defaultCountry = useUserCountry
    ? props.userCountry
    : props.selectedProject.paymentSetup &&
      props.selectedProject.paymentSetup.defaultCountry;
  const [selectedTaxCountry, setSelectedTaxCountry] = React.useState(
    defaultCountry
  );

  const [currency, setCurrency] = React.useState(props.selectedCurrency);

  const [allowedNativePay, setallowedNativePay] = React.useState(false); // this is to test whether Apple/Google pay is allowed or not

  const [applePayStatus, setApplePayStatus] = React.useState('');

  React.useEffect(() => {
    const allowedNativePay = stripe.deviceSupportsNativePay();
    setallowedNativePay(allowedNativePay);
  }, [selectedTaxCountry]);

  // show hide project modal
  const [showProjectModal, setProjectModal] = React.useState(false);

  // Function for Switching the state of commission - Right now this functionality is disabled
  // const toggleSetCommission = value => {
  //   setCommissionSwitch(value);
  // };

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

  const [buttonType, setButtonType] = React.useState('showPayment');

  const keyboardDidShow = () => {
    setButtonType('');
  };

  const keyboardDidHide = () => {
    setButtonType('showPayment');
  };

  let keyboardDidShowListener;
  let keyboardDidHideListener;
  React.useEffect(() => {
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

  const saveContext = () => {
    props.contextActions.setDonationDetails({
      // frequency: frequency,
      ...props.context.donationDetails,
      totalTreeCount: treeCount,
      taxReceiptSwitch: taxReceiptSwitch,
      selectedProject: props.selectedProject,
      selectedTaxCountry: selectedTaxCountry,
      selectedCurrency: currency,
      rates:
        props.currencies.currencies.currency_rates[
          props.selectedProject.currency
        ].rates
    });
    props.contextActions.setPaymentDetails({
      stripe: stripe
    });
  };
  const onContinue = () => {
    // Set Donation Details and then switch the page
    saveContext();
    updateStaticRoute('donor_details_form', props.navigation, {
      navigation: props.navigation,
      paymentSetup: props.selectedProject.paymentSetup
    });
  };

  // const setDonationStatus = status => {
  //   // To be used to show errors
  // };

  return loading ? (
    <PaymentLoader />
  ) : (
    <SafeAreaView style={styles.mainContainer}>
      <ProjectModal
        hideModal={setProjectModal}
        show={showProjectModal}
        navigation={props.navigation}
        handleProjectChange={() => {
          setProjectModal(false);
        }}
        context={context}
      />

      <ScrollView
        contentContainerStyle={[
          styles.scrollView,
          Platform.OS === 'ios' ? null : { marginTop: 24 }
        ]}
      >
        <Header
          onBack={props.contextActions.clearDonationReducer}
          navigation={props.navigation}
          title={'Tree Donation'}
        />

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
              props.globalCurrency ? props.globalCurrency.currency : currency
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

        {/* Donation Context */}

        {context.contextType === 'support' ? (
          <SupportUserDetails context={context} />
        ) : null}

        {context.contextType === 'direct' ||
        context.contextType === 'support' ||
        context.contextType === null ? (
          <SelectTreeCount
            treeCount={treeCount}
            setTreeCount={setTreeCount}
            selectedProject={props.selectedProject}
            treeCountOptions={
              props.selectedProject.paymentSetup.treeCountOptions
            }
          />
        ) : null}

        {/* Gift Trees */}
        {context.contextType === 'gift-contact' ||
        context.contextType === 'gift-invitation' ? (
          <GiftTreesComponent
            treeCount={treeCount}
            setTreeCount={setTreeCount}
            selectedProject={props.selectedProject}
            context={context}
            treeCountOptions={
              props.selectedProject.paymentSetup.treeCountOptions
            }
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

        <View
          style={[styles.horizontalDivider, { width: '14%', marginTop: 30 }]}
        />

        {/* Tax Receipt */}
        {props.selectedProject.hasTaxDeduction && (
          <TaxReceipt
            taxReceiptSwitch={taxReceiptSwitch}
            toggleTaxReceipt={toggleTaxReceipt}
            setShowTaxCountryModal={setShowTaxCountryModal}
            selectedTaxCountry={selectedTaxCountry}
            oneTaxCountry={
              props.selectedProject.paymentSetup.taxDeductionCountries.length >
              1
                ? true
                : false
            }
          />
        )}

        <SelectCountryModal
          selectedCountry={selectedTaxCountry}
          setSelectedCountry={setSelectedTaxCountry}
          showModal={showTaxCountryModal}
          setShowModal={setShowTaxCountryModal}
          taxDeductibleCountries={
            props.selectedProject.paymentSetup.taxDeductionCountries
          }
        />
      </ScrollView>

      {buttonType === 'showPayment' ? (
        <PaymentOption
          treeCount={treeCount}
          commissionSwitch={commissionSwitch}
          navigation={props.navigation}
          onContinue={onContinue}
          // frequency={frequency}
          isApplePay={
            allowedNativePay ? (Platform.OS === 'ios' ? true : false) : null
          }
          setLoading={setLoading}
          stripe={stripe}
          setApplePayStatus={setApplePayStatus}
          applePayStatus={applePayStatus}
          currentUserProfile={props.currentUserProfile}
          context={context}
          createDonation={props.createDonation}
          setDonorDetails={props.contextActions.setDonorDetails}
          donationPay={props.donationPay}
          selectedProject={props.selectedProject}
          treeCost={props.selectedProject.treeCost}
          selectedCurrency={currency}
          rates={
            props.currencies.currencies.currency_rates[
              props.selectedProject.currency
            ].rates
          }
          fee={paymentFee}
          globalCurrency={props.globalCurrency}
          paymentSetup={props.selectedProject.paymentSetup}
          selectedTaxCountry={selectedTaxCountry}
        />
      ) : null}
    </SafeAreaView>
  );
}

export function PaymentOption(props) {
  let paymentProps = {
    totalTreeCount: String(props.treeCount),
    totalPrice: String(props.treeCount * props.treeCost),
    amountPerTree: String(props.treeCost),
    currency_code: String(props.selectedCurrency),
    stripe: props.stripe,
    currentUserProfile: props.currentUserProfile,
    context: props.context,
    createDonation: props.createDonation,
    setDonorDetails: props.setDonorDetails,
    donationPay: props.donationPay,
    selectedProject: props.selectedProject,
    paymentSetup: props.paymentSetup,
    selectedTaxCountry: props.selectedTaxCountry,
    setLoading: props.setLoading,
    navigation: props.navigation,
    setApplePayStatus: props.setApplePayStatus,
    isApplePay: props.isApplePay,
    isCredit: false
  };

  stripe.setOptions({
    publishableKey:
      props.selectedProject.paymentSetup.gateways[props.selectedTaxCountry] &&
      props.selectedProject.paymentSetup.gateways[props.selectedTaxCountry]
        .stripe &&
      props.selectedProject.paymentSetup.gateways[props.selectedTaxCountry]
        .stripe.stripePublishableKey
        ? props.selectedProject.paymentSetup.gateways[props.selectedTaxCountry]
            .stripe.stripePublishableKey
        : props.selectedProject.paymentSetup.gateways[
            props.selectedProject.paymentSetup.defaultCountry
          ].stripe.stripePublishableKey,
    merchantId: '', // The value can be blank but the key is needed
    androidPayMode: 'test' // Android only
  });
  return (
    <View style={styles.bottomButtonView}>
      {props.treeCount ? (
        <View style={{ flexDirection: 'column' }}>
          <View style={styles.paymentTreeDetails}>
            <Text style={styles.paymentTreeAmount}>
              {formatNumber(
                props.commissionSwitch
                  ? props.treeCost *
                      props.treeCount *
                      props.rates[props.selectedCurrency] +
                      ((props.treeCount / 100) * 2.9 + 0.3)
                  : props.treeCost *
                      props.treeCount *
                      props.rates[props.selectedCurrency],
                null,
                props.selectedCurrency
              )}
            </Text>
            <Text style={styles.paymentTreeCount}>
              {' '}
              for {props.treeCount} trees
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 12
            }}
          >
            <TouchableOpacity
              onPress={() => handleNativePayPress(paymentProps)}
              style={styles.nativePayButton}
            >
              <SvgXml
                style={{ maxHeight: 37, maxWidth: 150 }}
                xml={props.isApplePay ? apple_pay : google_pay}
              />
            </TouchableOpacity>
            <Text>OR</Text>
            <TouchableOpacity
              onPress={() => props.onContinue()}
              style={styles.continueOtherButton}
            >
              <Text style={styles.continueOtherButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : !props.treeCount ? (
        <>
          <Text style={styles.paymentTreeCount}>Please select Tree count</Text>
          <View
            style={[
              styles.continueButtonView,
              { backgroundColor: colors.GREY }
            ]}
          >
            <Text style={styles.continueButtonText}>Next</Text>
            <Image
              style={{ maxHeight: 24, maxWidth: 24 }}
              source={nextArrowWhite}
              resizeMode="contain"
            />
          </View>
        </>
      ) : null}
    </View>
  );
}

DonationDetails.propTypes = {
  currencies: PropTypes.object.isRequired,
  selectedProject: PropTypes.object.isRequired
};

export default DonationDetails;
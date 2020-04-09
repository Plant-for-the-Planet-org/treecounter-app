import PropTypes from 'prop-types';
import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../../../styles/donations/donationDetails';
import HeaderAnimated from '../../Header/HeaderAnimated.native';
import { CoverFee, NoPlantProjectDetails, PaymentOption, PlantProjectDetails, SelectFrequency, SelectTreeCount, SupportUserDetails, TaxReceipt } from '../components/donationComponents.native';
import { GiftTreesComponent } from '../components/giftDontaionComponents.native';
import ProjectModal from '../components/ProjectModal.native';

function DonationDetails(props) {
  const [commissionSwitch, setCommissionSwitch] = React.useState(false); // for Switching whether the user wants to pay the commission of payment portal
  const [taxReceiptSwitch, setTaxReceiptSwitch] = React.useState(false); // for Switching whether the user wants receipt or not
  const [treeCount, setTreeCount] = React.useState(''); // for Selecting Tree Count
  const [frequency, setFrequency] = React.useState(''); // for Selecting Frequency of Donations
  const [countryForTax, setCountryForTax] = React.useState(''); // for Selecting the Country
  const [scrollY, setScrollY] = React.useState(new Animated.Value(0));

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

  let context = props.context;

  return (
    <View style={{ backgroundColor: 'white' }}>
      <ProjectModal
        showHideModal={setProjectModal}
        show={showProjectModal}
        navigation={props.navigation}
        handleProjectChange={(project) => { console.log('project selected', project); setProjectModal(false) }} />
      <HeaderAnimated
        scrollY={scrollY}
        navigation={props.navigation}
        title={'Tree Donation'}
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
            <TouchableOpacity onPress={() => { setProjectModal(true) }}>
              <Text style={styles.sectionRightButton}>Change</Text>
            </TouchableOpacity>
          ) : null}
        </View>
        {props.selectedProject ? (
          <PlantProjectDetails
            treeCost={props.treeCost}
            selectedCurrency={props.selectedCurrency}
            selectedProject={props.selectedProject}
          />
        ) : (
            <NoPlantProjectDetails />
          )}

        {context.contextType === 'direct' ? (
          <SelectTreeCount
            treeCount={treeCount}
            setTreeCount={setTreeCount}
            selectedProject={props.selectedProject}
          />
        ) : null}

        {/* Donation Context */}

        {context.contextType === 'support' ? <SupportUserDetails context={context} /> : null}

        {/* Gift Trees */}
        {context.contextType === 'gift-contact' ||
          context.contextType === 'gift-invitation' ? (
            <GiftTreesComponent
              treeCount={treeCount}
              setTreeCount={setTreeCount}
              selectedProject={props.selectedProject}
              context={context}
            />
          ) : null}

        <SelectFrequency frequency={frequency} setFrequency={setFrequency} />
        <View style={[styles.horizontalDivider, { width: '14%' }]} />

        {/* Commission Covering */}
        {treeCount ? (
          <CoverFee
            selectedProject={props.selectedProject.tpoSlug}
            treeCount={treeCount}
            selectedCurrency={props.selectedCurrency}
            toggleSetCommission={toggleSetCommission}
            commissionSwitch={commissionSwitch}
          />
        ) : null}

        {/* Tax Receipt */}
        <TaxReceipt
          taxReceiptSwitch={taxReceiptSwitch}
          toggleTaxReceipt={toggleTaxReceipt}
        />

        {/* Needed In Future */}
        {/* <UserContactDetails donorDetails={donorDetails} /> */}
        {/* <UserPaymentDetails paymentDetails={paymentDetails} /> */}
        {/* <PaymentsProcessedBy/> */}


      </KeyboardAwareScrollView>

      {treeCount ? (
        <PaymentOption
          treeCount={treeCount}
          treeCost={props.treeCost}
          selectedCurrency={props.selectedCurrency}
          commissionSwitch={commissionSwitch}
          navigation={props.navigation}
        />
      ) : null}

    </View>
  );
}


DonationDetails.propTypes = {
  currencies: PropTypes.object.isRequired,
  selectedCurrency: PropTypes.string.isRequired,
  treeCountOptions: PropTypes.object.isRequired,
  selectedTreeCount: PropTypes.number.isRequired,
  treeCost: PropTypes.number.isRequired,
  rates: PropTypes.object.isRequired,
  fees: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  showNextButton: PropTypes.bool,
  onNextClick: PropTypes.func,
  selectedProject: PropTypes.object.isRequired
};

export default DonationDetails;
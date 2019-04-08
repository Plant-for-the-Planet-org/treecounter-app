import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TreeCountCurrencySelector from '../Currency/TreeCountCurrencySelector';
import { TabView } from 'react-native-tab-view';

import i18n from '../../locales/i18n.js';

import RecieptTabsView from './receiptTabs';

import { renderDottedTabbar } from '../../components/Common/Tabs/dottedtabbar';
// import PaymentSelector from '../Payment/PaymentSelector';
import { View, Text, Alert, Linking } from 'react-native';
import { paymentFee } from '../../helpers/utils';
import { getLocalRoute } from '../../actions/apiRouting';
import { context } from '../../config';
import TabContainer from '../../containers/Menu/TabContainer';
import LoadingIndicator from '../Common/LoadingIndicator';

export default class DonateTrees extends React.PureComponent {
  constructor(props) {
    super(props);

    let modeReceipt;
    if (props.currentUserProfile) {
      modeReceipt =
        props.currentUserProfile.type === 'individual'
          ? 'individual'
          : 'company';
    } else {
      modeReceipt = 'individual';
    }

    this.state = {
      index: 0,
      modeReceipt: modeReceipt,
      selectedCurrency: 'USD', // TODO: should be initialized via this.determineDefaultCurrency()
      selectedTreeCount: 0,
      selectedAmount: 0,
      form: {
        recipientType: modeReceipt
      },
      expanded: false,
      expandedOption: '1',
      routes: [
        // { key: 'selectPlant', title: 'Select Plant' },
        { key: 'currency', title: 'Donation Details' },
        { key: 'recipient', title: 'Donor Details' }
        // { key: 'payments', title: 'Payments' }
      ],
      giftTreeCounterName: null
    };

    this.handlePaymentApproved = this.handlePaymentApproved.bind(this);
    this.handleModeReceiptChange = this.handleModeReceiptChange.bind(this);
    this.handleTreeCountCurrencyChange = this.handleTreeCountCurrencyChange.bind(
      this
    );
    this.determineDefaultCurrency = this.determineDefaultCurrency.bind(this);

    this.setRecipientTabRef = element => {
      this.recipientTab = element;
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.props.onTabChange(this.state.routes[0].title);
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          this.handleOpenURL(url);
        }
      })
      .catch(err => {});
    Linking.addEventListener('url', this.handleOpenURL);
    let params = this.props.navigation.state.params;
    if (params !== undefined && params.giftMethod === 'invitation') {
      this.setState({
        giftTreeCounterName:
          params.userForm.firstname + ' ' + params.userForm.lastname
      });
    }
    if (params !== undefined && params.giftMethod === 'direct') {
      this.setState({ giftTreeCounterName: params.userForm.name });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { navigation } = this.props;
    if (nextProps.selectedProject) {
      const nextTreeCount =
        nextProps.selectedProject.paymentSetup.treeCountOptions
          .fixedDefaultTreeCount;
      const currentTreeCount = this.props.selectedProject
        ? this.props.selectedProject.paymentSetup.treeCountOptions
            .fixedDefaultTreeCount
        : null;

      if (nextTreeCount !== currentTreeCount) {
        this.setState({ selectedTreeCount: nextTreeCount });
      }
    }
    if (nextProps.paymentStatus && nextProps.paymentStatus.token) {
      this.openGateWay(
        getLocalRoute('app_payment', {
          donationContribution: nextProps.paymentStatus.token
        })
      );
    }
  }

  handleOpenURL = url => {
    if (url.url.split('//')[1] === 'paymentSuccess') {
      if (this.props.currentUserProfile) {
        this.props.loadUserProfile();
      }
      this.props.updateRoute('app_userHome');
    } else {
      // handle failure
      this.props.paymentClear();
      this.goToNextTab(1);
    }
  };

  // open your gateway
  openGateWay = async url => {
    url = context.scheme + '://' + context.host + url;
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      Linking.openURL(url).catch(err =>
        console.error('An error occurred', err)
      );
    }
  };

  getFees() {
    const directCurrencies = this.state.countryCurrencies.map(
      countryCurrency => {
        const [, currency] = countryCurrency.split('/');
        return currency;
      }
    );
    const directPaymentAvailable = directCurrencies.includes(
      this.state.selectedCurrency
    );
    return directPaymentAvailable ? 0 : 777; // some amount TBD
  }

  Tab1validated() {
    if (this.props.selectedProject) {
      this._handleIndexChange(0);
    }
  }

  Tab2validated = () => {
    if (this.state.selectedTreeCount) {
      this.setState({
        form: {
          ...this.state.form,
          treeCount: this.state.selectedTreeCount
        }
      });
      this._handleIndexChange(1);
    }
  };
  goToNextTab(value) {
    if (value) {
      let receipt = {};
      if (this.state.modeReceipt === 'individual') {
        receipt['receiptIndividual'] = value;
      } else {
        receipt['receiptCompany'] = value;
      }
      this.setState(
        {
          form: {
            ...this.state.form,
            ...receipt
          }
        },
        this.handlePaymentApproved
      );
    } else {
      // Do nothing
    }
  }

  handleTreeCountCurrencyChange(treeCountCurrencyData) {
    this.setState({
      selectedCurrency: treeCountCurrencyData.currency,
      selectedTreeCount: treeCountCurrencyData.treeCount,
      selectedAmount: treeCountCurrencyData.amount
    });
  }

  determineDefaultCurrency() {
    const { currentUserProfile, selectedProject } = this.props;
    const userCurrency =
      null === currentUserProfile ? null : currentUserProfile.currency;

    return null === userCurrency ? selectedProject.currency : userCurrency;
  }

  handleExpandedClicked = optionNumber => {
    this.setState({
      expandedOption: optionNumber
    });
  };

  handleModeReceiptChange(tab) {
    this.setState({
      modeReceipt: tab
    });
  }

  callExpanded = bool => {
    this.setState({
      expanded: bool
    });
  };

  componentWillUnmount() {
    this.props.paymentClear();
    Linking.removeEventListener('url', this.handleOpenURL);
  }
  _renderTabBar = props => {
    return renderDottedTabbar(
      props.navigationState.routes,
      this.state.index,
      index => {
        this._handleIndexChange(index);
      }
    );
  };

  getRecieptFormState = () => {
    if (this.state.modeReceipt === 'individual' && this.recipientTab) {
      if (this.recipientTab.individualRecipt)
        return this.recipientTab.individualRecipt.getValue();
    } else if (this.state.modeReceipt === 'company') {
      if (this.companyRecipt) return this.recipientTab.companyRecipt.getValue();
    }
    return null;
  };

  _renderScene = ({ route }) => {
    const { selectedProject } = this.props;
    let receipt;
    if (this.state.modeReceipt === 'individual') {
      receipt = this.state.form['receiptIndividual']
        ? this.state.form['receiptIndividual']
        : '';
    } else {
      receipt = this.state.form['receiptCompany']
        ? this.state.form['receiptCompany']
        : '';
    }
    let name = receipt !== '' ? receipt.firstname + receipt.lastname : '';
    let email = receipt !== '' ? receipt.email : '';
    let paymentMethods;
    if (receipt && selectedProject) {
      let countryCurrency = `${receipt.country}/${this.state.selectedCurrency}`;
      const countryCurrencies = selectedProject.paymentSetup.countries;
      if (!Object.keys(countryCurrencies).includes(countryCurrency)) {
        countryCurrency = selectedProject.paymentSetup.defaultCountryKey;
      }
      paymentMethods =
        selectedProject.paymentSetup.countries[countryCurrency].paymentMethods;
    }
    let currencies = this.props.currencies.currencies;

    switch (route.key) {
      case 'currency':
        return this.props.selectedTpo &&
          currencies &&
          this.props.selectedProject ? (
          <TreeCountCurrencySelector
            treeCost={selectedProject.treeCost}
            rates={currencies.currency_rates[selectedProject.currency].rates}
            giftTreeCounterName={this.state.giftTreeCounterName}
            selectedProject={selectedProject}
            fees={paymentFee}
            showNextButton={true}
            currencies={currencies.currency_names} // TODO: connect to data from API
            selectedCurrency={this.determineDefaultCurrency()}
            treeCountOptions={selectedProject.paymentSetup.treeCountOptions}
            onNextClick={this.Tab2validated}
            selectedTreeCount={this.state.selectedTreeCount}
            onChange={this.handleTreeCountCurrencyChange}
          />
        ) : (
          <LoadingIndicator />
        );
        break;

      case 'recipient': {
        return (
          <RecieptTabsView
            ref={this.setRecipientTabRef}
            showNextButton={true}
            currentUserProfile={this.props.currentUserProfile}
            formValue={this.state.form}
            goToNextTab={value => this.goToNextTab(value)}
            onReciptTabChange={tab => this.handleModeReceiptChange(tab)}
          />
        );
      }
    }
  };
  _handleIndexChange = index => {
    if (this._canJumpToTab(index)) {
      this.setState({ index });
      this.props.onTabChange(this.state.routes[index].title);
    }
  };

  _canJumpToTab = index => {
    if (index === 2) {
      if (this.getRecieptFormState() != null) {
        return true;
      }
      return false;
    }
    return true;
  };

  handlePaymentApproved() {
    let params = this.props.navigation.state.params;
    let sendState;
    if (params !== undefined && params.giftMethod != null) {
      if (params.giftMethod === 'invitation') {
        this.props.gift(
          {
            ...this.state.form,
            giftInvitation: params.userForm,
            giftMethod: params.giftMethod,
            paymentResponse: {
              gateway: 'offline',
              accountName: 'offline_US',
              isConfirmed: true,
              confirmation: 'iOS referred payment'
            },
            amount: this.state.selectedAmount,
            currency: this.state.selectedCurrency
          },
          this.props.selectedProject.id,
          this.props.currentUserProfile
        );
      } else if (params.giftMethod === 'direct') {
        this.props.gift(
          {
            ...this.state.form,
            giftTreecounter: params.userForm.id,
            giftMethod: params.giftMethod,
            paymentResponse: {
              gateway: 'offline',
              accountName: 'offline_US',
              isConfirmed: true,
              confirmation: 'iOS referred payment'
            },
            amount: this.state.selectedAmount,
            currency: this.state.selectedCurrency
          },
          this.props.selectedProject.id,
          this.props.currentUserProfile
        );
      }
      return;
    }
    sendState = { ...this.state.form };
    if (this.props.supportTreecounter.treecounterId) {
      sendState.communityTreecounter = this.props.supportTreecounter.treecounterId;
    }
    this.props.donate(
      {
        ...this.state.form,
        recipientType: this.state.modeReceipt,
        paymentResponse: {
          gateway: 'offline',
          accountName: 'offline_US',
          isConfirmed: true,
          confirmation: 'iOS referred payment'
        },
        amount: this.state.selectedAmount,
        currency: this.state.selectedCurrency
      },
      this.props.selectedProject.id,
      this.props.currentUserProfile
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          useNativeDriver={true}
          onIndexChange={this._handleIndexChange}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0
          }}
        >
          <TabContainer {...this.props} />
        </View>
      </View>
    );
  }
}

DonateTrees.propTypes = {
  selectedProject: PropTypes.object,
  selectedTpo: PropTypes.object,
  currentUserProfile: PropTypes.object,
  currencies: PropTypes.object,
  donate: PropTypes.func,
  paymentClear: PropTypes.func,
  supportTreecounter: PropTypes.object,
  paymentStatus: PropTypes.object,
  plantProjectClear: PropTypes.func,
  onTabChange: PropTypes.func,
  setProgressModelState: PropTypes.func,
  loadUserProfile: PropTypes.func,
  updateRoute: PropTypes.func
};

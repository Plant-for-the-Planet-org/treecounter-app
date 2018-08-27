import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TreeCountCurrencySelector from '../Currency/TreeCountCurrencySelector';
import { TabView } from 'react-native-tab-view';
import {
  individualSchemaOptions,
  receiptIndividualFormSchema,
  receiptCompanyFormSchema,
  companySchemaOptions
} from '../../server/parsedSchemas/donateTrees';

import i18n from '../../locales/i18n.js';
import SelectPlantProjectContainer from '../../containers/SelectPlantProject';
import RecieptTabsView from './receiptTabs';
import PlantProjectFull from '../PlantProjects/PlantProjectFull';

import { renderDottedTabbar } from '../../components/Common/Tabs/dottedtabbar';
import { ScrollView } from 'react-native';
import PaymentSelector from '../Payment/PaymentSelector';

export default class DonateTrees extends Component {
  static data = {
    tabsReceipt: [
      {
        name: i18n.t('label.individual_name'),
        id: 'individual'
      },
      {
        name: i18n.t('label.company_title'),
        id: 'company'
      }
    ]
  };

  constructor(props) {
    super(props);

    let modeReceipt;
    if (props.currentUserProfile) {
      modeReceipt =
        props.currentUserProfile.type === 'individual'
          ? 'individual'
          : 'company';
    } else {
      modeReceipt = '';
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
      showSelectProject: false,
      routes: [
        { key: 'selectPlant', title: 'Select Plant' },
        { key: 'currency', title: 'Donation Details' },
        { key: 'recipient', title: 'Donor Details' },
        { key: 'payments', title: 'Payments' }
      ]
    };

    this.handlePaymentApproved = this.handlePaymentApproved.bind(this);
    this.handleModeReceiptChange = this.handleModeReceiptChange.bind(this);
    this.handleTreeCountCurrencyChange = this.handleTreeCountCurrencyChange.bind(
      this
    );
    this.determineDefaultCurrency = this.determineDefaultCurrency.bind(this);
  }

  componentDidMount() {
    this.props.onTabChange(this.state.routes[0].title);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedProject) {
      this.setState({
        showSelectProject: false
      });
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
    } else {
      this.setState({
        showSelectProject: true
      });
    }
  }

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
      this._handleIndexChange(1);
    }
  }

  Tab2validated() {
    if (this.state.selectedTreeCount) {
      this.setState({
        form: {
          ...this.state.form,
          treeCount: this.state.selectedTreeCount
        }
      });
      this._handleIndexChange(2);
    }
  }
  goToNextTab(value) {
    if (value) {
      this.setState({
        form: {
          ...this.state.form,
          ...value
        }
      });
      this._handleIndexChange(3);
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
      modeReceipt: tab,
      form: {
        ...this.state.form,
        recipientType: tab
      }
    });
  }

  handlePaymentApproved(paymentResponse) {
    let sendState = { ...this.state.form };
    if (this.props.supportTreecounter.treecounterId) {
      sendState.communityTreecounter = this.props.supportTreecounter.treecounterId;
    }
    this.props.donate(
      {
        ...this.state.form,
        paymentResponse,
        amount: this.state.selectedAmount,
        currency: this.state.selectedCurrency
      },
      this.props.selectedProject.id
    );
  }

  callExpanded = bool => {
    this.setState({
      expanded: bool
    });
  };

  componentWillUnmount() {
    this.props.paymentClear();
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

  _renderScene = ({ route }) => {
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
    if (receipt) {
      let countryCurrency = `${receipt.country}/${this.state.selectedCurrency}`;
      const countryCurrencies = plantProject.paymentSetup.countries;
      if (!Object.keys(countryCurrencies).includes(countryCurrency)) {
        countryCurrency = plantProject.paymentSetup.defaultCountryKey;
      }
      paymentMethods =
        plantProject.paymentSetup.countries[countryCurrency].paymentMethods;
    }
    let plantProject = this.props.selectedProject;
    let currencies = this.props.currencies.currencies;

    let screenToShow;
    {
      this.props.selectedTpo && route.key === 'selectPlant'
        ? (screenToShow = (
            <ScrollView>
              <PlantProjectFull
                callExpanded={this.callExpanded}
                expanded={false}
                plantProject={this.props.selectedProject}
                tpoName={this.props.selectedTpo.name}
                selectAnotherProject={true}
                showNextButton={true}
                onNextClick={() => this.Tab1validated()}
                projectClear={this.props.plantProjectClear}
              />
            </ScrollView>
          ))
        : null;
    }

    {
      this.props.selectedTpo && currencies && route.key === 'currency'
        ? (screenToShow = (
            <TreeCountCurrencySelector
              treeCost={plantProject.treeCost}
              rates={currencies.currency_rates[plantProject.currency].rates}
              fees={1}
              showNextButton={true}
              currencies={currencies.currency_names} // TODO: connect to data from API
              selectedCurrency={this.determineDefaultCurrency()}
              treeCountOptions={plantProject.paymentSetup.treeCountOptions}
              onNextClick={() => this.Tab2validated()}
              selectedTreeCount={this.state.selectedTreeCount}
              onChange={this.handleTreeCountCurrencyChange}
            />
          ))
        : null;
    }

    {
      route.key === 'recipient'
        ? (screenToShow = (
            <RecieptTabsView
              showNextButton={true}
              goToNextTab={value => this.goToNextTab(value)}
              onReciptTabChange={tab => this.handleModeReceiptChange(tab)}
            />
          ))
        : null;
    }
    {
      route.key === 'payments'
        ? (screenToShow = (
            <PaymentSelector
              paymentMethods={paymentMethods}
              accounts={plantProject.paymentSetup.accounts}
              stripePublishableKey={
                plantProject.paymentSetup.stripePublishableKey
              }
              amount={this.state.selectedAmount}
              currency={this.state.selectedCurrency}
              expandedOption={this.state.expandedOption}
              handleExpandedClicked={this.handleExpandedClicked}
              context={{
                tpoName: this.props.selectedTpo.name,
                donorEmail: email,
                donorName: name,
                treeCount: this.state.selectedTreeCount
              }}
              onSuccess={paymentResponse =>
                this.handlePaymentApproved(paymentResponse)
              }
              onFailure={data =>
                console.log('/////////////////// payment failure ', data)
              }
              onError={data =>
                console.log('/////////////////// payment error ', data)
              }
            />
          ))
        : null;
    }
    return screenToShow;
  };
  _handleIndexChange = index => {
    this.props.onTabChange(this.state.routes[index].title);
    this.setState({ index });
  };

  render() {
    let plantProject = this.props.selectedProject;

    return this.state.showSelectProject ? (
      <SelectPlantProjectContainer />
    ) : !plantProject ? null : (
      <TabView
        animationEnabled={true}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        useNativeDriver={true}
        onIndexChange={this._handleIndexChange}
      />
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
  plantProjectClear: PropTypes.func
};

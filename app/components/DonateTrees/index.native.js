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
import { ScrollView, View, Text } from 'react-native';

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

    // this.handlePaymentApproved = this.handlePaymentApproved.bind(this);
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
    let plantProject = this.props.selectedProject;
    let currencies = this.props.currencies.currencies;
    let receipt = this.getRecieptFormState();

    if (receipt) {
      let countryCurrency = `${receipt.country}/${this.state.selectedCurrency}`;
      const countryCurrencies = plantProject.paymentSetup.countries;
      if (!Object.keys(countryCurrencies).includes(countryCurrency)) {
        countryCurrency = plantProject.paymentSetup.defaultCountryKey;
      }
      paymentMethods =
        plantProject.paymentSetup.countries[countryCurrency].paymentMethods;
    }
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
              ref={this.setRecipientTabRef}
              showNextButton={true}
              currentUserProfile={this.props.currentUserProfile}
              goToNextTab={value => this.goToNextTab(value)}
              onReciptTabChange={tab => this.handleModeReceiptChange(tab)}
            />
          ))
        : null;
    }
    {
      route.key === 'payments'
        ? (screenToShow = (
            <View>
              <Text>Payments</Text>
            </View>
          ))
        : null;
    }
    return screenToShow;
  };
  _handleIndexChange = index => {
    if (this._canJumpToTab(index)) {
      this.setState({ index });
      this.props.onTabChange(this.state.routes[index].title);
    }
  };

  _canJumpToTab = index => {
    if (index === 3) {
      if (this.getRecieptFormState() != null) {
        return true;
      }
      return false;
    }
    return true;
  };

  render() {
    let plantProject = this.props.selectedProject;
    return this.state.showSelectProject ? (
      <SelectPlantProjectContainer />
    ) : !plantProject ? null : (
      <TabView
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

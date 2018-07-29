import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import TextBlock from '../Common/Text/TextBlock';
import TreeCountCurrencySelector from '../Currency/TreeCountCurrencySelector';
import { TabView } from 'react-native-tab-view';
import {
  individualSchemaOptions,
  receiptIndividualFormSchema,
  receiptCompanyFormSchema,
  companySchemaOptions
} from '../../server/parsedSchemas/donateTrees';

import i18n from '../../locales/i18n.js';
import DescriptionHeading from '../Common/Heading/DescriptionHeading';
import SelectPlantTabView from './selectplant.tab.native';
import IndividualForm from './IndividualForm.native';
import CompanyForm from './companyForm.native';
import { View, Text } from 'react-native';
import styles from '../../styles/selectplantproject/selectplantproject';
import PlantProjectFull from '../PlantProjects/PlantProjectFull';
import { dottedTabBar } from '../Common/Tabs/dottedtabbar';

const pageHeadings = [
  {
    heading: i18n.t('label.donateTrees'),
    description: i18n.t('label.donate_trees_description')
  },
  {
    heading: i18n.t('label.donateTrees'),
    description: ''
  },
  {
    heading: i18n.t('label.donateTrees'),
    description: ''
  },
  {
    heading: i18n.t('label.donateTrees'),
    description: ''
  }
];

const headings = [
  i18n.t('label.heading_project'),
  i18n.t('label.heading_donate_details'),
  i18n.t('label.heading_donor_details'),
  i18n.t('label.heading_payment')
];

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
        { key: 'selectPlant', title: 'Select Plant Project' },
        { key: 'currency', title: 'Currency Selector' },
        { key: 'individual', title: 'Individual Form' },
        { key: 'company', title: 'Company Form' }
      ]
    };

    this.handlePaymentApproved = this.handlePaymentApproved.bind(this);
    this.handleModeReceiptChange = this.handleModeReceiptChange.bind(this);
    this.handleTreeCountCurrencyChange = this.handleTreeCountCurrencyChange.bind(
      this
    );
    this.determineDefaultCurrency = this.determineDefaultCurrency.bind(this);
  }

  componentDidMount() {}

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

  indexChange(index) {
    this.setState({
      pageIndex: index
    });
  }

  handleExpandedClicked = optionNumber => {
    this.setState({
      expandedOption: optionNumber
    });
  };

  checkValidation = [
    () => {
      if (this.props.selectedProject) {
        return true;
      }
      return false;
    },
    () => {
      if (this.state.selectedTreeCount) {
        this.setState({
          form: {
            ...this.state.form,
            treeCount: this.state.selectedTreeCount
          }
        });
        return true;
      }
      return false;
    },
    () => {
      console.log(this.refs.donateReceipt.validate());
      let value = this.refs.donateReceipt.getValue();
      let receipt = {};
      if (value) {
        if (this.state.modeReceipt === 'individual') {
          receipt['receiptIndividual'] = value;
        } else {
          receipt['receiptCompany'] = value;
        }
        this.setState({
          form: {
            ...this.state.form,
            ...receipt
          }
        });
        return true;
      }
      return false;
    }
  ];

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
    return dottedTabBar(props.navigationState.routes, this.state.index, index =>
      this.setState({ index })
    );
  };

  _renderScene = ({ route }) => {
    let plantProject = this.props.selectedProject;
    let currencies = this.props.currencies.currencies;
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
            <PlantProjectFull
              callExpanded={this.callExpanded}
              expanded={false}
              plantProject={this.props.selectedProject}
              tpoName={this.props.selectedTpo.name}
              selectAnotherProject={true}
              projectClear={this.props.plantProjectClear}
            />
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
              currencies={currencies.currency_names} // TODO: connect to data from API
              selectedCurrency={this.determineDefaultCurrency()}
              treeCountOptions={plantProject.paymentSetup.treeCountOptions}
              selectedTreeCount={this.state.selectedTreeCount}
              onChange={this.handleTreeCountCurrencyChange}
            />
          ))
        : null;
    }

    // {
    //   this.state.modeReceipt === DonateTrees.data.tabsReceipt[0].id &&
    //   route.key === 'individual'
    //     ? (screenToShow = <IndividualForm />)
    //     : null;
    // }
    // {
    //   this.state.modeReceipt === DonateTrees.data.tabsReceipt[1].id &&
    //   route.key === 'company'
    //     ? (screenToShow = <CompanyForm />)
    //     : null;
    // }
    return screenToShow;
  };
  _handleIndexChange = index => this.setState({ index });

  render() {
    let plantProject = this.props.selectedProject;
    return this.state.showSelectProject ? (
      <SelectPlantTabView />
    ) : !plantProject ? null : (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import Slider from 'react-slick';

import Tabs from '../Common/Tabs';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import ContentHeader from '../Common/ContentHeader';
import TextBlock from '../Common/Text/TextBlock';
import InlineLink from '../Common/InlineLink';
import CarouselNavigation from '../Common/CarouselNavigation';
import { arrow_left_green, check_green } from '../../assets';
import TreeCountCurrencySelector from '../Currency/TreeCountCurrencySelector';
import PrimaryButton from '../Common/Button/PrimaryButton';
import classNames from 'classnames';
import {
  individualSchemaOptions,
  receiptIndividualFormSchema,
  receiptCompanyFormSchema,
  companySchemaOptions
} from '../../server/parsedSchemas/donateTrees';
import PlantProjectFull from '../PlantProjects/PlantProjectFull';
import SelectPlantProjectContainer from '../../containers/SelectPlantProject';

import i18n from '../../locales/i18n.js';
import PaymentSelector from '../Payment/PaymentSelector';
import DescriptionHeading from '../Common/Heading/DescriptionHeading';

let TCombForm = t.form.Form;

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
      pageIndex: 0,
      modeReceipt: modeReceipt,
      selectedCurrency: 'USD', // TODO: should be initialized via this.determineDefaultCurrency()
      selectedTreeCount: 0,
      selectedAmount: 0,
      form: {
        recipientType: modeReceipt
      },
      expanded: false,
      expandedOption: '1',
      showSelectProject: false
    };

    this.handlePaymentApproved = this.handlePaymentApproved.bind(this);
    this.handleModeReceiptChange = this.handleModeReceiptChange.bind(this);
    this.handleTreeCountCurrencyChange = this.handleTreeCountCurrencyChange.bind(
      this
    );
    this.determineDefaultCurrency = this.determineDefaultCurrency.bind(this);
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

  render() {
    let displayNone = classNames({
      'display-none': this.state.pageIndex === 3
    });
    if (this.refs.slider) {
      setTimeout(() => {
        if (this.state.pageIndex === 3) {
          this.refs.slider.slickGoTo(this.state.pageIndex);
        }
      }, 1000);
    }
    const NextArrow = function(props) {
      function validated() {
        if (props.checkValidation[props.currentSlide].call(props.context)) {
          props.onClick();
        }
      }

      return (
        <div className={displayNone}>
          <PrimaryButton onClick={validated}>Next</PrimaryButton>
        </div>
      );
    };
    const settings = {
      dots: true,
      nextArrow: (
        <NextArrow checkValidation={this.checkValidation} context={this} />
      ),
      infinite: true,
      adaptiveHeight: true,
      currentSlide: this.state.pageIndex,
      prevArrow: (
        <CarouselNavigation
          styleName="donate-tree-nav-img__left"
          src={arrow_left_green}
        />
      ),
      beforeChange: (oldIndex, index) => this.indexChange(index)
    };

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

    return this.state.showSelectProject ? (
      <SelectPlantProjectContainer />
    ) : !plantProject ? null : (
      <div className="sidenav-wrapper app-container__content--center">
        <TextHeading>{pageHeadings[this.state.pageIndex].heading}</TextHeading>
        <DescriptionHeading>
          {pageHeadings[this.state.pageIndex].description}
        </DescriptionHeading>
        <CardLayout className="tpo-footer-card-layout">
          {this.props.paymentStatus && this.props.paymentStatus.status ? (
            <div className="payment-success">
              <img src={check_green} />
              <div className={'gap'} />
              <TextBlock strong={true}>
                {i18n.t('label.thankyou')} {this.state.treeCount}{' '}
                {i18n.t('label.receive_mail')}
              </TextBlock>
              <div className={'gap'} />
              <TextBlock>
                <InlineLink uri={'app_userHome'} caption={'Return Home'} />
              </TextBlock>
            </div>
          ) : this.props.paymentStatus && this.props.paymentStatus.message ? (
            <div className="payment-success">
              <img src={check_green} />
              <div className={'gap'} />
              <TextBlock strong={true}>
                {'Error ' + this.props.paymentStatus.message}
              </TextBlock>
              <div className={'gap'} />
              <TextBlock>
                <PrimaryButton onClick={this.props.paymentClear}>
                  Try again
                </PrimaryButton>
              </TextBlock>
            </div>
          ) : (
            <div className="donate-tress__container">
              <ContentHeader caption={headings[this.state.pageIndex]} />
              <Slider {...settings} ref="slider">
                <div>
                  {this.props.selectedTpo ? (
                    <PlantProjectFull
                      callExpanded={this.callExpanded}
                      expanded={false}
                      plantProject={this.props.selectedProject}
                      tpoName={this.props.selectedTpo.name}
                      selectAnotherProject={true}
                      projectClear={this.props.plantProjectClear}
                    />
                  ) : null}
                </div>
                <div>
                  {this.props.selectedTpo && currencies ? (
                    <TreeCountCurrencySelector
                      treeCost={plantProject.treeCost}
                      rates={
                        currencies.currency_rates[plantProject.currency].rates
                      }
                      fees={1}
                      currencies={currencies.currency_names} // TODO: connect to data from API
                      selectedCurrency={this.determineDefaultCurrency()}
                      treeCountOptions={
                        plantProject.paymentSetup.treeCountOptions
                      }
                      selectedTreeCount={this.state.selectedTreeCount}
                      onChange={this.handleTreeCountCurrencyChange}
                    />
                  ) : null}
                </div>
                <div>
                  <Tabs
                    data={DonateTrees.data.tabsReceipt}
                    onTabChange={this.handleModeReceiptChange}
                    activeTab={
                      this.state.modeReceipt !== ''
                        ? this.state.modeReceipt
                        : null
                    }
                  >
                    {this.state.modeReceipt ===
                    DonateTrees.data.tabsReceipt[0].id ? (
                      <TCombForm
                        ref="donateReceipt"
                        type={receiptIndividualFormSchema}
                        options={individualSchemaOptions}
                        value={this.props.currentUserProfile}
                      />
                    ) : (
                      <TCombForm
                        ref="donateReceipt"
                        type={receiptCompanyFormSchema}
                        options={companySchemaOptions}
                        value={this.props.currentUserProfile}
                      />
                    )}
                  </Tabs>
                </div>
                <div>
                  {this.props.selectedTpo ? (
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
                        console.log(
                          '/////////////////// payment failure ',
                          data
                        )
                      }
                      onError={data =>
                        console.log('/////////////////// payment error ', data)
                      }
                    />
                  ) : null}
                </div>
              </Slider>
            </div>
          )}
        </CardLayout>
      </div>
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

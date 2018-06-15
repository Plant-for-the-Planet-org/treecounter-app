import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import Slider from 'react-slick';

import Tabs from '../Common/Tabs';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import ContentHeader from '../Common/ContentHeader';
import CarouselNavigation from '../Common/CarouselNavigation';
import { arrow_left_green } from '../../assets';
import TreeCountCurrencySelector from '../Currency/TreeCountCurrencySelector';
import currenciesJson from '../Currency/currencies';
import PrimaryButton from '../Common/Button/PrimaryButton';
import classNames from 'classnames';

import {
  individualSchemaOptions,
  receiptIndividualFormSchema,
  receiptCompanyFormSchema,
  companySchemaOptions
} from '../../server/parsedSchemas/donateTrees';
import PlantProjectFull from '../PlantProjects/PlantProjectFull';

import i18n from '../../locales/i18n.js';
import PaymentSelector from '../Payment/PaymentSelector';

let TCombForm = t.form.Form;

const headings = ['Project', 'Donation Details', 'Donor Details', 'Payment'];

class DonateTrees extends Component {
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
      modeReceipt = props.currentUserProfile.type;
    } else {
      modeReceipt = '';
    }

    this.state = {
      pageIndex: 0,
      modeReceipt: modeReceipt,
      selectedCurrency: 'USD',
      selectedTreeCount: 0,
      selectedAmount: 0,
      form: {},
      expanded: false,
      expandedOption: '1',
      showNextButton: true
    };

    this.handleModeReceiptChange = this.handleModeReceiptChange.bind(this);
    this.handleTreeCountCurrencyChange = this.handleTreeCountCurrencyChange.bind(
      this
    );
    this.determineDefaultCurrency = this.determineDefaultCurrency.bind(this);
    // this.checkValidation = this.checkValidation[0].bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.selectedProject) {
      if (this.props.selectedProject) {
        if (
          nextProps.selectedProject.paymentSetup.treeCountOptions
            .fixedDefaultTreeCount !==
          this.props.selectedProject.paymentSetup.treeCountOptions
            .fixedDefaultTreeCount
        ) {
          this.setState({
            selectedTreeCount:
              nextProps.selectedProject.paymentSetup.treeCountOptions
                .fixedDefaultTreeCount
          });
        }
      } else {
        this.setState({
          selectedTreeCount:
            nextProps.selectedProject.paymentSetup.treeCountOptions
              .fixedDefaultTreeCount
        });
      }
    }
  }

  handleTreeCountCurrencyChange(treeCountCurrencyData) {
    console.log('handleTreeCountCurrencyChange', treeCountCurrencyData);
    this.setState({
      selectedCurrency: treeCountCurrencyData.currency,
      selectedTreeCount: treeCountCurrencyData.treeCount,
      selectedAmount: treeCountCurrencyData.amount
    });

    // TODO: insert these 3 values into the corresponding form fields
  }

  determineDefaultCurrency() {
    const { currentUserProfile, selectedProject } = this.props;
    const userCurrency =
      null === currentUserProfile ? null : currentUserProfile.currency;

    return null === userCurrency ? selectedProject.currency : userCurrency;
  }

  indexChange(index) {
    this.setState({
      pageIndex: index,
      showNextButton: index !== 3
    });
  }
  handleExpandedClicked = optionNumber => {
    this.setState({
      expandedOption: optionNumber
    });
  };

  checkValidation = [
    () => {
      console.log('Selected Project' + this.props.selectedProject);
      if (this.props.selectedProject) {
        return true;
      }
      return false;
    },
    () => {
      console.log('select treecount' + this.state.selectedTreeCount);
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
      if (value) {
        this.setState({
          form: {
            ...this.state.form,
            donationReceipt: value
          }
        });
        return true;
      }
      return false;
    }
  ];

  handleModeReceiptChange(tab) {
    this.setState({ modeReceipt: tab });
  }

  callExpanded = bool => {
    this.setState({
      expanded: bool
    });
  };

  render() {
    let displayNone = classNames({
      'display-none': !this.state.showNextButton
    });
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
      infinite: false,
      adaptiveHeight: true,
      prevArrow: (
        <CarouselNavigation
          styleName="donate-tree-nav-img__left"
          src={arrow_left_green}
        />
      ),
      beforeChange: (oldIndex, index) => this.indexChange(index)
    };

    let plantProject = this.props.selectedProject;
    let name = this.state.form.donationReceipt
      ? this.state.form.donationReceipt.firstname +
        this.state.form.donationReceipt.lastname
      : '';
    let email = this.state.form.donationReceipt
      ? this.state.form.donationReceipt.email
      : '';

    return !plantProject ? null : (
      <div className="sidenav-wrapper app-container__content--center">
        <TextHeading>{i18n.t('label.donateTrees')}</TextHeading>
        <CardLayout className="tpo-footer-card-layout">
          <div className="donate-tress__container">
            <ContentHeader caption={headings[this.state.pageIndex]} />
            <Slider {...settings}>
              {this.props.selectedTpo ? (
                <PlantProjectFull
                  callExpanded={this.callExpanded}
                  expanded={false}
                  plantProject={this.props.selectedProject}
                  tpoName={this.props.selectedTpo.name}
                  selectAnotherProject={true}
                />
              ) : null}
              {this.props.selectedTpo ? (
                <TreeCountCurrencySelector
                  currencies={currenciesJson} // TODO: connect to data from API
                  countryCurrencies={Object.keys(
                    plantProject.paymentSetup.countries
                  )}
                  treeCountOptions={plantProject.paymentSetup.treeCountOptions}
                  userCountry="DE" // TODO: connect to user profile
                  treeCost={plantProject.treeCost}
                  baseCurrency={plantProject.currency}
                  selectedCurrency={this.determineDefaultCurrency()}
                  selectedTreeCount={this.state.selectedTreeCount}
                  onChange={this.handleTreeCountCurrencyChange}
                />
              ) : null}
              <Tabs
                data={DonateTrees.data.tabsReceipt}
                onTabChange={this.handleModeReceiptChange}
                activeTab={
                  this.state.modeReceipt !== '' ? this.state.modeReceipt : null
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
              {this.props.selectedTpo ? (
                <PaymentSelector
                  paymentMethods={
                    plantProject.paymentSetup.countries['DE/EUR'].paymentMethods
                  }
                  accounts={plantProject.paymentSetup.accounts}
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
                  onSuccess={
                    data =>
                      console.log('/////////////////// payment success ', data)
                    // TODO: connect to form: paymentOptions and paymentMethod
                  }
                  onFailure={data =>
                    console.log('/////////////////// payment failure ', data)
                  }
                  onError={data =>
                    console.log('/////////////////// payment error ', data)
                  }
                />
              ) : null}
            </Slider>
          </div>
        </CardLayout>
      </div>
    );
  }
}

DonateTrees.propTypes = {
  selectedProject: PropTypes.object,
  selectedTpo: PropTypes.object,
  currentUserProfile: PropTypes.object
};

export default DonateTrees;

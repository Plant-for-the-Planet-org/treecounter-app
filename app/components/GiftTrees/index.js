import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import Slider from 'react-slick';
import classNames from 'classnames';

import Tabs from '../Common/Tabs';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card';
import SearchAutosuggest from '../Header/SearchAutosuggest';
import ContentHeader from '../Common/ContentHeader';
import CarouselNavigation from '../Common/CarouselNavigation';
import { arrow_left_green, check_green, attention } from '../../assets';
import TreeCountCurrencySelector from '../Currency/TreeCountCurrencySelector';
import PrimaryButton from '../Common/Button/PrimaryButton';
import SelectPlantProjectContainer from '../../containers/SelectPlantProject';
import { paymentFee } from '../../helpers/utils';

import {
  individualSchemaOptions,
  receiptIndividualFormSchema,
  receiptCompanyFormSchema,
  companySchemaOptions
} from '../../server/parsedSchemas/donateTrees';

import {
  giftInvitationFormSchema,
  giftInvitationSchemaOptions
} from '../../server/parsedSchemas/giftTrees';
import PlantProjectFull from '../PlantProjects/PlantProjectFull';
import i18n from '../../locales/i18n';
import PaymentSelector from '../Payment/PaymentSelector';
import DescriptionHeading from '../Common/Heading/DescriptionHeading';
import TextBlock from '../Common/Text/TextBlock';
import InlineLink from '../Common/InlineLink';

let TCombForm = t.form.Form;

const headings = [
  i18n.t('label.heading_give'),
  i18n.t('label.heading_project'),
  i18n.t('label.heading_donate_details'),
  i18n.t('label.heading_donor_details'),
  i18n.t('label.heading_payment')
];

const pageHeadings = [
  {
    heading: i18n.t('label.gift_trees'),
    description: i18n.t('label.gift_trees_description')
  },

  {
    heading: i18n.t('label.gift_trees'),
    description: i18n.t('label.donate_trees_description')
  },
  {
    heading: i18n.t('label.gift_trees'),
    description: ''
  },
  {
    heading: i18n.t('label.gift_trees'),
    description: ''
  },
  {
    heading: i18n.t('label.gift_trees'),
    description: ''
  }
];

export default class GiftTrees extends Component {
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
    ],
    tabsUser: [
      {
        name: i18n.t('label.treecounter_user_name'),
        id: 'direct'
      },
      {
        name: i18n.t('label.other_email'),
        id: 'invitation'
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
      selectedCurrency: 'USD', // TODO: should be initialized via this.determineDefaultCurrency()
      selectedTreeCount: 0,
      selectedAmount: 0,
      form: {
        recipientType: modeReceipt,
        giftMethod: 'direct'
      },
      giftTreecounterName: null,
      expanded: false,
      imageViewMore: false,
      expandedOption: '1',
      showNextButton: true,
      showSelectProject: false
    };

    this.handlePaymentApproved = this.handlePaymentApproved.bind(this);
    this.handleModeReceiptChange = this.handleModeReceiptChange.bind(this);
    this.handleTreeCountCurrencyChange = this.handleTreeCountCurrencyChange.bind(
      this
    );
    this.determineDefaultCurrency = this.determineDefaultCurrency.bind(this);
    this.handleModeUserChange = this.handleModeUserChange.bind(this);
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

  handleTreeCountCurrencyChange(treeCountCurrencyData) {
    this.setState({
      selectedCurrency: treeCountCurrencyData.currency,
      selectedTreeCount: treeCountCurrencyData.treeCount,
      selectedAmount: treeCountCurrencyData.amount
    });
  }

  indexChange(index) {
    this.setState({
      pageIndex: index,
      showNextButton: index !== 5
    });
  }

  handleExpandedClicked = optionNumber => {
    this.setState({
      expandedOption: optionNumber
    });
  };

  componentWillUnmount() {
    this.props.paymentClear();
  }

  checkValidation = [
    () => {
      if (this.state.modeUser === 'direct') {
        let returnValue;
        returnValue = this.state.form.directGift.treecounter ? true : false;
        this.setState({
          form: {
            ...this.state.form
          }
        });
        return returnValue;
      } else {
        let value = this.refs.giftInvitation.getValue();
        if (value) {
          this.setState({
            form: {
              ...this.state.form,
              giftInvitation: value
            },
            giftTreecounterName: value.firstname + ' ' + value.lastname
          });
          return true;
        }
        return false;
      }
    },
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
      //console.log(this.refs.donateReceipt.validate());
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

  determineDefaultCurrency() {
    const { currentUserProfile, selectedProject } = this.props;
    const userCurrency =
      null === currentUserProfile ? null : currentUserProfile.currency;

    return null === userCurrency ? selectedProject.currency : userCurrency;
  }

  handleModeUserChange(tab) {
    this.setState({
      modeUser: tab,
      message: '',
      form: { ...this.state.form, giftMethod: tab }
    });
  }

  handleModeReceiptChange(tab) {
    this.setState({
      modeReceipt: tab,
      form: {
        ...this.state.form,
        recipientType: tab
      }
    });
  }

  suggestionClicked = (context, event) => {
    this.setState({
      form: {
        ...this.state.form,
        directGift: { treecounter: event.suggestion.treecounterId }
      },
      giftTreecounterName: event.suggestion.name
    });
  };

  handlePaymentApproved(paymentResponse) {
    if (this.state.form.giftMethod === 'direct') {
      this.props.gift(
        {
          paymentResponse,
          ...this.state.form,
          amount: this.state.selectedAmount,
          currency: this.state.selectedCurrency
        },
        this.props.selectedProject.id
      );
    } else {
      this.props.gift(
        {
          paymentResponse,
          ...this.state.form,
          amount: this.state.selectedAmount,
          currency: this.state.selectedCurrency
        },
        this.props.selectedProject.id
      );
    }
  }

  callExpanded = bool => {
    this.setState({
      expanded: bool
    });
  };
  handleMessageChange(event) {
    //set message as part of form only as we are setting treecounter.
    this.setState({});
    this.setState({
      form: {
        ...this.state.form,
        directGift: {
          ...this.state.form.directGift,
          message: event.target.value
        }
      }
    });
  }

  render() {
    let displayNone = classNames({
      'display-none': !this.state.showNextButton
    });
    let { pageIndex } = this.state;

    if (this.refs.slider) {
      setTimeout(() => {
        if (pageIndex === 4) {
          if (this.refs.slider && this.refs.slider.slickGoTo) {
            this.refs.slider.slickGoTo(pageIndex);
          }
        }
      }, 1000);
    }
    let heading =
      pageHeadings[pageIndex].heading +
      (this.state.giftTreecounterName !== null
        ? ' to ' + this.state.giftTreecounterName
        : '');
    const NextArrow = function(props) {
      function validated() {
        if (props.checkValidation[props.currentSlide].call(props.context)) {
          props.onClick();
        }
      }

      return (
        <div className={displayNone}>
          {pageIndex === 4 ? null : (
            <PrimaryButton onClick={validated}>
              {i18n.t('label.next')}
            </PrimaryButton>
          )}
        </div>
      );
    };
    const settings = {
      dots: true,
      initialSlide: this.state.pageIndex,
      nextArrow: (
        <NextArrow checkValidation={this.checkValidation} context={this} />
      ),
      infinite: false,
      lazyLoad: true,
      adaptiveHeight: true,
      prevArrow: (
        <CarouselNavigation
          styleName={
            this.state.pageIndex === 0
              ? 'display-none'
              : 'donate-tree-nav-img__left'
          }
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

    return this.state.showSelectProject && this.state.pageIndex === 1 ? (
      <SelectPlantProjectContainer />
    ) : (
      <div className="sidenav-wrapper app-container__content--center">
        <TextHeading>
          {heading}
          <DescriptionHeading>
            {pageHeadings[this.state.pageIndex].description}
          </DescriptionHeading>
        </TextHeading>

        {this.props.paymentStatus && this.props.paymentStatus.status ? (
          <CardLayout>
            <div className="payment-success">
              <img src={check_green} />
              <div className={'gap'} />
              <TextBlock strong={true}>
                {i18n.t('label.thankyou_planting', {
                  count: this.state.treeCount
                })}
              </TextBlock>
              <div className={'gap'} />
              <TextBlock>
                <InlineLink uri={'app_userHome'} caption={'Return Home'} />
              </TextBlock>
            </div>
          </CardLayout>
        ) : this.props.paymentStatus && this.props.paymentStatus.message ? (
          <CardLayout>
            <div className="payment-success">
              <img src={attention} />
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
          </CardLayout>
        ) : (
          <div className="donate-tress__container">
            <ContentHeader caption={headings[this.state.pageIndex]} />
            <Slider {...settings} ref="slider">
              <div className="treecount-selector-wrapper">
                <Tabs
                  data={GiftTrees.data.tabsUser}
                  onTabChange={this.handleModeUserChange}
                >
                  {this.state.modeUser === GiftTrees.data.tabsUser[0].id ? (
                    <React.Fragment>
                      <SearchAutosuggest
                        onSuggestionClicked={this.suggestionClicked}
                        clearSuggestions={false}
                        hideCompetitions
                      />
                      <div className="pftp-textarea">
                        <textarea
                          placeholder="Gift Message"
                          onChange={this.handleMessageChange.bind(this)}
                        />
                      </div>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <TCombForm
                        ref="giftInvitation"
                        type={giftInvitationFormSchema}
                        options={giftInvitationSchemaOptions}
                      />
                    </React.Fragment>
                  )}
                </Tabs>
              </div>
              {this.props.selectedTpo ? (
                !plantProject ? null : (
                  <PlantProjectFull
                    onViewMoreClick={() =>
                      this.setState({
                        imageViewMore: !this.state.imageViewMore
                      })
                    }
                    callExpanded={this.callExpanded}
                    expanded={false}
                    plantProject={this.props.selectedProject}
                    tpoName={this.props.selectedTpo.name}
                    selectAnotherProject={true}
                    projectClear={this.props.plantProjectClear}
                  />
                )
              ) : null}
              {this.props.selectedTpo && currencies ? (
                <TreeCountCurrencySelector
                  treeCost={plantProject.treeCost}
                  rates={currencies.currency_rates[plantProject.currency].rates}
                  fees={paymentFee}
                  currencies={currencies.currency_names}
                  selectedCurrency={this.determineDefaultCurrency()}
                  treeCountOptions={plantProject.paymentSetup.treeCountOptions}
                  selectedTreeCount={this.state.selectedTreeCount}
                  onChange={this.handleTreeCountCurrencyChange}
                />
              ) : null}
              <Tabs
                data={GiftTrees.data.tabsReceipt}
                onTabChange={this.handleModeReceiptChange}
                activeTab={
                  this.state.modeReceipt !== '' ? this.state.modeReceipt : null
                }
              >
                {this.state.modeReceipt === GiftTrees.data.tabsReceipt[0].id ? (
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
                    treeCount: this.state.selectedTreeCount,
                    plantProjectName: plantProject.name,
                    giftTreeCounterName: this.state.giftTreecounterName,
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
              ) : null}
            </Slider>
          </div>
        )}
      </div>
    );
  }
}

GiftTrees.propTypes = {
  selectedProject: PropTypes.object,
  selectedTpo: PropTypes.object,
  currentUserProfile: PropTypes.object,
  currencies: PropTypes.object,
  gift: PropTypes.func,
  paymentStatus: PropTypes.object,
  paymentClear: PropTypes.func,
  plantProjectClear: PropTypes.func
};

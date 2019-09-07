import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import Slider from 'react-slick';

import Tabs from '../Common/Tabs';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card';
import ContentHeader from '../Common/ContentHeader';
import TextBlock from '../Common/Text/TextBlock';
import InlineLink from '../Common/InlineLink';
import CarouselNavigation from '../Common/CarouselNavigation';
import { arrow_left_green, check_green, attention } from '../../assets';
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
import { paymentFee } from '../../helpers/utils';

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
    let receipt = {};
    if (props.currentUserProfile) {
      modeReceipt =
        props.currentUserProfile.type === 'individual'
          ? 'individual'
          : 'company';
      if (modeReceipt === 'individual') {
        receipt['receiptIndividual'] = props.currentUserProfile;
      } else {
        receipt['receiptCompany'] = props.currentUserProfile;
      }
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
        ...receipt
      },
      expanded: false,
      imageViewMore: false,
      donationCreated: false,
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

  componentWillReceiveProps(nextProps, nextState) {
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

  componentDidUpdate(nextProps, nextState) {
    if (nextState.donationCreated !== this.state.donationCreated) {
      let requestData = {
        amount: nextState.selectedAmount * 100,
        currency: nextState.selectedCurrency,
        ...nextState.form
      };
      nextProps.createPaymentDonation(
        nextProps.selectedProject.id,
        requestData,
        nextProps.currentUserProfile
      );
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
      // console.log(this.refs.donateReceipt.validate());
      let value = this.refs.donateReceipt && this.refs.donateReceipt.getValue();
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
          },
          donationCreated: true
        });
        return true;
      }
      return false;
    }
  ];

  checkValidationPreviousArrow = [
    () => {
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
      // console.log(this.refs.donateReceipt.validate());
      let value = this.refs.donateReceipt && this.refs.donateReceipt.getValue();
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
    let recipientType;
    if (this.state.modeReceipt === 'individual') {
      recipientType = 'receiptIndividual';
    } else {
      recipientType = 'receiptCompany';
    }
    if (
      this.props.currentUserProfile &&
      !this.props.currentUserProfile.address &&
      this.state.form[recipientType].address
    ) {
      this.props.updateUserProfile(this.state.form[recipientType], 'profile');
    }
    this.props.donate(
      {
        ...sendState,
        paymentResponse,
        amount: this.state.selectedAmount,
        currency: this.state.selectedCurrency
      },
      this.props.selectedProject.id,
      this.props.currentUserProfile
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
    // this is just for NextArrow displayNone
    let displayNone = classNames({
      'display-none': this.state.pageIndex === 3
    });

    if (this.refs.slider) {
      setTimeout(() => {
        if (this.refs.slider && this.state.pageIndex === 3) {
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
        <div
          className={['select-project_button__container', displayNone].join(
            ' '
          )}
        >
          <PrimaryButton onClick={validated}>
            {i18n.t('label.next')}
          </PrimaryButton>
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
      currentSlide: this.state.pageIndex,
      lazyLoad: true,
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
      beforeChange: (oldIndex, index) => {
        //payment index
        if (
          index > oldIndex &&
          this.checkValidation[index - 1] &&
          this.checkValidation[oldIndex]
        ) {
          const lastIndexCheck = this.checkValidation[index - 1].call(this);
          const oldIndexCheck = this.checkValidation[oldIndex].call(this);
          if (oldIndexCheck && lastIndexCheck) {
            this.indexChange(index);
          } else {
            if (this.refs.slider) {
              setTimeout(() => {
                if (this.refs.slider) {
                  this.refs.slider.slickGoTo(
                    !oldIndexCheck ? oldIndex : index - 1
                  );
                }
              }, 1000);
            }
          }
        } else {
          this.indexChange(index);
        }
      }
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
    let name = receipt !== '' ? receipt.firstname + ' ' + receipt.lastname : '';
    let email = receipt !== '' ? receipt.email : '';
    let address = receipt !== '' ? receipt.address : '';
    let zipCode = receipt !== '' ? receipt.zipCode : '';
    let city = receipt !== '' ? receipt.city : '';
    let country = receipt !== '' ? receipt.country : '';

    let paymentMethods;

    if (receipt && plantProject) {
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
        <TextHeading>
          {this.props.supportTreecounter.treecounterId
            ? i18n.t('label.support_trees_to', {
                user: this.props.supportTreecounter.displayName
              })
            : pageHeadings[this.state.pageIndex].heading}
          <DescriptionHeading>
            {pageHeadings[this.state.pageIndex].description}
          </DescriptionHeading>
        </TextHeading>
        {this.props.paymentStatus &&
        !this.props.paymentStatus.status &&
        this.props.paymentStatus.message ? (
          <CardLayout>
            <div className="payment-success">
              <img src={attention} />
              <div className={'gap'} />
              <TextBlock strong={true}>
                {i18n.t('label.error') + ' ' + this.props.paymentStatus.message}
              </TextBlock>
              <div className={'gap'} />
              <TextBlock>
                <PrimaryButton onClick={this.props.paymentClear}>
                  {i18n.t('label.try_again')}
                </PrimaryButton>
              </TextBlock>
            </div>
          </CardLayout>
        ) : this.props.paymentStatus && this.props.paymentStatus.status ? (
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
                <InlineLink
                  uri={'app_userHome'}
                  caption={i18n.t('label.return_home')}
                />
              </TextBlock>
            </div>
          </CardLayout>
        ) : (
          <form
            className="donate-tress__container"
            onSubmit={event => {
              event.preventDefault();
            }}
          >
            <div>
              <ContentHeader caption={headings[this.state.pageIndex]} />

              <Slider {...settings} ref="slider">
                <div>
                  {this.props.selectedTpo ? (
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
                  ) : null}
                </div>
                <div>
                  {this.props.selectedTpo && currencies ? (
                    <TreeCountCurrencySelector
                      treeCost={plantProject.treeCost.toFixed(2)}
                      rates={
                        currencies.currency_rates[plantProject.currency].rates
                      }
                      fees={paymentFee}
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
                        value={this.state.form['receiptIndividual']}
                      />
                    ) : (
                      <TCombForm
                        ref="donateReceipt"
                        type={receiptCompanyFormSchema}
                        options={companySchemaOptions}
                        value={this.state.form['receiptCompany']}
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
                      currentUserProfile={this.props.currentUserProfile}
                      paymentStatus={this.props.paymentStatus}
                      currency={this.state.selectedCurrency}
                      expandedOption={this.state.expandedOption}
                      handleExpandedClicked={this.handleExpandedClicked}
                      receipt={{
                        ...receipt,
                        modeReceipt: this.state.modeReceipt
                      }}
                      paymentDetails={{
                        amount: this.state.selectedAmount,
                        currency: this.state.selectedCurrency,
                        treeCount: this.state.selectedTreeCount
                      }}
                      context={{
                        treeCount: this.state.selectedTreeCount,
                        tpoName: this.props.selectedTpo.name,
                        supportTreecounter: this.props.supportTreecounter,
                        plantProjectName: plantProject.name
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
          </form>
        )}
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
  plantProjectClear: PropTypes.func,
  updateUserProfile: PropTypes.func,
  createPaymentDonation: PropTypes.func
};

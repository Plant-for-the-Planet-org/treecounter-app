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

import {
  individualSchemaOptions,
  receiptIndividualFormSchema,
  receiptCompanyFormSchema,
  companySchemaOptions
} from '../../server/parsedSchemas/donateTrees';
import PlantProjectFull from '../PlantProjects/PlantProjectFull';
import PaymentSelector from '../Payment/PaymentSelector';
import { getImageUrl } from '../../actions/apiRouting';

let TCombForm = t.form.Form;

const headings = ['Project', 'Donation Details', 'Donor Details', 'Payment'];

export default class DonateTrees extends Component {
  static data = {
    tabsReceipt: [
      {
        name: 'Individual',
        id: 'individual'
      },
      {
        name: 'Company',
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
      selectedCurrency: '',
      selectedTreeCount: 0,
      selectedAmount: 0,
      form: {},
      expanded: false
    };

    this.handleModeReceiptChange = this.handleModeReceiptChange.bind(this);
    this.handleTreeCountCurrencyChange = this.handleTreeCountCurrencyChange.bind(
      this
    );
    // this.checkValidation = this.checkValidation[0].bind(this);
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

  indexChange(index) {
    this.setState({
      pageIndex: index
    });
  }

  checkValidation = [
    () => {
      return true;
    },
    () => {
      return true;
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
    const NextArrow = function(props) {
      function validated() {
        if (props.checkValidation()) {
          props.onClick();
        }
      }

      return <PrimaryButton onClick={validated}>Next</PrimaryButton>;
    };
    const settings = {
      dots: true,
      nextArrow: (
        <NextArrow
          checkValidation={this.checkValidation[this.state.pageIndex].bind(
            this
          )}
        />
      ),
      infinite: false,
      adaptiveHeight: true,
      prevArrow: (
        <CarouselNavigation
          styleName="donate-tree-nav-img__left"
          src={arrow_left_green}
        />
      ),
      afterChange: index => this.indexChange(index)
    };

    const plantProject = this.props.selectedProject;
    console.log('************ plantProject ', plantProject);
    return undefined === plantProject ? null : (
      <div className="sidenav-wrapper app-container__content--center">
        <TextHeading>Gift trees</TextHeading>
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
                />
              ) : null}

              {this.props.selectedTpo ? (
                <TreeCountCurrencySelector
                  currencies={currenciesJson}
                  countryCurrencies={Object.keys(
                    plantProject.paymentSetup.countries
                  )}
                  treeCountOptions={plantProject.paymentSetup.treeCountOptions}
                  userCountry="DE"
                  treeCost={plantProject.treeCost}
                  baseCurrency={plantProject.currency}
                  selectedCurrency={plantProject.currency}
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

              {this.props.selectedProject ? (
                <PaymentSelector
                  paymentMethods={
                    plantProject.paymentSetup.countries['DE/EUR'].paymentMethods
                  }
                  accounts={plantProject.paymentSetup.accounts}
                  amount={this.state.selectedAmount}
                  currency={this.state.selectedCurrency}
                  context={{
                    tpoName: this.props.selectedTpo.name,
                    treeCount: this.state.selectedTreeCount,
                    image: getImageUrl(
                      'profile',
                      'avatar',
                      this.props.selectedTpo.image
                    ),
                    email: this.props.currentUserProfile
                      ? this.props.currentUserProfile.email
                      : 'jorgo@miridis.com'
                  }}
                  onSuccess={data =>
                    console.log('/////////////////// payment success ', data)
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

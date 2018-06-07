import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';
import Slider from 'react-slick';

import Tabs from '../Common/Tabs';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import SearchAutosuggest from '../Header/SearchAutosuggest';
import ContentHeader from '../Common/ContentHeader';
import CarouselNavigation from '../Common/CarouselNavigation';
import { arrow_left_green } from '../../assets';
import TreeCountCurrencySelector from './TreeCountCurrencySelector';
import currenciesJson from './currencies';
import PrimaryButton from '../Common/Button/PrimaryButton';

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

let TCombForm = t.form.Form;

const headings = ['Give to...', 'Donation Details', 'Donor Details', 'Payment'];

export default class GiftTrees extends Component {
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
    ],
    tabsUser: [
      {
        name: 'TreeCounter User',
        id: 'direct'
      },
      {
        name: 'Other',
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
      modeUser: '',
      selectedCurrency: null,
      selectedTreeCount: 0,
      form: {},
      expanded: false
    };

    this.handleModeReceiptChange = this.handleModeReceiptChange.bind(this);
    this.handleModeUserChange = this.handleModeUserChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleTreeCountChange = this.handleTreeCountChange.bind(this);
    // this.checkValidation = this.checkValidation[0].bind(this);
  }

  handleCurrencyChange(selectedCurrency) {
    console.log('handleCurrencyChange', selectedCurrency);
    this.setState({ selectedCurrency });
  }

  handleTreeCountChange(selectedTreeCount) {
    console.log('========= handleTreecountChange', selectedTreeCount);
    this.setState({ selectedTreeCount });
  }

  indexChange(index) {
    this.setState({
      pageIndex: index
    });
  }

  checkValidation = [
    () => {
      if (this.state.modeUser === 'direct') {
        let returnValue;
        returnValue = this.state.form.giftTreecounter ? true : false;
        return returnValue;
      } else {
        let value = this.refs.giftInvitation.getValue();
        if (value) {
          this.setState({
            form: {
              ...this.state.form,
              giftInvitation: value
            }
          });
          return true;
        }
        return false;
      }
    },
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

  handleModeUserChange(tab) {
    this.setState({
      modeUser: tab,
      form: { ...this.state.form, giftMethod: tab }
    });
  }

  handleModeReceiptChange(tab) {
    this.setState({ modeReceipt: tab });
  }

  suggestionClicked = (context, event) => {
    this.setState({
      form: {
        ...this.state.form,
        giftTreecounter: event.suggestion.id
      }
    });
  };

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

    return null === plantProject ? null : (
      <div className="sidenav-wrapper app-container__content--center">
        <TextHeading>Gift trees</TextHeading>
        <CardLayout className="tpo-footer-card-layout">
          <div className="donate-tress__container">
            <ContentHeader caption={headings[this.state.pageIndex]} />
            <Slider {...settings}>
              <div className="treecount-selector-wrapper">
                <Tabs
                  data={GiftTrees.data.tabsUser}
                  onTabChange={this.handleModeUserChange}
                >
                  {this.state.modeUser === GiftTrees.data.tabsUser[0].id ? (
                    <SearchAutosuggest
                      onSuggestionClicked={this.suggestionClicked}
                    />
                  ) : (
                    <TCombForm
                      ref="giftInvitation"
                      type={giftInvitationFormSchema}
                      options={giftInvitationSchemaOptions}
                    />
                  )}
                </Tabs>
              </div>
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
                  baseCurrency={plantProject.currency}
                  onCurrencyChange={this.handleCurrencyChange}
                  onTreeCountChange={this.handleTreeCountChange}
                  selectedCurrency={plantProject.currency}
                  selectedTreeCount={this.state.selectedTreeCount}
                  treeCost={plantProject.treeCost}
                  treeCountOptions={plantProject.paymentSetup.treeCountOptions}
                  currencies={currenciesJson}
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
            </Slider>
          </div>
        </CardLayout>

        {/*<TreecountCurrencySelector*/}
        {/*currencies={this.props.selectedProject}*/}
        {/*tpoName={this.props.selectedTpo.name}*/}
        {/*/>*/}
      </div>
    );
  }
}

GiftTrees.propTypes = {
  selectedProject: PropTypes.object,
  selectedTpo: PropTypes.object,
  currentUserProfile: PropTypes.object
};

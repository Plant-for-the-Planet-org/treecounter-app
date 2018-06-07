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
  recieptIndividualFormSchema,
  recieptCompanyFormSchema,
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
    tabsReciept: [
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
        id: 'treecounter-user'
      },
      {
        name: 'Other',
        id: 'other'
      }
    ]
  };

  constructor(props) {
    super(props);

    this.state = {
      pageIndex: 0,
      modeReciept: '',
      modeUser: '',
      selectedCurrency: null,
      selectedTreeCount: 0
    };

    this.handleModeRecieptChange = this.handleModeRecieptChange.bind(this);
    this.handleModeUserChange = this.handleModeUserChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleTreeCountChange = this.handleTreeCountChange.bind(this);
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

  handleModeUserChange(tab) {
    this.setState({ modeUser: tab });
  }

  handleModeRecieptChange(tab) {
    this.setState({ modeReciept: tab });
  }

  suggestionClicked = (context, event) => {
    console.log(event.suggestion.id);
  };

  render() {
    const NextArrow = function(props) {
      console.log(props);
      return <PrimaryButton onClick={props.onClick}>Next</PrimaryButton>;
    };
    const settings = {
      dots: true,
      nextArrow: <NextArrow />,
      infinite: false,
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
              {this.props.selectedTpo ? (
                <PlantProjectFull
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
                data={GiftTrees.data.tabsReciept}
                onTabChange={this.handleModeRecieptChange}
              >
                {this.state.modeReciept === GiftTrees.data.tabsReciept[0].id ? (
                  <TCombForm
                    ref="donateReciept"
                    type={recieptIndividualFormSchema}
                    options={individualSchemaOptions}
                  />
                ) : (
                  <TCombForm
                    ref="donateReciept"
                    type={recieptCompanyFormSchema}
                    options={companySchemaOptions}
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
  selectedTpo: PropTypes.object
};

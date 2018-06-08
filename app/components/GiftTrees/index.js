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
import { arrow_right_green, arrow_left_green } from '../../assets';
import TreeCountCurrencySelector from './TreeCountCurrencySelector';
import currenciesJson from './currencies';

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
import i18n from '../../locales/i18n';

let TCombForm = t.form.Form;

const headings = [
  i18n.t('label.heading1'),
  i18n.t('label.heading2'),
  i18n.t('label.heading3'),
  i18n.t('label.heading4')
];

export default class GiftTrees extends Component {
  static data = {
    tabsReciept: [
      {
        name: i18n.t('label.individual_name'),
        id: i18n.t('label.individual')
      },
      {
        name: i18n.t('label.company_title'),
        id: i18n.t('label.company')
      }
    ],
    tabsUser: [
      {
        name: i18n.t('label.treecointer_user_name'),
        id: i18n.t('label.treecointer_user')
      },
      {
        name: i18n.t('label.other_name'),
        id: i18n.t('label.other')
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

  suggestionCLicked = (context, event) => {
    console.log(event.suggestion.id);
  };

  render() {
    const settings = {
      dots: true,
      nextArrow: (
        <CarouselNavigation
          styleName="donate-tree-nav-img__right"
          src={arrow_right_green}
        />
      ),
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
        <TextHeading>{i18n.t('label.gift_trees')}</TextHeading>
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
                    onSuggestionClicked={this.suggestionCLicked}
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

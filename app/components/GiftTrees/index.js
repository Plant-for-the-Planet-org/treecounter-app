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
import PlantProjectFull from '../PlantProjects/PlantProjectFull';

import {
  individualSchemaOptions,
  recieptIndividualFormSchema,
  recieptCompanyFormSchema,
  companySchemaOptions
} from '../../server/parsedSchemas/donateTrees';

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
      modeUser: ''
    };

    this.handleModeRecieptChange = this.handleModeRecieptChange.bind(this);
    this.handleModeUserChange = this.handleModeUserChange.bind(this);
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

    return (
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
                  <SearchAutosuggest />
                ) : null}
              </Tabs>
              {this.props.selectedTpo ? (
                <PlantProjectFull
                  expanded={false}
                  plantProject={this.props.selectedProject}
                  tpoName={this.props.selectedTpo.name}
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
      </div>
    );
  }
}

GiftTrees.propTypes = {
  selectedProject: PropTypes.object,
  selectedTpo: PropTypes.object
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import Tabs from '../Common/Tabs';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import Slider from 'react-slick';
import ContentHeader from '../Common/ContentHeader';
import CarouselNavigation from '../Common/CarouselNavigation';
import { arrow_left_green } from '../../assets';
import PlantProjectFull from '../PlantProjects/PlantProjectFull';

import {
  individualSchemaOptions,
  recieptIndividualFormSchema,
  recieptCompanyFormSchema,
  companySchemaOptions
} from '../../server/parsedSchemas/donateTrees';
import PrimaryButton from '../Common/Button/PrimaryButton';

let TCombForm = t.form.Form;

const headings = ['Project', 'Donation Details', 'Donor Details', 'Payment'];

export default class DonateTrees extends Component {
  static data = {
    tabs: [
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

    this.state = {
      pageIndex: 0,
      mode: ''
    };

    this.handleModeOptionChange = this.handleModeOptionChange.bind(this);
  }

  indexChange(index) {
    console.log(index);
    this.setState({
      pageIndex: index
    });
  }

  handleModeOptionChange(tab) {
    this.setState({ mode: tab });
  }

  render() {
    const NextArrow = function(props) {
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

    return (
      <div className="sidenav-wrapper app-container__content--center">
        <TextHeading>Donate trees</TextHeading>
        <CardLayout className="tpo-footer-card-layout">
          <div className="donate-tress__container">
            <ContentHeader caption={headings[this.state.pageIndex]} />
            <Slider {...settings}>
              {this.props.selectedTpo ? (
                <PlantProjectFull
                  expanded={false}
                  plantProject={this.props.selectedProject}
                  tpoName={this.props.selectedTpo.name}
                />
              ) : null}
              <Tabs
                data={DonateTrees.data.tabs}
                onTabChange={this.handleModeOptionChange}
              >
                {this.state.mode === DonateTrees.data.tabs[0].id ? (
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

DonateTrees.propTypes = {
  selectedProject: PropTypes.object,
  selectedTpo: PropTypes.object,
  onClick: PropTypes.func
};

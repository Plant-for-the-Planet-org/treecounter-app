import React, { Component } from 'react';
import t from 'tcomb-form';
import PropTypes from 'prop-types';

import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import Slider from 'react-slick';
import ContentHeader from '../Common/ContentHeader';
import CarouselNavigation from '../Common/CarouselNavigation';
import { arrow_right_green, arrow_left_green } from '../../assets';
import {
  targetFormSchema,
  schemaOptions
} from '../../server/parsedSchemas/target';

let TCombForm = t.form.Form;

const headings = ['Project', 'Donation Details', 'Donor Details', 'Payment'];

export default class DonateTrees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0
    };
  }
  indexChange(index) {
    console.log(index);
    this.setState({
      pageIndex: index
    });
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
        <TextHeading>Donate trees</TextHeading>
        <div className="donate-tress__container">
          <CardLayout className="tpo-footer-card-layout">
            <ContentHeader caption={headings[this.state.pageIndex]} />
            <Slider {...settings}>
              <TCombForm
                ref="setTargetForm"
                type={targetFormSchema}
                options={schemaOptions}
              />
            </Slider>
          </CardLayout>
        </div>
      </div>
    );
  }
}

DonateTrees.propTypes = {
  selectedProject: PropTypes.object
};

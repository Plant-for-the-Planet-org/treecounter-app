import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import Slider from 'react-slick';
import ContentHeader from '../Common/ContentHeader';
import CarouselNavigation from '../Common/CarouselNavigation';
import { arrow_right_green, arrow_left_green } from '../../assets';
import {
  selectedPlantProjectSelector,
  selectedTpoSelector
} from '../../selectors/index';

const headings = ['Project', 'Donation Details', 'Donor Details', 'Payment'];

class DonateTrees extends Component {
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
    console.log(
      '**************** selectedPlantProject: ',
      this.props.selectedPlantProject
    );
    console.log('**************** selectedTpo: ', this.props.selectedTpo);

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
              <div>
                <h3>1</h3>
                <h3>1</h3>
                <h3>1</h3>
                <h3>1</h3>
                <h3>1</h3>
                <h3>1</h3>
                <h3>1</h3>
                <h3>1</h3>
                <h3>1</h3>
                <h3>1</h3>
              </div>
              <div>
                <h3>2</h3>
              </div>
              <div>
                <h3>3</h3>
              </div>
              <div>
                <h3>4</h3>
              </div>
            </Slider>
          </CardLayout>
        </div>
      </div>
    );
  }
}

DonateTrees.propTypes = {
  selectedPlantProject: PropTypes.object,
  selectedTpo: PropTypes.object
};

const mapStateToProps = state => {
  return {
    selectedPlantProject: selectedPlantProjectSelector(state),
    selectedTpo: selectedTpoSelector(state)
  };
};

export default connect(mapStateToProps)(DonateTrees);

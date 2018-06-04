import React, { Component } from 'react';
import PageHeader from '../Common/PageHeader';
import CardLayout from '../Common/Card/CardLayout';
import Slider from 'react-slick';
import ContentHeader from '../Common/ContentHeader';
import CarouselNavigation from '../Common/CarouselNavigation';
import { arrow_right_orange, arrow_left_orange } from '../../assets';
export default class DonateTrees extends Component {
  render() {
    const settings = {
      nextArrow: (
        <CarouselNavigation
          styleName="donate-tree-nav-img__right"
          src={arrow_right_orange}
        />
      ),
      prevArrow: (
        <CarouselNavigation
          styleName="donate-tree-nav-img__left"
          src={arrow_left_orange}
        />
      )
    };
    return (
      <div className="sidenav-wrapper donate-tress__container">
        <PageHeader caption="Donate Trees" />
        <CardLayout className="tpo-footer-card-layout">
          <ContentHeader caption="Project" />
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
            <div>
              <h3>5</h3>
            </div>
            <div>
              <h3>6</h3>
            </div>
          </Slider>
        </CardLayout>
      </div>
    );
  }
}

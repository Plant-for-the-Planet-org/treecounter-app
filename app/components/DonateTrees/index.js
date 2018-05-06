import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  plantProjectsSelector
} from '../../selectors';
import {
  sortedUserContributionsSelector,
  userPlantProjectsActualSelector
} from '../../selectors/index';
import PageHeader from '../Common/PageHeader';
import PreviouslyDonated from './previouslyDonated';
import FeaturedProjects from './FeaturedProjects';
import DonateTreesCarousel from './DonateTreesCarousel';
import SearchProjects from './SearchProjects';
import * as constants from '../../SupportedLanguages/en';

class DonateTrees extends Component {
  componentDidMount() {
    $('#carousel-example-generic').carousel({
      interval: 5000
    });

    $('.Previously_carousel .item:first').addClass('active');
    $('.Previously_carousel .item').each(function () {
      let itemToClone = $(this);

      for (let i = 1; i < 4; i++) {
        itemToClone = itemToClone.next();

        // wrap around if at end of item collection
        if (!itemToClone.length) {
          itemToClone = $(this).siblings(':first');
        }

        // grab item, clone, add marker class, add to collection
        itemToClone
          .children(':first-child')
          .clone()
          .addClass('cloneditem-' + i)
          .appendTo($(this));
      }
    });

    $('#featured_carousel .featured:first').addClass('active');
    $('#featured_carousel .featured').each(function () {
      let itemToClone1 = $(this);
      for (let i = 1; i < 4; i++) {
        itemToClone1 = itemToClone1.next();

        // wrap around if at end of item collection
        if (!itemToClone1.length) {
          itemToClone1 = $(this).siblings(':first');
        }

        // grab item, clone, add marker class, add to collection
        itemToClone1
          .children(':first-child')
          .clone()
          .addClass('cloneditemNew-' + i)
          .appendTo($(this));
      }
    });
  }

  render() {
    const {
      userPlantProjectSelect,
      userTpos,
      plantProjects
    } = this.props;
    return (
      <div className="sidenav-wrapper">
        <PageHeader caption="Donate Trees" />
        {Object.keys(userPlantProjectSelect).length > 0 ? (
          <div>
            <div className="text-center">
              <h3 className="cs-subHeading">
                {constants.formStrings.previouslyDonated}
              </h3>
            </div>
            <DonateTreesCarousel
              carouselClass="carousel carousel-showmanymoveone slide Previously_carousel"
              id="Previously_carousel"
            >
              <PreviouslyDonated
                userPlantProjectSelect={userPlantProjectSelect}
                userTpos={userTpos}
              />
            </DonateTreesCarousel>
          </div>
        ) : null}
        <div className="clearfix" />
        <div>
          <h3 className="cs-subHeading">
            {constants.formStrings.featuredProjects}
          </h3>
          <div>
            <DonateTreesCarousel
              carouselClass="carousel carousel-showmanymoveone slide featured_carousel"
              id="featured_carousel"
            >
              <FeaturedProjects
                plantProjects={plantProjects}
                userTpos={userTpos}
              />
            </DonateTreesCarousel>
          </div>
        </div>
        <div className="clearfix" />
        <SearchProjects plantProjects={plantProjects} userTpos={userTpos} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userTpos: state.entities.tpo,
  userContributions: sortedUserContributionsSelector(state),
  userPlantProjectSelect: userPlantProjectsActualSelector(state),
  plantProjects: plantProjectsSelector(state)
});

export default connect(mapStateToProps)(DonateTrees);

DonateTrees.propTypes = {
  userPlantProjectSelect: PropTypes.object.isRequired,
  userTpos: PropTypes.object.isRequired,
  userPlantProjects: PropTypes.object.isRequired,
  plantProjects: PropTypes.object.isRequired,
};

import React, { PureComponent } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getImageUrl } from '../../actions/apiRouting';
import i18n from '../../locales/i18n';

class PlantProjectImageCarousel extends PureComponent {
  itemsSize = 3;

  constructor(props) {
    super(props);
    this.state = { showViewMore: false, viewItems: [], offset: this.itemsSize };
  }
  UNSAFE_componentWillMount() {
    const { projectImages } = this.props;
    if (projectImages && projectImages.length > 0) {
      if (projectImages.length < this.state.offset) {
        this.setState({ viewItems: projectImages });
      } else {
        this.updateViewItems(this.state.offset);
      }
    }
  }
  onViewMoreClick = () => {
    this.props.onViewMoreClick();
    let newOffset = this.state.offset + this.itemsSize;
    if (newOffset > this.props.projectImages.length) {
      newOffset =
        this.state.offset +
        (this.props.projectImages.length - this.state.offset);
    }
    this.updateViewItems(newOffset);
  };
  updateViewItems(offset) {
    let tempViewItems = [];
    for (let i = 0; i < offset; i++) {
      tempViewItems.push(this.props.projectImages[i]);
    }
    let showViewMore = offset < this.props.projectImages.length;
    this.setState({
      viewItems: tempViewItems,
      offset: offset,
      showViewMore: showViewMore
    });
  }
  render() {
    return (
      <div className="project-images-carousal__container">
        {this.state.viewItems.map(projectImage => (
          <div
            className="image__container"
            key={`plantProject-${projectImage.image}`}
          >
            <img
              className="image-carousal"
              onClick={() => this.props.carousalImageClick(projectImage)}
              src={getImageUrl('project', 'large', projectImage.image)}
            />
          </div>
        ))}
        {this.state.showViewMore ? (
          <div
            className="image__container view-more"
            key={`view-more`}
            onClick={this.onViewMoreClick}
          >
            {i18n.t('label.view_more')}
          </div>
        ) : null}
      </div>
    );
  }
}

PlantProjectImageCarousel.propTypes = {
  projectImages: PropTypes.array,
  carousalImageClick: PropTypes.func,
  onViewMoreClick: PropTypes.func
};

export default PlantProjectImageCarousel;

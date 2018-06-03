import React from 'react';
import PropTypes from 'prop-types';

import PrimaryButton from '../Common/Button/PrimaryButton';
import CardLayout from '../Common/Card/CardLayout';
import ContentHeader from '../Common/ContentHeader';
import PlantProjectCarousel from './PlantProjectCarousel';

/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component---TpoDonationPlantProjectSelector
 *
 * The currently visible PlantProject is either initialized via prop 'defaultPlantProjectId' or set to be the first
 * (and maybe only) PlantProject. It is updated by the PlantProjectCarousel 'onChange' callback.
 *
 * When the 'donate' button is clicked, the id of the currently visible PlantProject is provided to the callback
 * function 'onSelect' so the parent component can take appropriate action.
 */
class TpoDonationPlantProjectSelector extends React.Component {
  constructor(props) {
    super(props);
    this.onCarouselChange = this.onCarouselChange.bind(this);

    let defaultPlantProjectId = props.defaultPlantProjectId;
    if (Array.isArray(props.plantProjects)) {
      if (null === defaultPlantProjectId) {
        defaultPlantProjectId = props.plantProjects.find(() => true).id;
      }
    }

    this.state = { currentPlantProjectId: defaultPlantProjectId };
  }

  onCarouselChange(newPlantProjectId) {
    console.log('onCarouselChange:: currentPlantProjectId', newPlantProjectId);
    this.setState({ currentPlantProjectId: newPlantProjectId });
  }

  render() {
    const { plantProjects, onSelect, tpoName } = this.props;
    const caption =
      plantProjects.length === 1
        ? 'caption.plant_project'
        : 'caption.plant_projects';
    const TagName = 'PlantProjectFull';

    return (
      <CardLayout className="tpo-footer-card-layout">
        <ContentHeader caption={caption} />
        {1 === plantProjects.length ? (
          <TagName
            plantProject={plantProjects.find(() => true)}
            expanded={false}
          />
        ) : (
          <PlantProjectCarousel
            contentTag={TagName}
            plantProjects={plantProjects}
            tpoName={tpoName}
            currentPlantProjectId={this.state.currentPlantProjectId}
            onChange={this.onCarouselChange}
          />
        )}
        <PrimaryButton
          onClick={() => onSelect(this.state.currentPlantProjectId)}
        >
          button.label.donate
        </PrimaryButton>
      </CardLayout>
    );
  }
}

TpoDonationPlantProjectSelector.propTypes = {
  plantProjects: PropTypes.array.isRequired,
  defaultPlantProjectId: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
  tpoName: PropTypes.string.isRequired
};

export default TpoDonationPlantProjectSelector;

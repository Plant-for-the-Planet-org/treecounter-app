import React from 'react';
import PropTypes from 'prop-types';

import PrimaryButton from '../Common/Button/PrimaryButton';
import CardLayout from '../Common/Card';
import ContentHeader from '../Common/ContentHeader';
import PlantProjectCarousel from './PlantProjectCarousel';
import i18n from '../../locales/i18n';

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
  componentWillReceiveProps(nextProps) {
    console.log('got in receive props', nextProps);
    if (nextProps.plantProjects && nextProps.plantProjects.length) {
      let defaultPlantProjectId = nextProps.defaultPlantProjectId;
      if (Array.isArray(nextProps.plantProjects)) {
        if (null === defaultPlantProjectId) {
          defaultPlantProjectId = nextProps.plantProjects.find(() => true).id;
        }
      }

      this.setState({ currentPlantProjectId: defaultPlantProjectId });
    }
  }
  onCarouselChange(newPlantProjectId) {
    this.setState({ currentPlantProjectId: newPlantProjectId });
  }

  render() {
    const { plantProjects, onSelect, tpoName } = this.props;
    let state = this.state;
    const caption =
      plantProjects.length === 1
        ? i18n.t('label.plant_project')
        : i18n.t('label.plant_projects');
    const TagName = i18n.t('label.plant_project_full');
    return (
      <CardLayout className="tpo-footer-card-layout">
        <div className="tpo-footer__container">
          <ContentHeader caption={caption} />
          <PlantProjectCarousel
            contentTag={TagName}
            plantProjects={plantProjects}
            tpoName={tpoName}
            currentPlantProjectId={this.state.currentPlantProjectId}
            onChange={this.onCarouselChange}
          />
          {plantProjects.filter(
            project => project.id === state.currentPlantProjectId
          ).length > 0 &&
          plantProjects.filter(
            project => project.id === state.currentPlantProjectId
          )[0].allowDonations ? (
            <PrimaryButton
              onClick={() => onSelect(this.state.currentPlantProjectId)}
            >
              {i18n.t('label.donate')}
            </PrimaryButton>
          ) : null}
        </div>
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

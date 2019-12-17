import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../locales/i18n';
import { fetchPlantProjectDetail } from '../../actions/plantProjectAction';
import { queryParamsToObject } from '../../helpers/utils';
import { View, Text } from 'react-native';
import styles from '../../styles/selectplantproject/selectplantproject-full';
import PlantProjectDetails from './PlantProjectDetails';
import FullHeightButton from '../Common/Button/FullHeightButton';
import { ScrollView } from 'react-native';
import { right_arrow_button } from '../../assets';
import PlantProjectSnippet from './PlantProjectSnippet.native';
import scrollStyle from '../../styles/common/scrollStyle.native';
import { formatNumber } from '../../utils/utils';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import TabContainer from '../../containers/Menu/TabContainer';
/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectFull
 */
class PlantProjectFull extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentWillMount() {
    try {
      console.log('getting project details', this.props.plantProject);
      let plantProject = await fetchPlantProjectDetail(
        this.props.plantProject.id
      );
      this.setState({ plantProject });
    } catch (err) {
      console.log(error);
    }
  }
  render() {
    let { plantProject } = this.state;

    if (!plantProject) return <View />;
    console.log('rendering with tpo', plantProject.tpo);
    const {
      images,
      description,
      homepageUrl: homepageUrl,
      homepageCaption: homepageCaption,
      videoUrl: videoUrl,
      geoLocation,
      plantProjectImages,
      url,
      linkText,
      ndviUid
    } = plantProject;
    let tpo = plantProject.tpo || {};
    const detailsProps = {
      description,
      images,
      homepageUrl,
      homepageCaption,
      videoUrl,
      mapData: queryParamsToObject(geoLocation),
      plantProjectImages,
      url,
      linkText,
      ndviUid,
      tpo
    };

    const navigation = this.props.navigation;
    const backgroundColor = 'white';

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[
            scrollStyle.styleContainer,
            {
              backgroundColor: backgroundColor
            }
          ]}
        >
          <PlantProjectSnippet
            key={'projectFull' + plantProject.id}
            showMoreButton={false}
            clickable={false}
            plantProject={plantProject}
            onSelectClickedFeaturedProjects={id => this.props.selectProject(id)}
            selectProject={this.props.selectProject}
            navigation={navigation}
          />

          {/* <View style={styles.horizontalRule} /> */}
          <View style={styles.plantProjectDetails}>
            <PlantProjectDetails
              currentUserProfile={this.props.currentUserProfile}
              navigation={navigation}
              {...detailsProps}
            />
          </View>
        </ScrollView>
        {plantProject.allowDonations ? (
          <View style={styles.bottomActionArea}>
            <View style={styles.centeredContentContainer}>
              <View>
                <Text style={[styles.cost]}>
                  {formatNumber(
                    plantProject.treeCost,
                    null,
                    plantProject.currency
                  )}
                </Text>
              </View>

              <Text style={[styles.costPerTree]}>
                {i18n.t('label.cost_per_tree')}
              </Text>
            </View>
            <FullHeightButton
              buttonStyle={styles.squareButton}
              onClick={() => this.props.selectProject(plantProject.id)}
              textStyle={styles.buttonText}
              image={right_arrow_button}
            >
              {i18n.t('label.donate')}
            </FullHeightButton>
          </View>
        ) : null}
      </View>
    );
  }
}

PlantProjectFull.propTypes = {
  plantProject: PropTypes.object.isRequired,
  projectClear: PropTypes.func,
  showNextButton: PropTypes.bool,
  onNextClick: PropTypes.func,
  selectProject: PropTypes.func,
  onBackClick: PropTypes.func
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      //fetchPlantProjectDetail
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(PlantProjectFull);

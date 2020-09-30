import PropTypes from 'prop-types';
import React from 'react';
import {
  Animated,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadProject } from '../../actions/loadTposAction';
import { right_arrow_button } from '../../assets';
import { context } from '../../config';
import { queryParamsToObject } from '../../helpers/utils';
import i18n from '../../locales/i18n';
import styles from '../../styles/selectplantproject/selectplantproject-full';
import FullHeightButton from '../Common/Button/FullHeightButton';
// import { formatNumber } from '../../utils/utils';
import LoadingIndicator from '../Common/LoadingIndicator.native';
import NumberFormat from '../Common/NumberFormat.native';
import HeaderFullPages from '../Header/HeaderFullPages.native';
import { getLocalRoute } from './../../actions/apiRouting';
import PlantProjectDetails from './PlantProjectDetails';
import PlantProjectSnippetDetails from './PlantProjectSnippetDetails.native';
// import TabContainer from '../../containers/Menu/TabContainer';

/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component-PlantProjectFull
 */
class PlantProjectFull extends React.Component {
  constructor(props) {
    super(props);
    const plantProject = { ...props.plantProject };
    this.state = {
      plantProject,
      scrollY: new Animated.Value(0)
    };
  }
  state = { loader: true };

  /*async UNSAFE_componentWillReceiveProps(nextProps) {
    try {
      debug('plantproject while receive props', nextProps.plantProject);
      if (nextProps.plantProject && !nextProps.plantProject.tpoData) {
        // we dont have the details in store, fetch it
        const plantProject = await this.props.loadProject(
          nextProps.plantProject,
          {}
        );
        debug('fetched details plantproject in full', plantProject);
        // this.setState({ plantProject });
      }
    } catch (error) {
      debug(error);
    }
  }
  async componentDidMount() {
    try {
      debug('plantproject while did mount', this.props.plantProject);
      if (this.props.plantProject && !this.props.plantProject.tpoData) {
        // we dont have the details in store, fetch it
        const plantProject = await this.props.loadProject(
          this.props.plantProject,
          {}
        );
        debug('fetched details plantproject in full', plantProject);
        // this.setState({ plantProject });
      }
    } catch (error) {
      debug(error);
    }
  }*/

  UNSAFE_componentWillMount() {
    StatusBar.setTranslucent(true);
    setTimeout(() => this.setState({ loader: false }), 2000);
  }
  componentWillUnmount() {
    StatusBar.setTranslucent(false);
  }
  render() {
    let { plantProject } = this.props;
    if (!plantProject || !plantProject.tpoData) return <LoadingIndicator />;
    // debug('rendering with project:', plantProject);
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
      tpoName,
      ndviUid
    } = plantProject;
    const { loader } = this.state;
    let tpo = plantProject.tpoData || {};
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

    return !loader ? (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="rgba(52, 52, 52, 0.0)"
          barStyle={'dark-content'}
          styleContainer={{ marginTop: Platform.OS === 'ios' ? -20 : 0 }}
        />
        <HeaderFullPages
          navigation={this.props.navigation}
          title={''}
          scrollY={this.state.scrollY}
          entityType={'projects'}
          entityName={tpoName}
          donationContext={this.props.donationContext}
          selectPlantProjectAction={this.props.selectPlantProjectAction}
          url={
            context.scheme +
            '://' +
            context.host +
            getLocalRoute('app_selectedProject') +
            '/' +
            this.props.plantProject.id
          }
          //  appurl={'weplant://project/' + this.props.plantProject.id}
        />
        <ScrollView
          contentContainerStyle={[
            {
              backgroundColor: backgroundColor
            }
          ]}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: { y: this.state.scrollY }
              }
            }
          ])}
        >
          <PlantProjectSnippetDetails
            key={'projectFull' + plantProject.id}
            showMoreButton={false}
            clickable={false}
            plantProject={plantProject}
            onSelectClickedFeaturedProjects={id => this.props.selectProject(id)}
            tpoName={tpoName}
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
                  {/* {formatNumber(
                    plantProject.treeCost,
                    null,
                    plantProject.currency
                  )} */}
                  <NumberFormat
                    data={plantProject.treeCost}
                    currency={plantProject.currency}
                  />
                </Text>
              </View>

              <Text style={[styles.costPerTree]}>
                {i18n.t('label.cost_per_tree')}
              </Text>
            </View>
            <FullHeightButton
              buttonStyle={styles.squareButton}
              onClick={() => this.props.selectProject(plantProject.id)}
              image={right_arrow_button}
            >
              {!this.props.donationContext.selectedProject
                ? i18n.t('label.donate')
                : i18n.t('label.select_project')}
            </FullHeightButton>
          </View>
        ) : null}
      </View>
    ) : (
      <View style={{ flex: 1, marginTop: -20 }}>
        <LoadingIndicator contentLoader screen={'ProjectSingleLoader'} />
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
      loadProject
    },
    dispatch
  );
};
export default connect(null, mapDispatchToProps)(PlantProjectFull);

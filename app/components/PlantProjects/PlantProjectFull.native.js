import React from "react";
import { Linking, Alert } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
//import { debug } from '../../debug';
import i18n from "../../locales/i18n";
import { loadProject } from "../../actions/loadTposAction";
import { queryParamsToObject } from "../../helpers/utils";
import { View, Platform, Text, Animated, StatusBar } from "react-native";
import styles from "../../styles/selectplantproject/selectplantproject-full";
import PlantProjectDetails from "./PlantProjectDetails";
import FullHeightButton from "../Common/Button/FullHeightButton";
import { right_arrow_button } from "../../assets";
import PlantProjectSnippetDetails from "./PlantProjectSnippetDetails.native";
import NumberFormat from "../Common/NumberFormat.native";
// import { formatNumber } from '../../utils/utils';
import LoadingIndicator from "../Common/LoadingIndicator.native";
import HeaderFullPages from "../Header/HeaderFullPages.native";
import { context } from "../../config";
import { getAuth0AccessToken } from "../../utils/user";
// import TabContainer from '../../containers/Menu/TabContainer';
import { getLocale } from '../../actions/getLocale';
import { supportedTreecounterSelector } from '../../selectors';
import { clearSupport } from '../../actions/supportTreecounterAction';
import { getCurrency } from '../../selectors';
import { currentUserProfileSelector } from '../../selectors';
import { getPreferredCountryCodeFromCurrency } from '../../utils/currency';
import openWebView from '../../utils/openWebView';

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
      //debug('plantproject while receive props', nextProps.plantProject);
      if (nextProps.plantProject && !nextProps.plantProject.tpoData) {
        // we dont have the details in store, fetch it
        const plantProject = await this.props.loadProject(
          nextProps.plantProject,
          {}
        );
        //debug('fetched details plantproject in full', plantProject);
        // this.setState({ plantProject });
      }
    } catch (error) {
      debug(error);
    }
  }
  async componentDidMount() {
    try {
      //debug('plantproject while did mount', this.props.plantProject);
      if (this.props.plantProject && !this.props.plantProject.tpoData) {
        // we dont have the details in store, fetch it
        const plantProject = await this.props.loadProject(
          this.props.plantProject,
          {}
        );
        //debug('fetched details plantproject in full', plantProject);
        // this.setState({ plantProject });
      }
    } catch (error) {
      debug(error);
    }
  }*/

  UNSAFE_componentWillMount() {
    if (Platform.OS === "android") StatusBar.setTranslucent(true);
    setTimeout(() => this.setState({ loader: false }), 2000);
  }
  componentWillUnmount() {
    if (Platform.OS === "android") StatusBar.setTranslucent(false);
  }
  render() {
    let { plantProject } = this.props;


    if (!plantProject || !plantProject.tpoData) return <LoadingIndicator />;
    //debug('rendering with project:', plantProject);
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

    const tpoName = plantProject.tpoName || plantProject.tpoData?.name;

    const { loader } = this.state;
    let tpo = plantProject.tpoData || {};
    const { planet_pay_url } = context;

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
    const backgroundColor = "white";

    const locale = getLocale();
    const supportedSlug = this.props.supportTreecounter?.slug ? this.props.supportTreecounter.slug : '';
    const userCurrency = this.props.userProfile?.currency || this.props.globalCurrency?.currency;
    const currencyCountry = this.props.globalCurrency ? (getPreferredCountryCodeFromCurrency(userCurrency)) : '';

    return !loader ? (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="rgba(52, 52, 52, 0.0)"
          barStyle={"dark-content"}
          styleContainer={{ marginTop: Platform.OS === "ios" ? -20 : 0 }}
        />
        <HeaderFullPages
          navigation={this.props.navigation}
          title={""}
          scrollY={this.state.scrollY}
          entityType={"projects"}
          entityName={tpoName}
          url={
            context.scheme +
            "://" +
            context.host +
            "/" +
            this.props.plantProject.slug
          }
        //  appurl={'weplant://project/' + this.props.plantProject.id}
        />
        <Animated.ScrollView
          contentContainerStyle={[
            {
              backgroundColor: backgroundColor
            }
          ]}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { y: this.state.scrollY }
                }
              }
            ],
            { useNativeDriver: true }
          )}
        >
          <PlantProjectSnippetDetails
            key={"projectFull" + plantProject.id}
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
        </Animated.ScrollView>
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
                {i18n.t("label.cost_per_tree")}
              </Text>
            </View>
            <FullHeightButton
              buttonStyle={styles.squareButton}
              onClick={() => {
                getAuth0AccessToken().then(token => {
                  if (token) {
                    openWebView(
                      `${planet_pay_url}/?to=${plantProject.slug}&s=${supportedSlug}&locale=${locale}&country=${currencyCountry}&token=${token}`
                    );
                  } else {
                    openWebView(
                      `${planet_pay_url}/?to=${plantProject.slug}&s=${supportedSlug}&locale=${locale}&country=${currencyCountry}`
                    );
                  }
                });
              }}
              image={right_arrow_button}
            >
              {i18n.t("label.donate")}
            </FullHeightButton>
          </View>
        ) : null}
      </View>
    ) : (
      <View style={{ flex: 1, marginTop: -20 }}>
        <LoadingIndicator contentLoader screen={"ProjectSingleLoader"} />
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

const mapStateToProps = state => {
  return {
    supportTreecounter: supportedTreecounterSelector(state),
    globalCurrency: getCurrency(state),
    userProfile: currentUserProfileSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loadProject,
      clearSupport
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlantProjectFull);

import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { trillionCampaign } from '../../actions/trillionAction';
import SvgContainer from '../Common/SvgContainer';
import svgStyles from '../../styles/common/treecounter_svg';
import styles from '../../styles/trillion.native';
import {
  pledgeEventSelector,
  userTreecounterDataSelector
} from '../../selectors';
import LoadingIndicator from '../Common/LoadingIndicator';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import CardLayout from '../Common/Card';
import i18n from '../../locales/i18n';
import { getAllPlantProjectsSelector } from '../../selectors';
import PlantProjectSnippet from '../../components/PlantProjects/PlantProjectSnippet.native';
import { bindActionCreators } from 'redux';
import { updateStaticRoute, updateRoute } from '../../helpers/routerHelper';
import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
class Trillion extends Component {
  constructor() {
    super();
    this.state = {
      svgData: null,
      displayName: '',
      loading: true
    };
  }
  componentDidMount() {
    trillionCampaign()
      .then(({ data }) => {
        this.setState({
          svgData: {
            id: 1,
            target: data.countTarget,
            planted: data.countPlanted,
            community: data.countReceived,
            personal: data.countPersonal
          },
          displayName: data.displayName,
          loading: false
        });
      })
      .catch(error => error);
  }
  shouldComponentUpdate() {
    return true;
  }
  onMoreClick(id) {
    this.props.selectPlantProjectAction(id);
    const { navigation } = this.props;
    console.log('OnMore');
    updateRoute('app_selectProject', navigation);
  }
  onSelectClickedFeaturedProjects = id => {
    this.props.selectPlantProjectAction(id);
    const { navigation } = this.props;
    updateStaticRoute('app_donate_detail', navigation);
  };
  render() {
    return this.state.loading ? (
      <LoadingIndicator />
    ) : (
      <ScrollView>
        <View style={styles.parentContainer}>
          <View style={svgStyles.svgContainer}>
            <SvgContainer {...this.state.svgData} trillion={true} />
          </View>
          <CardLayout style={styles.cardContainer}>
            <Text style={styles.titleText}>
              {' '}
              {i18n.t('label.trillionTreeMessage1')}
            </Text>
            <Text style={styles.titleText}>
              {' '}
              {i18n.t('label.trillionTreeMessage2')}
            </Text>
          </CardLayout>
          <View>
            {this.props.plantProjects
              .filter(filterProj => filterProj.allowDonations)
              .map(project => (
                <PlantProjectSnippet
                  key={'trillion' + project.id}
                  onMoreClick={id => this.onMoreClick(id)}
                  plantProject={project}
                  onSelectClickedFeaturedProjects={id =>
                    this.onSelectClickedFeaturedProjects(id)
                  }
                  showMoreButton={false}
                  tpoName={project.tpo_name}
                />
              ))}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  pledgeEvents: pledgeEventSelector(state),
  plantProjects: getAllPlantProjectsSelector(state)
});
const mapDispatchToProps = dispatch => {
  return bindActionCreators({ selectPlantProjectAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Trillion);

Trillion.propTypes = {
  pledgeEvents: PropTypes.object
};

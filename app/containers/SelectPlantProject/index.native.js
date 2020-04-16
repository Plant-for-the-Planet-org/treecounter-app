import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCurrencies } from '../../actions/currencies';
import { loadProject, loadProjects } from '../../actions/loadTposAction';
import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
import { treecounterLookupAction } from '../../actions/treecounterLookupAction';
import { setSupportDetails } from '../../components/DonateTrees/redux/action';
import SelectPlantProject from '../../components/SelectPlantProject';
import { updateRoute } from '../../helpers/routerHelper';
import { currenciesSelector, getAllPlantProjectsSelector } from '../../selectors';

class SelectPlantProjectContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      context: this.props.navigation.getParam('context') || {}
    };
    this.createContext(props);
  }

  createContext = async props => {
    if (
      props.navigation.state.params &&
      props.navigation.state.params.treecounterSlug
    ) {
      let context = {};
      const treecounter = await props.treecounterLookupAction(
        props.navigation.state.params.treecounterSlug,
        props.navigation
      );
      context.contextType = 'support';
      context.support = {
        supportedTreecounterID: treecounter.id,
        displayName: treecounter.displayName,
        treecounterAvatar: treecounter.userProfile.image
      };
      props.setSupportDetails({
        contextType: 'support',
        supportTreeCounterDetails: {
          supportedTreecounterID: treecounter.id,
          displayName: treecounter.displayName,
          treecounterAvatar: treecounter.userProfile.image
        }
      });
      this.setState({
        context
      });
    }
  };

  async componentDidMount() {
    let data = await this.props.loadProjects('featured');
    if (!this.props.currencies.currencies) {
      this.props.fetchCurrencies();
    }
    !this.props.alreadySelected && this.props.selectPlantProjectAction(null);
  }

  UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.treecounterSlug !==
      nextProps.navigation.state.params &&
      nextProps.navigation.state.params.treecounterSlug
    )
      this.createContext(nextProps);
  }

  render() {
    // filter project only donatable
    let plantProjects = this.props.plantProjects.filter(
      project => project.allowDonations
    );
    return !plantProjects.length ? null : (
      <SelectPlantProject
        selectProject={this.selectPlantProjectAction}
        currencies={this.props.currencies}
        onMoreClick={this.onMoreClick}
        plantProjects={plantProjects}
        navigation={this.props.navigation}
        supportTreecounter={this.props.supportTreecounter}
        context={this.state.context}
        hideTitle={this.props.hideTitle}
      />
    );
  }

  // This function takes the user from the list of projects to the single project page
  onMoreClick = async (id, name) => {
    let project = this.props.plantProjects.find(
      project => project['id'] === id
    );
    if (project && !project.paymentSetup) {
      project = await this.props.loadProject({ id });
    }
    this.props.selectPlantProjectAction(id);
    const { navigation } = this.props;

    if (navigation) {
      updateRoute('app_selectedProject', navigation, 1, {
        userForm: navigation.getParam('userForm'),
        giftMethod: navigation.getParam('giftMethod'),
        titleParam: name,
        context: this.props.navigation.getParam('context')
      });
    }
  };
}

const mapStateToProps = state => ({
  plantProjects: getAllPlantProjectsSelector(state),
  currencies: currenciesSelector(state),
  donationDetails: state.donations.donationDetails
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      selectPlantProjectAction,
      fetchCurrencies,
      loadProject,
      loadProjects,
      treecounterLookupAction,
      setSupportDetails
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectPlantProjectContainer);

SelectPlantProjectContainer.propTypes = {
  plantProjects: PropTypes.array,
  currencies: PropTypes.object,
  selectPlantProjectAction: PropTypes.func,
  navigation: PropTypes.any,
  fetchCurrencies: PropTypes.func
};

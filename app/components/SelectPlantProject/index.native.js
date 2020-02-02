import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
// import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TabBar, TabView } from 'react-native-tab-view';
import { Dimensions, SafeAreaView, Text, View } from 'react-native';
// import TabContainer from '../../containers/Menu/TabContainer';
import i18n from '../../locales/i18n.js';
import styles from '../../styles/common/tabbar';
import FeaturedProjects from './Tabs/featured';
import ListProjects from './Tabs/list';
import { updateStaticRoute } from '../../helpers/routerHelper';
import HeaderStatic from './../Header/HeaderStatic';

import { getAllPlantProjectsSelector } from '../../selectors';
import { loadProject, loadProjects } from '../../actions/loadTposAction';

const Layout = {
  window: {
    width: Dimensions.get('window').width
  }
};
class SelectPlantTabView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        { key: 'featured', title: i18n.t('label.featured') },
        { key: 'list', title: i18n.t('label.list') }
      ],
      index: 0
    };
    this.onSelectProjects = this.onSelectProjects.bind(this);
  }

  indexChange(index) {
    this.setState({
      index: index
    });
  }
  onSelectProjects(id) {
    console.log('porps---', this.props);
    this.props.selectProject(id);
    const { navigation } = this.props;
    console.log(
      '=======in selectplant project component... calling donate detail with',
      {
        userForm: navigation.getParam('userForm'),
        giftMethod: navigation.getParam('giftMethod')
      }
    );
    updateStaticRoute('app_donate_detail', navigation, {
      userForm: navigation.getParam('userForm'),
      giftMethod: navigation.getParam('giftMethod')
    });
  }
  handleExpandedClicked = optionNumber => {
    this.setState({
      expandedOption: optionNumber
    });
  };

  handleIndexChange = index => {
    console.log('indicator index, ', index);
    this.setState({ index: index });
    if (
      index &&
      !this.props.plantProjects.filter(project => !project.isFeatured).length
    ) {
      try {
        // this.props.loadProjects();
        //console.log('loaded projects in list', projects);
      } catch (error) {
        console.log('error on lloading project on list', error);
      }
    }
  };

  renderTabBar = props => {
    return [
      <TabBar
        key="1"
        {...props}
        labelStyle={styles.textStyle}
        indicatorStyle={styles.textActive}
        style={[styles.tabBar]}
        tabStyle={{ width: 'auto' }}
        renderLabel={({ route, focused, color }) => (
          <Text
            style={{
              color: focused ? '#89b53a' : '#aba2a2',
              fontSize: 11,
              fontFamily: 'OpenSans-SemiBold',
              textTransform: 'capitalize'
            }}
          >
            {route.title}
          </Text>
        )}
      />
    ];
  };

  renderSelectPlantScene = ({ route, jumpTo }) => {
    const {
      plantProjects,
      onMoreClick,
      selectProject,
      navigation,
      currencies,
      loadProject,
      loadProjects
    } = this.props;
    // props for children
    const props = {
      plantProjects,
      onMoreClick,
      selectProject,
      navigation,
      currencies,
      loadProjects,
      loadProject
    };
    const { index } = this.state;

    // Only render a tab if it is focused
    switch (route.key) {
      case 'featured':
        console.log('fatured active', index, this.props.plantProjects);
        return this.props.plantProjects.filter(project => project.isFeatured)
          .length ? (
          <FeaturedProjects
            onSelectProjects={this.onSelectProjects}
            {...props}
            jumpTo={jumpTo}
            index={this.state.index}
          />
        ) : null;
      case 'list':
        console.log('list active', index, this.props.plantProjects);

        return (
          <ListProjects
            onSelectProjects={this.onSelectProjects}
            {...props}
            jumpTo={jumpTo}
            index={this.state.index}
          />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <>
        <HeaderStatic title={'Projects'} />
        <SafeAreaView />
        <View style={{ marginTop: 80 }} />
        <TabView
          useNativeDriver
          navigationState={this.state}
          renderScene={this.renderSelectPlantScene}
          renderTabBar={this.renderTabBar}
          onIndexChange={this.handleIndexChange}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  plantProjects: getAllPlantProjectsSelector(state)
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loadProject, loadProjects }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectPlantTabView);
SelectPlantTabView.propTypes = {
  plantProjects: PropTypes.array,
  currencies: PropTypes.object,
  selectProject: PropTypes.func,
  onMoreClick: PropTypes.func,
  navigation: PropTypes.object
};

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TabBar, TabView } from 'react-native-tab-view';
import { Dimensions } from 'react-native';
// import TabContainer from '../../containers/Menu/TabContainer';
import { Text, View, Animated, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { debug } from '../../debug';
import i18n from '../../locales/i18n.js';
import styles from '../../styles/common/tabbar';
import FeaturedProjects from './Tabs/featured';
import ListProjects from './Tabs/list';
import { updateStaticRoute } from '../../helpers/routerHelper';
import HeaderStatic from './../Header/HeaderStatic';
import { getAllPlantProjectsSelector } from '../../selectors';
import { loadProject, loadProjects } from '../../actions/loadTposAction';
const height = Dimensions.get('window').height;
import colors from '../../utils/constants';

class SelectPlantTabView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      routes: [
        { key: 'featured', title: i18n.t('label.featured') },
        { key: 'list', title: i18n.t('label.list') }
      ],
      index: 0,
      scrollY: new Animated.Value(0)
    };
    this.onSelectProjects = this.onSelectProjects.bind(this);
  }

  indexChange(index) {
    this.setState({
      index: index
    });
  }
  onSelectProjects(id) {
    debug('porps---', this.props);
    this.props.selectProject(id);
    const { navigation } = this.props;
    debug(
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
    debug('indicator index, ', index);
    this.setState({ index: index });
    if (
      index &&
      !this.props.plantProjects.filter(project => !project.isFeatured).length
    ) {
      try {
        // this.props.loadProjects();
        //debug('loaded projects in list', projects);
      } catch (error) {
        debug('error on lloading project on list', error);
      }
    }
  };

  renderTabBar = props => {
    const focusedColor = '#89b53a';
    const normalColor = '#4d5153';
    const colorWhite = colors.WHITE;
    return [
      <TabBar
        key="1"
        {...props}
        style={[styles.tabBar]}
        tabStyle={{ width: 'auto', padding: 0 }}
        indicatorStyle={{ backgroundColor: colorWhite }}
        renderLabel={({ route, focused }) => (
          <View style={{ textAlign: 'left', marginRight: 24 }}>
            <Text
              style={{
                color: focused ? focusedColor : normalColor,
                fontSize: 13,
                fontFamily: 'OpenSans-SemiBold',
                textTransform: 'capitalize',
                textAlign: 'left'
              }}
            >
              {route.title}
            </Text>
            {focused ? (
              <View
                style={[
                  {
                    width: '100%',
                    marginTop: 11,
                    backgroundColor: focusedColor,
                    height: 3,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    color: focusedColor
                  }
                ]}
              />
            ) : null}
          </View>
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
        debug('fatured active', index, this.props.plantProjects);
        return this.props.plantProjects.filter(project => project.isFeatured)
          .length ? (
            <FeaturedProjects
              onSelectProjects={this.onSelectProjects}
              {...props}
              jumpTo={jumpTo}
              index={this.state.index}
              scrollY={this.state.scrollY}
            />
          ) : null;
      case 'list':
        debug('list active', index, this.props.plantProjects);

        return (
          <ListProjects
            onSelectProjects={this.onSelectProjects}
            {...props}
            jumpTo={jumpTo}
            index={this.state.index}
            scrollY={this.state.scrollY}
          />
        );
      default:
        return null;
    }
  };

  render() {
    // const headerTop = this.state.scrollY.interpolate({
    //   inputRange: [0, 120],
    //   outputRange: [56, 0],
    //   extrapolate: 'clamp'
    // });
    return (
      <>
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderStatic
            title={i18n.t('label.projects')}
            scrollY={this.state.scrollY}
            navigation={this.props.navigation}
          />
          <Animated.View
            style={{ marginTop: Platform.OS === 'ios' ? height < 737 ? 56 : 26 : 56 }}
          />

          <TabView
            useNativeDriver
            navigationState={this.state}
            renderScene={this.renderSelectPlantScene}
            renderTabBar={this.renderTabBar}
            onIndexChange={this.handleIndexChange}
          />
        </SafeAreaView>
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

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
// import { View } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import { Dimensions, View } from 'react-native';
// import TabContainer from '../../containers/Menu/TabContainer';
import i18n from '../../locales/i18n.js';
import styles from '../../styles/common/tabbar';
import FeaturedProjects from './Tabs/featured';
import ListProjects from './Tabs/list';
import { updateStaticRoute } from '../../helpers/routerHelper';
const Layout = {
  window: {
    width: Dimensions.get('window').width
  }
};
export default class SelectPlantTabView extends PureComponent {
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
    updateStaticRoute(
      'app_donate_detail',
      navigation,
      navigation.getParam('userForm')
    );
  }
  handleExpandedClicked = optionNumber => {
    this.setState({
      expandedOption: optionNumber
    });
  };

  handleIndexChange = index => {
    this.setState({ index: index });
  };

  renderTabBar = props => {
    return [
      <TabBar
        key="1"
        {...props}
        style={styles.tabBar}
        tabStyle={{ width: Layout.window.width / 2 }}
        labelStyle={styles.textStyle}
        indicatorStyle={styles.textActive}
      />
    ];
  };

  renderSelectPlantScene = ({ route }) => {
    const {
      plantProjects,
      onMoreClick,
      selectProject,
      navigation,
      currencies
    } = this.props;
    // props for children
    const props = {
      plantProjects,
      onMoreClick,
      selectProject,
      navigation,
      currencies
    };
    // const { index } = this.state;

    // Only render a tab if it is focused
    switch (route.key) {
      case 'featured':
        return (
          <View>
            <FeaturedProjects
              onSelectProjects={this.onSelectProjects}
              {...props}
            />
          </View>
        );
      case 'list':
        return (
          <ListProjects onSelectProjects={this.onSelectProjects} {...props} />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <TabView
        useNativeDriver
        navigationState={this.state}
        renderScene={this.renderSelectPlantScene}
        renderTabBar={this.renderTabBar}
        onIndexChange={this.handleIndexChange}
      />
    );
  }
}

SelectPlantTabView.propTypes = {
  plantProjects: PropTypes.array,
  currencies: PropTypes.object,
  selectProject: PropTypes.func,
  onMoreClick: PropTypes.func,
  navigation: PropTypes.object
};

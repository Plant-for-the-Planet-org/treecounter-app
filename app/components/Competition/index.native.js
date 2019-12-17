/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Dimensions, Text, View, TouchableOpacity } from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import styles from '../../styles/common/tabbar.native';
import buttonStyles from '../../styles/common/button.native';
import { fullPageWhite } from '../../styles/common/common_styles';
import i18n from '../../locales/i18n';
import { updateStaticRoute } from '../../helpers/routerHelper';
import ClosedCompetitions from './Tabs/closed.native'; // Shows all Archived competitions
import MineCompetitions from './Tabs/mine.native'; // Shows my competitions
import FeaturedCompetitions from './Tabs/featured.native'; // Shows featured competitions
import AllCompetitions from './Tabs/all.native'; // Shows all competitions
const Layout = {
  window: {
    width: Dimensions.get('window').width
  }
};

class Competiton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Routes are used for showing the tabs
      routes: [
        { key: 'featured', title: i18n.t('label.featured_competitions') },
        { key: 'all', title: i18n.t('label.all_competitions') },
        { key: 'mine', title: i18n.t('label.mine_competitions') },
        { key: 'closed', title: i18n.t('label.archived_competitions') }
      ],
      index: 0 // It refers to the selected tab, 0 goes for featured
    };
  }

  // Function to change the index and update the state
  _handleIndexChange = index => {
    this.setState({ index });
  };

  // Tabbar represents the top header with the different tab items
  _renderTabBar = props => {
    return (
      <TabBar
        scrollEnabled
        {...props}
        style={styles.tabBar}
        tabStyle={{ width: Layout.window.width / 3 }}
        labelStyle={styles.textStyle}
        indicatorStyle={styles.textActive}
      />
    );
  };

  // This loads the different components based on the selected index
  _renderSelectPlantScene = ({ route }) => {
    switch (route.key) {
      case 'mine':
        return <MineCompetitions {...this.props} />;
      case 'featured':
        return <FeaturedCompetitions {...this.props} />;
      case 'all':
        return <AllCompetitions {...this.props} />;
      case 'closed':
        return <ClosedCompetitions {...this.props} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <View style={fullPageWhite}>
        <TabView
          useNativeDriver
          navigationState={this.state}
          renderScene={this._renderSelectPlantScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />

        {/* Button to add new competitions(On each page) */}
        <TouchableOpacity
          style={buttonStyles.plusButton}
          onPress={() => {
            updateStaticRoute('app_create_competition', this.props.navigation, {
              onCreateCompetition: this.props.onCreateCompetition
            });
          }}
        >
          <Text style={buttonStyles.plusButtonIcon}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Competiton;

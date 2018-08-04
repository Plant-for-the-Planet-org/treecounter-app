import React, { Component } from 'react';
import { TabView } from 'react-native-tab-view';
import { renderBasicTabbar } from '../../components/Common/Tabs/basicTabbar';
import IndividualForm from './IndividualForm.native';
import CompanyForm from './companyForm';

export default class RecieptTabsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      routes: [
        { key: 'individual', title: 'Individual' },
        { key: 'company', title: 'Company' }
      ],
      index: 0
    };
  }

  indexChange(index) {
    this.setState({
      index: index
    });
  }

  handleExpandedClicked = optionNumber => {
    this.setState({
      expandedOption: optionNumber
    });
  };

  _handleIndexChange = index => {
    this.setState({ index });
    if (index == 0) {
      this.props.onReciptTabChange('individual');
    } else {
      this.props.onReciptTabChange('company');
    }
  };

  _renderTabBar = props => {
    return renderBasicTabbar(
      props.navigationState.routes,
      this.state.index,
      index => this._handleIndexChange(index)
    );
  };

  _renderSelectPlantScene = ({ route }) => {
    switch (route.key) {
      case 'individual':
        return (
          <IndividualForm
            showNextButton={this.props.showNextButton}
            goToNextTab={value => this.props.goToNextTab(value)}
          />
        );
      case 'company':
        return (
          <CompanyForm
            showNextButton={this.props.showNextButton}
            goToNextTab={value => this.props.goToNextTab(value)}
          />
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <TabView
        useNativeDriver={true}
        navigationState={this.state}
        renderScene={this._renderSelectPlantScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

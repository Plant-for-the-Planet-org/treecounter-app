import React, { Component } from 'react';
import { TabView, TabBar } from 'react-native-tab-view';
import t from 'tcomb-form-native';
import {
  receiptCompanyFormSchema,
  companySchemaOptions
} from '../../server/parsedSchemas/donateTrees';

import {
  receiptIndividualFormSchema,
  individualSchemaOptions
} from '../../server/parsedSchemas/donateTrees';

import PrimaryButton from '../../components/Common/Button/PrimaryButton';
import i18n from '../../locales/i18n.js';

import CardLayout from '../../components/Common/Card';
import styles from '../../styles/common/tabbar';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

let Form = t.form.Form;

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
    this.tabView = React.createRef();
    this.setIndividualDonateReceipt = element => {
      this.individualRecipt = element;
    };
    this.setCompanyDonateReceipt = element => {
      this.companyRecipt = element;
    };
  }

  indexChange(index) {
    this.setState({
      index: index
    });
  }

  componentDidMount() {
    this.props.onReciptTabChange('individual');
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
    return (
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        style={styles.tabBar}
        tabStyle={{ width: 200 }}
        labelStyle={styles.textStyle}
        indicatorStyle={styles.textActive}
      />
    );
  };
  onNextClickIndividual = () => {
    this.props.goToNextTab(this.individualRecipt.getValue());
  };

  onNextClickCompany = () => {
    this.props.goToNextTab(this.companyRecipt.getValue());
  };

  _renderSelectPlantScene = ({ route }) => {
    switch (route.key) {
      case 'individual':
        return (
          <KeyboardAwareScrollView>
            <CardLayout>
              <Form
                ref={this.setIndividualDonateReceipt}
                type={receiptIndividualFormSchema}
                options={individualSchemaOptions}
                value={this.props.currentUserProfile}
              />
              {this.props.showNextButton ? (
                <PrimaryButton onClick={() => this.onNextClickIndividual()}>
                  {i18n.t('label.next')}
                </PrimaryButton>
              ) : null}
            </CardLayout>
          </KeyboardAwareScrollView>
        );
      case 'company':
        return (
          <KeyboardAwareScrollView>
            <CardLayout>
              <Form
                ref={this.setCompanyDonateReceipt}
                type={receiptCompanyFormSchema}
                options={companySchemaOptions}
                value={this.props.currentUserProfile}
              />
              {this.props.showNextButton ? (
                <PrimaryButton onClick={() => this.onNextClickCompany()}>
                  {i18n.t('label.next')}
                </PrimaryButton>
              ) : null}
            </CardLayout>
          </KeyboardAwareScrollView>
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <TabView
        ref={this.tabView}
        useNativeDriver={true}
        navigationState={this.state}
        renderScene={this._renderSelectPlantScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

RecieptTabsView.propTypes = {
  currentUserProfile: PropTypes.object,
  goToNextTab: PropTypes.func,
  showNextButton: PropTypes.bool,
  onReciptTabChange: PropTypes.func
};

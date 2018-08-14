import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Text } from 'react-native';
import styles from '../../../styles/selectplantproject/list';
import i18n from '../../../locales/i18n.js';

import PrimaryButton from '../../Common/Button/PrimaryButton';
import CardLayout from '../../Common/Card/CardLayout';

const { height, width } = Dimensions.get('window');
import { getAppBarHeight } from '../../../styles/common/header';
import SeeMoreToggle from '../../Common/SeeMoreToggle';
import Proptypes from 'prop-types';
import ListViewProjects from './listview';

export default class PriceProjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      priceSortedProjects: props.plantProjects
    };
  }
  componentWillMount() {
    let { plantProjects, currencies } = this.props;
    currencies = currencies.currencies;
    let priceSortedProjects = JSON.parse(JSON.stringify(plantProjects));
    if (currencies) {
      priceSortedProjects = priceSortedProjects.sort(function(a, b) {
        return (
          a.treeCost *
            parseFloat(currencies.currency_rates['EUR'].rates[a.currency]) -
          b.treeCost *
            parseFloat(currencies.currency_rates['EUR'].rates[b.currency])
        );
      });
    }
    this.setState({
      priceSortedProjects: priceSortedProjects
    });
  }

  componentWillReceiveProps(nextProps) {
    let { plantProjects, currencies } = nextProps;
    currencies = currencies.currencies;
    let priceSortedProjects = plantProjects;
    if (currencies) {
      priceSortedProjects = plantProjects.sort(function(a, b) {
        return (
          a.treeCost *
            parseFloat(currencies.currency_rates['EUR'].rates[a.currency]) -
          b.treeCost *
            parseFloat(currencies.currency_rates['EUR'].rates[b.currency])
        );
      });
    }
    this.setState({
      priceSortedProjects: priceSortedProjects
    });
  }

  onSelectProject = id => {
    this.props.selectProject(id);
  };

  callExpanded = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    let { priceSortedProjects } = this.state;
    return (
      <CardLayout style={styles.cardStyle}>
        <ListViewProjects projects={priceSortedProjects} />
      </CardLayout>
    );
  }
}

PriceProjects.propTypes = {
  plantProjects: Proptypes.array.isRequired,
  selectProject: Proptypes.func.isRequired,
  currencies: Proptypes.array.isRequired
};

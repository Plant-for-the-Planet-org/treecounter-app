import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import styles from '../../../styles/selectplantproject/list';
import CardLayout from '../../Common/Card';

import Proptypes from 'prop-types';
import ListViewProjects from './listview';
import { foldout, foldin } from '../../../assets';
import TouchableItem from '../../Common/TouchableItem.native';
import i18n from '../../../locales/i18n';

export default class PriceProjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      priceSortedProjects: props.plantProjects
    };
  }
  componentDidMount() {
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

  callExpanded = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.currencies !== this.props.currencies) {
      this.sortProjects('asc', nextProps);
    }
  }

  sortProjects(sortType, props = this.props) {
    if (sortType === 'desc') {
      let { plantProjects, currencies } = props;
      currencies = currencies.currencies;
      let priceSortedProjectsNew = JSON.parse(JSON.stringify(plantProjects));
      if (currencies) {
        priceSortedProjectsNew = priceSortedProjectsNew.sort(function(a, b) {
          return (
            b.treeCost *
              parseFloat(currencies.currency_rates['EUR'].rates[b.currency]) -
            a.treeCost *
              parseFloat(currencies.currency_rates['EUR'].rates[a.currency])
          );
        });
      }
      this.setState({
        priceSortedProjects: priceSortedProjectsNew
      });
    } else {
      let { plantProjects, currencies } = props;
      currencies = currencies.currencies;
      let priceSortedProjectsNew = JSON.parse(JSON.stringify(plantProjects));
      if (currencies) {
        priceSortedProjectsNew = priceSortedProjectsNew.sort(function(a, b) {
          return (
            a.treeCost *
              parseFloat(currencies.currency_rates['EUR'].rates[a.currency]) -
            b.treeCost *
              parseFloat(currencies.currency_rates['EUR'].rates[b.currency])
          );
        });
      }
      this.setState({
        priceSortedProjects: priceSortedProjectsNew
      });
    }
  }

  render() {
    let { priceSortedProjects } = this.state;
    return (
      <View style={styles.flexContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.headingStyle}>
            {i18n.t('label.cost_per_tree')}
          </Text>
          <View style={styles.sortContainer}>
            <TouchableItem
              style={styles.imageStyleContainer}
              hitSlop={{ left: 50, right: 150 }}
              onPress={this.sortProjects.bind(this, 'desc')}
            >
              <Image style={styles.imageStyle} source={foldin} />
            </TouchableItem>
            <TouchableItem
              style={styles.imageStyleContainer}
              hitSlop={{ left: 50, right: 150 }}
              onPress={this.sortProjects.bind(this, 'asc')}
            >
              <Image style={styles.imageStyle} source={foldout} />
            </TouchableItem>
          </View>
        </View>

        <View style={styles.listViewContainer}>
          <ListViewProjects
            projects={priceSortedProjects}
            selectProject={projectId => this.props.selectProject(projectId)}
            onMoreClick={(projectId, name) =>
              this.props.onMoreClick(projectId, name)
            }
          />
        </View>
      </View>
    );
  }
}

PriceProjects.propTypes = {
  plantProjects: Proptypes.array.isRequired,
  selectProject: Proptypes.func.isRequired,
  currencies: Proptypes.object.isRequired,
  onMoreClick: Proptypes.func.isRequired
};

import React, { Component } from 'react';
import { View } from 'react-native';

import { trillionCampaign } from '../../actions/trillionAction';
import SvgContainer from '../Common/SvgContainer';
import svgStyles from '../../styles/common/treecounter_svg';
import { userTreecounterDataSelector } from '../../selectors';

export default class Trillion extends Component {
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
      .catch(error => console.log(error));
  }

  render() {
    return (
      <View>
        <View style={svgStyles.svgContainer}>
          <SvgContainer {...this.state.svgData} trillion={true} />
        </View>
      </View>
    );
  }
}

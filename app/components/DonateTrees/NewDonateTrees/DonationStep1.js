import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Picker
} from 'react-native';
import { darkTree } from './../../../assets';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { updateStaticRoute } from './../../../helpers/routerHelper';
import RNPickerSelect from 'react-native-picker-select';

export default class DonationStep1 extends Component {
  state = {
    treeCount: '',
    frequency: ''
  };
  render() {
    return (
      <ScrollView contentContainerStyle={styles.pageScrollView}>
        <View style={styles.pageView}>
          <Text style={styles.pageTitle}> Tree Donation</Text>

          {/* Project Information Card */}
          <View style={styles.projectCardView}>
            <View style={styles.projectImageView}>
              <Image style={styles.projectImage} source={darkTree} />
            </View>
            <View style={styles.projectInfoView}>
              <Text style={styles.projectName}>
                Yucatan Reforestation by Plant-for-the-Planet
              </Text>
              <View style={styles.projectInfo}>
                <Icon name="map-marker-alt" size={12} color="#707070" />
                <Text style={styles.projectSubInfo}>Yucatan, Mexico</Text>
              </View>
              <View style={styles.projectInfo}>
                <Icon name="money-bill" size={12} color="#707070" />
                <Text style={styles.projectSubInfo}>1 Euro per Tree</Text>
              </View>
            </View>
          </View>
          {/* Project Information Card Ended */}

          {/* Tree Count Information */}
          <Text style={styles.treeCountTitle}>HOW MANY TREES?</Text>
          <View style={styles.treeCountView}>
            <TouchableOpacity style={styles.treeCountNumberButton}>
              <Text style={styles.treeCountNumber}>10</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.treeCountNumberButton}>
              <Text style={styles.treeCountNumber}>50</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.treeCountNumberButton}>
              <Text style={styles.treeCountNumber}>150</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.treeCountNumberButton}>
              {/* <TextInput
                                style={{ borderColor: 'gray', borderWidth: 0, borderBottomWidth: 1 }}
                                onChangeText={(treeCount) => this.setState({ treeCount })}
                                value={this.state.treeCount}
                            /> */}
              <Text style={styles.treeCountNumber}>Trees</Text>
            </TouchableOpacity>
          </View>
          {/* Tree Count Information Ended */}

          {/* Donation Frequency Information */}
          <Text style={styles.treeCountTitle}>HOW OFTEN?</Text>
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: '#d5d5d5',
              width: '70%',
              paddingBottom: 8
            }}
          >
            <RNPickerSelect
              onValueChange={value => console.log(value)}
              items={[
                { label: 'One Time Donation', value: '1' },
                { label: 'Every 3 Months', value: '3' },
                { label: 'Every 6 Months', value: '6' },
                { label: 'Every Year', value: '12' }
              ]}
              placeholder={{}}
            />
          </View>

          {/* Donation Frequency Information Ended */}

          {/* Tree Dedicated to Section */}
          <Text style={styles.treeDedicatedTitle}>
            Tree Gift to / Dedicated To / Pledged on
          </Text>
          <View style={styles.treeDedicatedContainer}>
            <View style={styles.treeDedicatedProfile} />
            <View style={styles.treeDedicatedInfo}>
              <Text style={styles.treeDedicatedName}>Christina Figurees</Text>
              <Text style={styles.treeDedicatedEmail}>c.fig@unfcccc.int</Text>
            </View>
            <View>
              <Icon name="times" size={18} color="#707070" />
            </View>
          </View>
          {/* Tree Dedicated to Section Ended */}
        </View>

        {/* Continue Button Section  */}
        <View style={styles.buttonSectionView}>
          <View style={styles.donationSummary}>
            <View style={styles.donationCost}>
              <Text style={styles.donationAmount}>€ 50</Text>
              <Text style={styles.donationTree}>for 50 Trees</Text>
            </View>
            <Text style={styles.donationFrequency}>One Time Donation</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              updateStaticRoute('app_donate_detail2', this.props.navigation);
            }}
          >
            <View style={styles.continueButtonView}>
              <Icon name="arrow-right" size={30} color="#fff" />
              <Text style={styles.continueText}>Continue</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Continue Button Section Ended */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  pageScrollView: {
    backgroundColor: 'white'
  },
  pageView: {
    padding: 20
  },
  pageTitle: {
    fontSize: 27,
    fontWeight: '800',
    fontStyle: 'normal',
    lineHeight: 40,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  projectCardView: {
    borderRadius: 9,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    padding: 16,
    marginTop: 20,
    flexDirection: 'row'
  },
  projectName: {
    fontSize: 18,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 27,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153'
  },
  projectSubInfo: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginLeft: 4
  },
  projectImageView: {
    width: 40,
    height: 40,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  projectImage: {
    width: 28,
    height: 28,
    resizeMode: 'contain'
  },
  projectInfoView: {
    marginLeft: 14
  },
  projectInfo: {
    marginTop: 3,
    flexDirection: 'row',
    alignItems: 'center'
  },
  treeCountTitle: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 27,
    marginBottom: 20
  },
  treeCountView: {
    flexDirection: 'row',
    marginTop: 20
  },
  treeCountNumber: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#4d5153'
  },
  treeCountNumberButton: {
    borderRadius: 30,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#d5d5d5',
    padding: 12,
    marginRight: 20,
    flexDirection: 'row'
  },
  donationFrequencyTitle: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 40
  },
  treeDedicatedTitle: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 40,
    textTransform: 'uppercase'
  },
  treeDedicatedContainer: {
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center'
  },
  treeDedicatedProfile: {
    width: 32,
    height: 32,
    backgroundColor: '#e3e3e3',
    borderRadius: 16
  },
  treeDedicatedInfo: {
    marginLeft: 10,
    flexGrow: 1
  },
  treeDedicatedName: {
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'left',
    color: '#000000'
  },
  treeDedicatedEmail: {
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#707070'
  },
  buttonSectionView: {
    width: '100%',
    marginTop: 40,
    backgroundColor: '#f7f7f7',
    marginBottom: 20,
    height: 88,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  donationSummary: {
    padding: 20
  },
  donationCost: {
    flexDirection: 'row'
  },
  donationAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#89b53a'
  },
  donationTree: {
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#707070',
    marginLeft: 6
  },
  donationFrequency: {
    fontSize: 12,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 12,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#4d5153',
    marginTop: 8
  },
  continueButtonView: {
    backgroundColor: '#89b53a',
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  continueText: {
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 4
  }
});

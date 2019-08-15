import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomAction from './BottomAction';
import styles from './../../styles/pledgeevents/pledgeevents.native';
import { forward } from './../../assets';
import t from 'tcomb-form-native';

import i18n from '../../locales/i18n';
import { connect } from 'react-redux';
import { postPledge } from './../../actions/pledgeAction';
import { postedPledgeSelector } from './../../selectors';

import {
  pledgeFormSchema,
  pledgeSchemaOptions
} from './../../server/parsedSchemas/pledge';

let TCombForm = t.form.Form;

const formLayout = locals => {
  return (
    <View>
      <View style={styles.formView}>
        <View style={{ width: '45%' }}>{locals.inputs.firstname}</View>
        <View style={{ width: '45%' }}>{locals.inputs.lastname}</View>
      </View>
      <View>{locals.inputs.email}</View>
      <View style={styles.formtreecountView}>
        <View style={{ width: '40%' }}>{locals.inputs.treeCount}</View>
      </View>
    </View>
  );
};

const allSchemaOptions = {
  template: formLayout,
  ...pledgeSchemaOptions
};

var _ = require('lodash');

class MakePledgeForm extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    treeCount: '',
    buttonType: 'pledge',
    firstnameValidator: 'Please enter First Name',
    lastnameValidator: 'Please enter Last Name',
    emailValidator: 'Please enter Email',
    treeCountValidator: 'Please enter Tree Count'
  };
  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({
      buttonType: '>'
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      buttonType: 'pledge'
    });
  };

  stringValidator = (firstname, lastname) => {
    if (
      typeof firstname === 'string' ||
      (firstname instanceof String && typeof lastname === 'string') ||
      lastname instanceof String
    ) {
      return true;
    } else {
      return false;
    }
  };

  onFormSubmit = () => {
    const { firstname, lastname, email, treeCount } = this.state;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      firstname === '' ||
      lastname === '' ||
      email === '' ||
      treeCount === ''
    ) {
      if (firstname === '') {
        alert('Please Enter First Name');
      } else if (lastname === '') {
        alert('Please Enter Last Name');
      } else if (email === '') {
        alert('Please Enter Email ID');
      } else if (treeCount === '') {
        alert('Please Enter Tree Count');
      }
    } else {
      if (typeof firstname === 'string' && typeof lastname === 'string') {
        if (email.match(mailformat)) {
          // Create data object
          const data = {
            firstname,
            lastname,
            email,
            treeCount
          };
          console.log(data);
          const params = this.props.navigation.getParam('slug');
          this.props.postPledge(data, params);
          console.log(this.props.postedPledge);
          this.RBSheet.open();
        } else {
          alert('Incorrect Email Entered');
        }
      } else {
        alert('Only characters allowed in First Name and Last Name');
      }
    }
  };

  onFormChange(value) {
    this.setState({ value }); // <- keep track of value changes
  }

  render() {
    let { firstname, lastname, email, treeCount } = this.state;
    const { navigation } = this.props;
    const treeCost = this.props.navigation.getParam('plantProject').treeCost;
    const projectName = this.props.navigation.getParam('plantProject').name;
    const currency = this.props.navigation.getParam('plantProject').currency;

    return (
      <ScrollView contentContainerStyle={styles.formScrollView}>
        <View>
          <Text style={styles.titleText}>{i18n.t('label.pledgeToPlant')}</Text>
          <Text style={styles.subtitleText}>
            {i18n.t('label.pledgeToPlantDesc', {
              treeCost: treeCost,
              currency: currency,
              projectName: projectName
            })}
          </Text>
        </View>
        <View>
          {/* <View
            style={styles.formView}
          >

            <TCombForm
              ref="pledgeForm"
              type={pledgeFormSchema}
              options={allSchemaOptions}
              value={this.state.value}
              onChange={value => this.onFormChange(value)}
            />
          </View> */}
          <View style={styles.formView}>
            <View style={{ width: '45%' }}>
              <TextField
                label={i18n.t('label.pledgeFormFName')}
                value={firstname}
                tintColor={'#89b53a'}
                titleFontSize={12}
                returnKeyType="next"
                lineWidth={1}
                blurOnSubmit={false}
                onSubmitEditing={() => {
                  this.lastnameTextInput.focus();
                }}
                onChangeText={firstname => this.setState({ firstname })}
              />
            </View>

            <View style={{ width: '45%' }}>
              <TextField
                label={i18n.t('label.pledgeFormLName')}
                value={lastname}
                tintColor={'#89b53a'}
                titleFontSize={12}
                returnKeyType="next"
                lineWidth={1}
                ref={input => {
                  this.lastnameTextInput = input;
                }}
                onSubmitEditing={() => {
                  this.emailTextInput.focus();
                }}
                onChangeText={lastname => this.setState({ lastname })}
              />
            </View>
          </View>

          <View>
            <TextField
              label={i18n.t('label.pledgeFormEmail')}
              value={email}
              tintColor={'#89b53a'}
              titleFontSize={12}
              lineWidth={1}
              keyboardType="email-address"
              ref={input => {
                this.emailTextInput = input;
              }}
              onSubmitEditing={() => {
                this.treecountTextInput.focus();
              }}
              returnKeyType="next"
              onChangeText={email => this.setState({ email })}
            />
          </View>
          <View style={styles.formtreecountView}>
            <View style={{ width: '40%' }}>
              <TextField
                label={i18n.t('label.pledgeFormTreecount')}
                tintColor={'#89b53a'}
                value={treeCount}
                titleFontSize={12}
                lineWidth={1}
                keyboardType="numeric"
                ref={input => {
                  this.treecountTextInput = input;
                }}
                returnKeyType="go"
                onChangeText={treeCount => this.setState({ treeCount })}
              />
            </View>
          </View>
        </View>
        {this.state.buttonType === 'pledge' ? (
          <TouchableOpacity
            style={styles.makePledgeButton}
            onPress={() => {
              this.onFormSubmit();
            }}
          >
            <View style={styles.makePledgeButtonView}>
              <Text style={styles.makePledgeButtonText}>Pledge</Text>
            </View>
          </TouchableOpacity>
        ) : null}

        {this.state.buttonType === '>' ? (
          <TouchableOpacity
            style={styles.pledgeSmallButton}
            onPress={() => {
              this.onFormSubmit();
            }}
          >
            <Image
              source={forward}
              resizeMode="cover"
              style={{ height: 32, width: 32 }}
            />
          </TouchableOpacity>
        ) : null}
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={354}
          duration={250}
          customStyles={{
            container: {
              justifyContent: 'center'
            }
          }}
        >
          <BottomAction
            navigation={navigation}
            treeCount={treeCount}
            projectID={this.props.navigation.getParam('plantProject').id}
          />
        </RBSheet>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  postedPledge: postedPledgeSelector(state)
});

export default connect(mapStateToProps, { postPledge })(MakePledgeForm);

// TO DO
// Add Form Schema

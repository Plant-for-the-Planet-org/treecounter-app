import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, Keyboard } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import styles from './../../styles/pledgeevents/pledgeevents.native';
import { forward } from './../../assets';
import { postPledge } from './../../actions/pledgeAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updateStaticRoute } from '../../helpers/routerHelper';

import i18n from '../../locales/i18n';
import { connect } from 'react-redux';

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
    // eslint-disable-next-line no-unused-vars
    const { navigation } = this.props;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
          this.props.postPledge(data, {
            pledgeEventSlug: params
          });
          //this.RBSheet.open();
          updateStaticRoute('app_pledge_events', this.props.navigation, {
            slug: this.props.navigation.getParam('slug'),
            plantProject: this.props.navigation.getParam('plantProject'),
            eventName: this.props.navigation.getParam('eventName'),
            eventDate: this.props.navigation.getParam('eventDate'),
            totalTrees: this.props.navigation.getParam('totalTrees'),
            eventImage: this.props.navigation.getParam('eventImage'),
            description: this.props.navigation.getParam('description'),
            treeCount: treeCount
          });
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
    // eslint-disable-next-line no-unused-vars
    const { navigation } = this.props;
    const treeCost = this.props.navigation.getParam('plantProject').treeCost;
    const projectName = this.props.navigation.getParam('plantProject').name;
    const currency = this.props.navigation.getParam('plantProject').currency;

    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.formScrollView}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        style={styles.keyboardScrollView}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled
      >
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
            <View style={styles.formHalfTextField}>
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

            <View style={styles.formHalfTextField}>
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
            <View style={styles.formHalfTextField}>
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
                returnKeyType="done"
                onChangeText={treeCount => this.setState({ treeCount })}
              />
            </View>
          </View>
        </View>
        {this.state.buttonType === 'pledge' ? (
          <TouchableOpacity
            style={styles.makePledgeButton2}
            onPress={() => {
              this.onFormSubmit();
            }}
          >
            <View style={styles.makePledgeButtonView}>
              <Text style={styles.makePledgeButtonText}>
                {i18n.t('label.pledge')}
              </Text>
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
              style={styles.pledgeSmallButtonIcon}
            />
          </TouchableOpacity>
        ) : null}
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = () => ({
  // postedPledge: postedPledgeSelector(state)
});

export default connect(mapStateToProps, { postPledge })(MakePledgeForm);

// To Do - Replace form with Tcomb Form

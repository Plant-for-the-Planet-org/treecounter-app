import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import Tabs from '../Common/Tabs';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card';
import SearchAutosuggest from '../Header/SearchAutosuggest';
import PrimaryButton from '../Common/Button/PrimaryButton';

import {
  challengeFormSchema,
  challengeFormSchemaOptions
} from '../../server/parsedSchemas/challenge';
import i18n from '../../locales/i18n';
import DescriptionHeading from '../Common/Heading/DescriptionHeading';
import TextBlock from '../Common/Text/TextBlock';
import Errormessage from '../Common/Text/Errormessage';
import ChallengeList from './challengeList';
import { NotificationManager } from '../../notification/PopupNotificaiton/notificationManager';

let TCombForm = t.form.Form;
const getFormLayoutTemplate = () => {
  const formLayoutTreesTemplate = locals => {
    return (
      <div className="register-tree__form">
        <div className="register-tree__form--row">
          {locals.inputs.firstname}
          <div className="register-tree__form--row__spacer" />
          {locals.inputs.lastname}
        </div>
        <div className="register-tree__form--row">{locals.inputs.email}</div>
      </div>
    );
  };
  return formLayoutTreesTemplate;
};
export default class Challenge extends Component {
  static data = {
    tabsUser: [
      {
        name: i18n.t('label.treecounter_user_name'),
        id: 'direct'
      },
      {
        name: i18n.t('label.other_email'),
        id: 'invitation'
      }
    ]
  };

  constructor(props) {
    super(props);

    this.state = {
      form: {
        challengeMethod: 'direct',
        goal: 1000,
        endDate: 2020
      },
      tempForm: {},
      checked: 'indefinite',
      challenged: '',
      showchecked: false
    };
    this.handleModeUserChange = this.handleModeUserChange.bind(this);
  }

  handleModeUserChange(tab) {
    this.setState({
      modeUser: tab,
      showchecked: false,
      challenged: '',
      form: {
        ...this.state.form,
        challengeMethod: tab
      }
    });
  }

  onFormChange = value => {
    this.setState({ tempForm: value });
  };

  suggestionClicked = (context, event) => {
    this.setState({
      challenged: event.suggestion.treecounterId,
      challengedName: event.suggestion.name,
      showchecked: false
    });
  };

  changeName = newValue => {
    if (newValue === '') {
      this.setState({
        challenged: ''
      });
    }
  };

  handleTreesChange = value => {
    this.setState({
      form: {
        ...this.state.form,
        goal: value
      }
    });

    if (this.state.challenged === '') {
      this.setState({
        showchecked: true
      });
    } else {
      this.setState({
        showchecked: false
      });
    }
  };

  handleEndDateChange = value => {
    this.setState({
      form: {
        ...this.state.form,
        endDate: value
      }
    });
  };

  radioChange = event => {
    this.setState({
      checked: event.target.value
    });
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      NotificationManager.error(
        i18n.t('label.challenge_error', {
          user: this.state.challengedName,
          target: parseInt(nextProps.error)
        }),
        i18n.t('label.error'),
        5000
      );
    }
  }

  challenge = () => {
    let requestData;
    if (this.state.modeUser === 'invitation') {
      let value = this.refs.challengeUser.getValue();
      requestData = {
        ...this.state.form,
        invitee: { ...value }
      };
    } else {
      requestData = {
        ...this.state.form,
        challenged: this.state.challenged
      };
      if (this.state.challenged === '') {
        this.setState({
          showchecked: true
        });
      } else {
        this.setState({
          showchecked: false
        });
      }
    }
    if (this.state.checked === 'indefinite') {
      delete requestData.endDate;
    } else if (requestData.endDate === '') {
      NotificationManager.error(
        i18n.t('label.please_select_year'),
        i18n.t('label.error'),
        5000
      );
      return;
    }

    if (this.state.modeUser === 'invitation') {
      if (requestData.goal !== '' && this.refs.challengeUser.getValue()) {
        this.props.challengeUser(requestData);
      }
    } else {
      if (requestData.goal !== '' && requestData.challenged !== '') {
        this.props.challengeUser(requestData);
      }
    }
  };

  render() {
    const schema = {
      template: getFormLayoutTemplate(),
      ...challengeFormSchemaOptions
    };
    return (
      <div className="sidenav-wrapper app-container__content--center">
        <TextHeading>
          {i18n.t('label.challenge_heading')}
          <DescriptionHeading>
            {i18n.t('label.challenge_edit_description')}
          </DescriptionHeading>
        </TextHeading>
        <CardLayout className="tpo-footer-card-layout">
          <div className="challenge__container">
            <Tabs
              data={Challenge.data.tabsUser}
              onTabChange={this.handleModeUserChange}
            >
              {this.state.modeUser === Challenge.data.tabsUser[0].id ? (
                <SearchAutosuggest
                  onSuggestionClicked={this.suggestionClicked}
                  clearSuggestions={false}
                  onChangeName={this.changeName}
                />
              ) : (
                <TCombForm
                  ref="challengeUser"
                  type={challengeFormSchema}
                  options={schema}
                  value={this.state.tempForm}
                  onChange={this.onFormChange}
                />
              )}
            </Tabs>
            {this.state.showchecked && this.state.modeUser === 'direct' ? (
              <Errormessage>{i18n.t('label.name_is_required')}</Errormessage>
            ) : null}
            <div className="number_trees">
              <TextBlock>{i18n.t('label.challenge_to_plant')}</TextBlock>
              <span className="input_trees">
                <input
                  type="number"
                  value={this.state.form.goal}
                  onChange={evt => this.handleTreesChange(evt.target.value)}
                  min="1"
                />
                <TextBlock>{i18n.t('label.trees')}</TextBlock>
              </span>
              {this.state.form.goal === '' ? (
                <Errormessage>
                  <div style={{ textAlign: 'center' }}>
                    {i18n.t('label.goal_is_required')} {true}
                  </div>
                </Errormessage>
              ) : null}
            </div>
            <div className="trees_by_time">
              <input
                type="radio"
                onChange={event => this.radioChange(event)}
                value="indefinite"
                checked={this.state.checked === 'indefinite'}
              />
              <TextBlock>{i18n.t('label.indefinite')}</TextBlock>
              <input
                type="radio"
                value="custom"
                onChange={event => this.radioChange(event)}
                checked={this.state.checked === 'custom'}
                className="radio_margin_left"
              />
              <TextBlock>{i18n.t('label.by')} </TextBlock>
              <input
                type="number"
                value={this.state.form.endDate}
                onChange={evt => this.handleEndDateChange(evt.target.value)}
              />
            </div>
          </div>
          <PrimaryButton onClick={this.challenge}>
            {i18n.t('label.challenge_heading')}
          </PrimaryButton>
        </CardLayout>
        <ChallengeList
          challenges={this.props.challenges}
          navigation={this.props.navigation}
          challengeStatus={this.props.challengeStatus}
        />
      </div>
    );
  }
}

Challenge.propTypes = {
  challengeUser: PropTypes.func,
  challenges: PropTypes.array.isRequired,
  challengeStatus: PropTypes.func,
  navigation: PropTypes.any,
  currentUserProfile: PropTypes.any,
  error: PropTypes.object
};

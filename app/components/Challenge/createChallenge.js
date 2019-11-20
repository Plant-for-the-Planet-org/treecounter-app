import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

const Tabs = lazy(() => import('../Common/Tabs'));
const TextHeading = lazy(() => import('../Common/Heading/TextHeading'));
const CardLayout = lazy(() => import('../Common/Card'));
const SearchAutosuggest = lazy(() => import('../Header/SearchAutosuggest'));
const PrimaryButton = lazy(() => import('../Common/Button/PrimaryButton'));

import {
  challengeFormSchema,
  challengeFormSchemaOptions
} from '../../server/parsedSchemas/challenge';
import i18n from '../../locales/i18n';

const DescriptionHeading = lazy(() =>
  import('../Common/Heading/DescriptionHeading')
);
const TextBlock = lazy(() => import('../Common/Text/TextBlock'));
const ChallengeList = lazy(() => import('./challengeList'));

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
      checked: 'indefinite'
    };
    this.handleModeUserChange = this.handleModeUserChange.bind(this);
  }

  handleModeUserChange(tab) {
    this.setState({
      modeUser: tab,
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
      challengedName: event.suggestion.name
    });
  };

  handleTreesChange = value => {
    this.setState({
      form: {
        ...this.state.form,
        goal: value
      }
    });
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
  componentWillReceiveProps(nextProps) {
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

    this.props.challengeUser(requestData);
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
            <div className="number_trees">
              <TextBlock>{i18n.t('label.challenge_to_plant')}</TextBlock>
              <span className="input_trees">
                <input
                  type="number"
                  value={this.state.form.goal}
                  onChange={evt => this.handleTreesChange(evt.target.value)}
                />
                <TextBlock>{i18n.t('label.trees')}</TextBlock>
              </span>
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

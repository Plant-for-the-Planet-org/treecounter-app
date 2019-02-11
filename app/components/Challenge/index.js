import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import Tabs from '../Common/Tabs';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card';
import SearchAutosuggest from '../Header/SearchAutosuggest';
import PrimaryButton from '../Common/Button/PrimaryButton';

import {
  giftInvitationFormSchema,
  giftInvitationSchemaOptions
} from '../../server/parsedSchemas/giftTrees';
import i18n from '../../locales/i18n';
import DescriptionHeading from '../Common/Heading/DescriptionHeading';

let TCombForm = t.form.Form;

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
        giftMethod: 'direct'
      }
    };
    this.handleModeUserChange = this.handleModeUserChange.bind(this);
  }

  handleModeUserChange(tab) {
    this.setState({
      modeUser: tab,
      form: { ...this.state.form, giftMethod: tab }
    });
  }

  suggestionClicked = (context, event) => {
    this.setState({
      form: {
        ...this.state.form,
        giftTreecounter: event.suggestion.id
      },
      giftTreecounterName: event.suggestion.name
    });
  };

  render() {
    return (
      <div className="sidenav-wrapper app-container__content--center">
        <TextHeading>
          {'Challenge'}
          <DescriptionHeading>
            {
              'The recipient will be able to choose whether or not to accept your challenge.'
            }
          </DescriptionHeading>
        </TextHeading>
        <CardLayout className="tpo-footer-card-layout">
          <div className="donate-tress__container">
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
                  type={giftInvitationFormSchema}
                  options={giftInvitationSchemaOptions}
                />
              )}
            </Tabs>
          </div>
          <PrimaryButton>Challenge</PrimaryButton>
        </CardLayout>
      </div>
    );
  }
}

Challenge.propTypes = {
  selectedProject: PropTypes.object,
  selectedTpo: PropTypes.object,
  currentUserProfile: PropTypes.object,
  currencies: PropTypes.object,
  gift: PropTypes.func,
  paymentStatus: PropTypes.object,
  paymentClear: PropTypes.func,
  plantProjectClear: PropTypes.func
};

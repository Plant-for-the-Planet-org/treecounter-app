import React, { Component } from 'react';
import t from 'tcomb-form';
import PropTypes from 'prop-types';

import CardLayout from '../Common/Card/CardLayout';
import ContentHeader from '../Common/ContentHeader';
import PrimaryButton from '../Common/Button/PrimaryButton';
import TextSpan from '../Common/Text/TextBlock';

import { pledge_highest, pledge_latest } from '../../assets';

import {
  pledgeFormSchema,
  pledgeSchemaOptions
} from '../../server/parsedSchemas/pledge';

let TCombForm = t.form.Form;

const formLayout = locals => {
  return (
    <div className="pledge-form-layout">
      <div className="row">
        <div className="half">{locals.inputs.firstname}</div>
        <div className="half">{locals.inputs.lastname}</div>
      </div>
      <div>{locals.inputs.email}</div>
      <div className="tree-count">{locals.inputs.treeCount}</div>
    </div>
  );
};

const allSchemaOptions = {
  template: formLayout,
  ...pledgeSchemaOptions
};

export default class Pledge extends Component {
  render() {
    return this.props.pledges && this.props.pledges.total ? (
      <div className="sidenav-wrapper app-container__content--center">
        <CardLayout className="total_trees">
          <span className="total_number">
            {parseInt(this.props.pledges.total).toLocaleString('en', {
              useGrouping: true
            })}
          </span>
          <span className="total_text">Total Trees</span>
        </CardLayout>
        <div className="row">
          <CardLayout className="recent-pledges">
            <div className="before_table_header">
              <img src={pledge_latest} />
              <span>Most Recent Pledges</span>
            </div>
            <div className="recent-pledges-table">
              <div className="pledges-header row-list-item">
                <span>Name</span>
                <span>Trees</span>
              </div>
              <div className="pledges-list">
                {this.props.pledges.latest.map(pledge => (
                  <div className="row-list-item" key={pledge.id}>
                    <span>{pledge.firstname + ' ' + pledge.lastname}</span>
                    <span>{pledge.treeCount}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardLayout>
          <CardLayout className="recent-pledges">
            <div className="before_table_header">
              <img src={pledge_highest} />
              <span>Biggest Pledges</span>
            </div>
            <div className="recent-pledges-table">
              <div className="pledges-header row-list-item">
                <span>Name</span>
                <span>Trees</span>
              </div>
              <div className="pledges-list">
                {this.props.pledges.highest.map(pledge => (
                  <div className="row-list-item" key={pledge.id}>
                    <span>{pledge.firstname + ' ' + pledge.lastname}</span>
                    <span>{pledge.treeCount}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardLayout>
        </div>
        <CardLayout className="pledge-form">
          <ContentHeader caption={'Pledge Trees'} />
          <TCombForm
            ref="pledgeForm"
            type={pledgeFormSchema}
            options={allSchemaOptions}
          />
          <PrimaryButton>Pledge</PrimaryButton>
          <TextSpan>
            After pledging, you will receive an email that tells you how to
            donate the trees pledged. One tree costs € 1.
          </TextSpan>
        </CardLayout>
      </div>
    ) : null;
  }
}

Pledge.propTypes = {
  pledges: PropTypes.object
};

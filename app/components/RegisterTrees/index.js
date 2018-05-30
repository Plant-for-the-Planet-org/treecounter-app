import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import t from 'tcomb-form';

import PrimaryButton from '../Common/Button/PrimaryButton';
import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import {
  singleTreeRegisterFormSchema,
  schemaOptionsSingleTree,
  multipleTreesRegisterFormSchema,
  schemaOptionsMultipleTrees
} from '../../server/parsedSchemas/registerTrees';

let TCombForm = t.form.Form;

export default class RegisterTrees extends Component {
  constructor() {
    super();
    this.state = {
      treeCount: 'individual'
    };
  }

  handleTreeCountOptionChange(changeEvent) {
    this.setState({ treeCount: changeEvent.target.value });
  }

  render() {
    return (
      <div className="app-container__content--center">
        <TextHeading>Register planted trees</TextHeading>
        <CardLayout>
          <div className="register-tree">
            <form className="register-tree__type">
              <label
                className={
                  'radio register-tree__type--option ' +
                  (this.state.treeCount === 'individual' ? 'active' : '')
                }
              >
                <input
                  type="radio"
                  value="individual"
                  checked={this.state.treeCount === 'individual'}
                  onChange={e => this.handleTreeCountOptionChange(e)}
                />
                <span>Individual Tree</span>
              </label>
              <label
                className={
                  'radio register-tree__type--option ' +
                  (this.state.treeCount === 'many' ? 'active' : '')
                }
              >
                <input
                  type="radio"
                  value="many"
                  checked={this.state.treeCount === 'many'}
                  onChange={e => this.handleTreeCountOptionChange(e)}
                />
                <span>Many Trees</span>
              </label>
            </form>
          </div>
          <div
            className={
              'register-tree__form ' +
              (this.state.treeCount === 'individual' ? 'hide-treecount' : '')
            }
          >
            {this.state.treeCount === 'individual' ? (
              <TCombForm
                ref={'registerTreeForm'}
                type={singleTreeRegisterFormSchema}
                options={schemaOptionsSingleTree}
              />
            ) : (
              <TCombForm
                ref={'registerTreeForm'}
                type={multipleTreesRegisterFormSchema}
                options={schemaOptionsMultipleTrees}
              />
            )}
          </div>
          <PrimaryButton>Register</PrimaryButton>
        </CardLayout>
      </div>
    );
  }
}

RegisterTrees.propTypes = {};

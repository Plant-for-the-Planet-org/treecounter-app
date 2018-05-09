import React, { Component } from 'react';

import Login from '../../components/Authentication/Login';
import { clearStorage } from '../../stores/localStorage';

export default class AbstractLoginContainer extends React.Component {
  constructor(props) {
    super(props);
    clearStorage();
    this.state = {
      schema: {},
      loading: true,
      schemaOptions: {}
    };
  }

  componentDidMount() {
    throw new TypeError(
      'Abstract method LoginContainer.componentDidMount() is not implemented'
    );
  }

  onClick() {}

  render() {
    return (
      <Login
        onClick={this.onClick}
        loading={this.state.loading}
        schema={this.state.schema}
        schemaOptions={this.state.schemaOptions}
      />
    );
  }
}

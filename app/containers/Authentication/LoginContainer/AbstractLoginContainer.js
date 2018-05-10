import React, { Component } from 'react';

import Login from '../../../components/Authentication/Login';
import { clearStorage } from '../../../stores/localStorage';

export default class exportAbstractLoginContainer extends React.Component {
  constructor(props) {
    super(props);
    clearStorage();
    this.state = {
      schema: {},
      loading: true,
      schemaOptions: {}
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    throw new TypeError(
      'Abstract method LoginContainer.componentDidMount() is not implemented'
    );
  }

  onClick() {
    throw new TypeError(
      'Abstract method LoginContainer.onClick() is not implemented'
    );
  }

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

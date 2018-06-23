// @flow
import React from 'react';
import PropTypes from 'prop-types';

export default class Elements extends React.Component {
  static defaultProps = {
    children: null
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      registeredElements: []
    };
  }

  getChildContext() {
    return {
      addElementsLoadListener: fn => {
        // Return the existing elements instance if we already have one.
        if (this._elements) {
          fn(this._elements);
          return;
        }
        const { ...options } = this.props;
        if (this.context.tag === 'sync') {
          this._elements = this.context.stripe.elements(options);
          fn(this._elements);
        } else {
          this.context.addStripeLoadListener(stripe => {
            if (this._elements) {
              fn(this._elements);
            } else {
              this._elements = stripe.elements(options);
              fn(this._elements);
            }
          });
        }
      },
      registerElement: this.handleRegisterElement,
      unregisterElement: this.handleUnregisterElement,
      getRegisteredElements: () => this.state.registeredElements
    };
  }

  handleRegisterElement = (
    element: Object,
    impliedTokenType: ?string,
    impliedSourceType: ?string
  ) => {
    this.setState(prevState => ({
      registeredElements: [
        ...prevState.registeredElements,
        {
          element,
          ...(impliedTokenType ? { impliedTokenType } : {}),
          ...(impliedSourceType ? { impliedSourceType } : {})
        }
      ]
    }));
  };

  handleUnregisterElement = (el: Object) => {
    this.setState(prevState => ({
      registeredElements: prevState.registeredElements.filter(
        ({ element }) => element !== el
      )
    }));
  };

  render() {
    return React.Children.only(this.props.children);
  }
}

Elements.propTypes = {
  children: PropTypes.Object
};

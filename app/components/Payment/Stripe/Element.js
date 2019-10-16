/* eslint-disable no-underscore-dangle */
// @flow
import React from 'react';
import PropTypes from 'prop-types';
import shallowEqual from './utils/shallowEqual';
import { elementContextTypes } from './Elements';

const noop = () => {};

const _extractOptions = props => {
  const {
    /* id, */
    /* className, */
    /* onChange, */
    /* onFocus, */
    /* onBlur, */
    /* onReady, */
    ...options
  } = props;
  return options;
};

const Element = (
  type,
  hocOptions: { impliedTokenType?: string, impliedSourceType?: string } = {}
) => {
  return class Element extends React.Component {
    static propTypes = {
      id: PropTypes.string,
      className: PropTypes.string,
      onChange: PropTypes.func,
      onBlur: PropTypes.func,
      onFocus: PropTypes.func,
      onReady: PropTypes.func
    };
    static defaultProps = {
      id: undefined,
      className: undefined,
      onChange: noop,
      onBlur: noop,
      onFocus: noop,
      onReady: noop
    };
    static contextTypes = elementContextTypes;
    constructor(props, context) {
      super(props, context);
      this._element = null;
      const options = _extractOptions(this.props);
      // We keep track of the extracted options on this._options to avoid re-rendering.
      // (We would unnecessarily re-render if we were tracking them with state.)
      this._options = options;
    }
    componentDidMount() {
      this.context.addElementsLoadListener(elements => {
        const element = elements.create(type, this._options);
        this._element = element;
        this._setupEventListeners(element);
        element.mount(this._ref);
        // Register Element for automatic token / source creation
        if (hocOptions.impliedTokenType || hocOptions.impliedSourceType) {
          this.context.registerElement(
            element,
            hocOptions.impliedTokenType,
            hocOptions.impliedSourceType
          );
        }
      });
    }
    componentWillReceiveProps(nextProps) {
      const options = _extractOptions(nextProps);
      if (
        Object.keys(options).length !== 0 &&
        !shallowEqual(options, this._options)
      ) {
        this._options = options;
        if (this._element) {
          this._element.update(options);
        }
      }
    }
    componentWillUnmount() {
      if (this._element) {
        const element = this._element;
        element.destroy();
        this.context.unregisterElement(element);
      }
    }
    _setupEventListeners(element) {
      element.on('ready', () => {
        this.props.onReady(this._element);
      });
      element.on('change', change => {
        this.props.onChange(change);
      });
      element.on('blur', (...args) => this.props.onBlur(...args));
      element.on('focus', (...args) => this.props.onFocus(...args));
    }
    handleRef = ref => {
      this._ref = ref;
    };
    render() {
      return (
        <div
          id={this.props.id}
          className={this.props.className}
          ref={this.handleRef}
        />
      );
    }
  };
};

export default Element;

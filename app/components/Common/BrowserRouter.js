import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import React from 'react';
import PropTypes from 'prop-types';

export const history = createBrowserHistory();

const BrowserRouter = props => (
  <Router history={history}>{props.children}</Router>
);

BrowserRouter.propTypes = {
  children: PropTypes.node
};

export default BrowserRouter;

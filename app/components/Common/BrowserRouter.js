import createHistory from 'history/createBrowserHistory';
import {Router} from 'react-router';
import React from 'react';
import PropTypes from 'prop-types';

export const history = createHistory ();

const BrowserRouter = props => (
  <Router history={history}>
    {props.children}
  </Router>
);

BrowserRouter.propTypes = {
  children: PropTypes.node,
};

export default BrowserRouter;

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './config/routes';


React.DOM.render(
  <Router>{routes}</Router>,
  document.getElementById('app')
);

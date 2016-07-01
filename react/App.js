import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import Routes from './config/routes';

ReactDOM.render(
  <Router history={browserHistory} routes={Routes} />,
  document.getElementById('app')
);

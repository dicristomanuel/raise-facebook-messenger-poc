import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import Routes from './config/routes';

ReactDOM.render(
  <Router>{Routes}</Router>,
  document.getElementById('app')
);

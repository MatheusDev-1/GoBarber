import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Rout from './Route';

import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Routes: React.FC = () => (
  <Switch>
    <Rout path="/" exact component={SignIn} />
    <Rout path="/signup" component={SignUp} />

    <Rout path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;

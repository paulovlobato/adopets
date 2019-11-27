import React from "react";
import { isAuthenticated } from "./services/auth.service";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import { SignIn } from "pages/SignIn";
import { SignUp } from "pages/SignUp";
import {Home} from "pages/Home";
import {Loading} from './components/Loading';

const PrivateRoute = ({ component: Component, ...rest }: typeof rest) => (
  <Route
    {...rest}
    render={props =>
      // if auth, return comp; else redirect
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={() => <Loading />} />
      <Route path="/signin" component={() => <SignIn />} />
      <Route path="/signup" component={() => <SignUp />} />
      <PrivateRoute path="/home" component={() => <Home />} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

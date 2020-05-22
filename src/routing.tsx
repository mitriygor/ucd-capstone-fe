import React from 'react'
import Auth from './Auth'
import { Router, Route } from 'react-router-dom'
import Callback from './Callback'
import createHistory from 'history/createBrowserHistory'
import App from './App';
const history = createHistory();

const auth = new Auth(history);

const handleAuthentication = (props: any) => {
    console.log();
    console.log("handleAuthentication");
  const location = props.location;
  if (/access_token|id_token|error/.test(location.hash)) {
      console.log("has token");
    auth.handleAuthentication()
  } else {
      console.log("no has token");
  }
};

export const makeAuthRouting = () => {
    console.log();
    console.log("makeAuthRouting");
  return (
    <Router history={history}>
      <div>
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback />
          }}
        />
        <Route
          render={props => {
            return <App auth={auth} {...props} />
          }}
        />
      </div>
    </Router>
  )
};

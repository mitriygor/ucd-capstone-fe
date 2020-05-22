import * as React from 'react'
import Auth from './Auth'
import { Button } from 'semantic-ui-react'

interface LogInProps {
  auth: Auth
}

interface LogInState {}

console.log();
console.log("LogIn");

export class LogIn extends React.PureComponent<LogInProps, LogInState> {


  onLogin = () => {
    console.log();
    console.log("LogIn: onLogin()");
    this.props.auth.login()
  };

  render() {
    console.log();
    console.log("LogIn: render()");
    return (
      <div>
        <Button onClick={this.onLogin} size="huge" color="olive">
          Log in
        </Button>
      </div>
    )
  }
}

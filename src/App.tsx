import React, { Component } from 'react'
import { Link, Route, Router, Switch } from 'react-router-dom'
import { Grid, Menu, Segment } from 'semantic-ui-react'

import Auth from './Auth'
import { EditTodo } from './EditTodo'
import { LogIn } from './LogIn'
import { NotFound } from './NotFound'
import { Todos } from './Todos'

export interface AppProps {}

export interface AppProps {
  auth: Auth
  history: any
}

export interface AppState {}
console.log(" ");
console.log("App");

class App extends Component<AppProps, AppState> {

  constructor(props: AppProps) {
      console.log(" ");
      console.log("App: constructor()");
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin() {
      console.log(" ");
      console.log("App: handleLogin()");
    this.props.auth.login()
  }

  handleLogout() {
      console.log(" ");
      console.log("App: handleLogout()");
    this.props.auth.logout()
  }

  render() {
      console.log(" ");
      console.log("App: render()");
    return (
        <div>
          <Segment style={{ padding: '8em 0em' }} vertical>
            <Grid container stackable verticalAlign="middle">
              <Grid.Row>
                <Grid.Column width={16}>
                  {!!this.props.history && (
                      <Router history={this.props.history}>
                        {this.generateMenu()}
                        {this.generateCurrentPage()}
                      </Router>
                  )}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </div>
    )
  }

  generateMenu() {
      console.log(" ");
      console.log("App: generateMenu()");
    return (
        <Menu>
          <Menu.Item name="home">
            <Link to="/">Home</Link>
          </Menu.Item>

          <Menu.Menu position="right">{this.logInLogOutButton()}</Menu.Menu>
        </Menu>
    )
  }

  logInLogOutButton() {
      console.log(" ");
      console.log("App: logInLogOutButton()");
    if (!!this.props && !!this.props.auth && this.props.auth.isAuthenticated()) {
        console.log("App: authenticated");
      return (
          <Menu.Item name="logout" onClick={this.handleLogout}>
            Log Out
          </Menu.Item>
      )
    } else {
        console.log("App: logInLogOutButton(): not authenticated");
      return (
          <Menu.Item name="login" onClick={this.handleLogin}>
            Log In
          </Menu.Item>
      )
    }
  }

  generateCurrentPage() {
      console.log(" ");
      console.log("App: generateCurrentPage()");
    if (!this.props || !this.props.auth || !this.props.auth.isAuthenticated()) {
        console.log("App: generateCurrentPage(): not authenticated");
      return <LogIn auth={this.props.auth} />
    } else {
        console.log("App: generateCurrentPage(): authenticated");
    }

    return (
        <Switch>
          <Route
              path="/"
              exact
              render={props => {
                return <Todos {...props} auth={this.props.auth} />
              }}
          />

          <Route
              path="/todos/:todoId/edit"
              exact
              render={props => {
                return <EditTodo {...props} auth={this.props.auth} />
              }}
          />

          <Route component={NotFound} />
        </Switch>
    )
  }
}

export default App;

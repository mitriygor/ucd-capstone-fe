import auth0 from 'auth0-js';
import { authConfig } from './config';

export default class Auth {
    accessToken;
    idToken;
    expiresAt;


    auth0 = new auth0.WebAuth({
        domain: authConfig.domain,
        clientID: authConfig.clientId,
        redirectUri: window.location.href.substring(0, window.location.href.indexOf('.com') + 4) + '/callback',
        responseType: 'token id_token',
        scope: 'openid'
    });

    constructor(history) {

        console.log('Auth: constructor()');
        console.log('Auth: constructor(): auth0', auth0);
        this.history = history;

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.getIdToken = this.getIdToken.bind(this);
        this.renewSession = this.renewSession.bind(this);
    }

    login() {
        console.log();
        console.log("Auth: login()");
        this.auth0.authorize();
    }

    handleAuthentication() {
        console.log();
        console.log('Auth: handleAuthentication()');
        this.auth0.parseHash((err, authResult) => {
            console.log('Auth: handleAuthentication(): parseHash()');

            if (authResult && authResult.accessToken && authResult.idToken) {
                console.log('Auth: handleAuthentication(): parseHash(): is auth');
                console.log('Auth: handleAuthentication(): parseHash(): Access token: ', authResult.accessToken);
                console.log('Auth: handleAuthentication(): parseHash(): id token: ', authResult.idToken);
                this.setSession(authResult);
            } else if (err) {
                console.log('Auth: handleAuthentication(): parseHash(): err', err);
                this.history.replace('/');
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    getAccessToken() {
        console.log();
        console.log('Auth: getAccessToken()');
        console.log('Auth: getAccessToken(): accessToken', this.accessToken);
        return this.accessToken;
    }

    getIdToken() {
        console.log();
        console.log('Auth: getIdToken()');
        console.log('Auth: getIdToken(): idToken', this.idToken);
        return this.idToken;
    }

    setSession(authResult) {
        console.log();
        console.log('Auth: setSession()');
        // Set isLoggedIn flag in localStorage
        localStorage.setItem('isLoggedIn', 'true');

        // Set the time that the access token will expire at
        let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;
        this.expiresAt = expiresAt;

        console.log('Auth: setSession(): expiresAt ', expiresAt);
        console.log('Auth: setSession(): accessToken ', this.accessToken);
        console.log('Auth: setSession(): idToken ', this.idToken);
        console.log('Auth: setSession(): expiresAt ', this.expiresAt);
        // navigate to the home route
        this.history.replace('/');
    }

    renewSession() {
        console.log();
        console.log('Auth: renewSession()');
        this.auth0.checkSession({}, (err, authResult) => {
            console.log();
            console.log('Auth: renewSession(): checkSession()');
            if (authResult && authResult.accessToken && authResult.idToken) {
                console.log('Auth: renewSession(): checkSession(): is auth');
                this.setSession(authResult);
            } else if (err) {
                console.log('Auth: renewSession(): checkSession(): is not auth');
                this.logout();
                console.log(err);
                alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
            }
        });
    }

    logout() {
        // Remove tokens and expiry time
        this.accessToken = null;
        this.idToken = null;
        this.expiresAt = 0;

        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem('isLoggedIn');
        console.log();
        console.log('Auth.logout()');
        this.auth0.logout({
            return_to: window.location.origin
        });


        // navigate to the home route
        this.history.replace('/');
    }

    isAuthenticated() {
        console.log();
        console.log('Auth: isAuthenticated()');
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = this.expiresAt;
        console.log('Auth: isAuthenticated(): ', new Date().getTime() < expiresAt);

        return new Date().getTime() < expiresAt;
    }
}

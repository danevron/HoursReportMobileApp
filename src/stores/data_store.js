var { NativeAppEventEmitter } = require('react-native');
var GoogleSignin = require('react-native-google-signin');
var Reflux = require('reflux');
var Actions = require('../actions');

module.exports = DataStore = Reflux.createStore({
  listenables: [Actions],

  init: function() {
    this.configureOauth('175859969292-6jtq2u475nc36kv9kbttoi0ol0ns7o5s.apps.googleusercontent.com');
    this.data = {
      dataIsLoading: true,
      user: null,
      timesheet: null
    }
  },

  getInitialState: function() {
    return this.data;
  },

  configureOauth: function(clientId, scopes=[]) {
    GoogleSignin.configure(clientId, scopes);

    NativeAppEventEmitter.addListener('googleSignInError', (error) => {
      console.log('ERROR signin in', error);
      this.data.dataIsLoading = false;
    });

    NativeAppEventEmitter.addListener('googleSignIn', (user) => {
      console.log(user);
      this.data.user = user;

      fetch("http://user:password@10.25.97.55:3000/api/v2/current_timesheet?email=" + user.email, {method: "GET"})
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.id > 0) {
          this.data.timesheet = responseData;
        }
        this.data.dataIsLoading = false;
        this.trigger(this.data);
        Actions.signIn.completed();
      })
      .done();
    });

    return true;
  },

  onSignIn: function() {
    this.data.dataIsLoading = true;
    GoogleSignin.signIn();
    this.trigger(this.data);
  },

  onSignOut: function() {
    GoogleSignin.signOut();
    this.data.user = null;
    this.data.dataIsLoading = false;
    this.trigger(this.data);
  }
});

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var { NativeAppEventEmitter } = require('react-native');
var GoogleSignin = require('react-native-google-signin');

var { Icon } = require('react-native-icons');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight
} = React;

var HoursReportMobileApp = React.createClass({
  getInitialState: function() {
    return {
      user: null
    }
  },
  componentDidMount: function() {
    this.configureOauth('175859969292-6jtq2u475nc36kv9kbttoi0ol0ns7o5s.apps.googleusercontent.com')
  },
  render: function() {
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <TouchableHighlight onPress={() => {this.signIn(); }}>
            <View style={{backgroundColor: '#f44336', flexDirection: 'row'}}>
              <View style={{padding: 12, borderWidth: 1/2, borderColor: 'transparent', borderRightColor: 'white'}}>
                <Icon
                  name='ion|social-googleplus'
                  size={24}
                  color='white'
                  style={{width: 24, height: 24}}
                />
              </View>
              <Text style={{color: 'white', padding: 12, marginTop: 2, fontWeight: 'bold'}}>Sign in with Google+</Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    }

    if (this.state.user) {
      return (
        <View style={styles.container}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>Welcome {this.state.user.name}</Text>
          <Text>Your email is: {this.state.user.email}</Text>
          <Text>Your token expires in: {this.state.user.accessTokenExpirationDate.toFixed()}s</Text>

          <TouchableOpacity onPress={() => {this.signOut(); }}>
            <View style={{marginTop: 50}}>
              <Text>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  },
  configureOauth(clientId, scopes=[]) {
    GoogleSignin.configure(clientId, scopes);

    NativeAppEventEmitter.addListener('googleSignInError', (error) => {
      console.log('ERROR signin in', error);
    });

    NativeAppEventEmitter.addListener('googleSignIn', (user) => {
      console.log(user);
      this.setState({user: user});
    });

    return true;
  },
  signIn: function() {
    GoogleSignin.signIn();
  },
  signOut: function() {
    GoogleSignin.signOut();
    this.setState({user: null});
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('HoursReportMobileApp', () => HoursReportMobileApp);

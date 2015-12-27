var React = require('react-native');
var { NativeAppEventEmitter } = require('react-native');
var GoogleSignin = require('react-native-google-signin');
var { Icon } = require('react-native-icons');

var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight
} = React;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null
    }
  },
  componentDidMount: function() {
    this.configureOauth('175859969292-6jtq2u475nc36kv9kbttoi0ol0ns7o5s.apps.googleusercontent.com')
  },
  render: function() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={() => {this.signIn(); }}>
          <View style={styles.signinBox}>
            <View style={styles.googleIcon}>
              <Icon name='ion|social-googleplus' size={24} color='white' style={{width: 24, height: 24}} />
            </View>
            <Text style={styles.signinText}>Sign in with Google+</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  },
  configureOauth(clientId, scopes=[]) {
    GoogleSignin.configure(clientId, scopes);

    NativeAppEventEmitter.addListener('googleSignInError', (error) => {
      console.log('ERROR signin in', error);
    });

    NativeAppEventEmitter.addListener('googleSignIn', (user) => {
      console.log(user);
      this.setState({user: user});
      //this.props.navigator.immediatelyResetRouteStack([{name: 'home', user: this.state.user}]);
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
  },
  signinBox: {
    backgroundColor: '#f44336',
    flexDirection: 'row'
  },
  googleIcon: {
    padding: 12,
    borderWidth: 1/2,
    borderColor: 'transparent',
    borderRightColor: 'white'
  },
  signinText: {
    color: 'white',
    padding: 12,
    marginTop: 2,
    fontWeight: 'bold'
  }
});

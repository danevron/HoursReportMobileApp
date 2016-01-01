var React = require('react-native');
var { NativeAppEventEmitter } = require('react-native');
var GoogleSignin = require('react-native-google-signin');
var { Icon } = require('react-native-icons');
var { BlurView } = require('react-native-blur');
var {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  TouchableHighlight
} = React;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: null,
      loading: true
    }
  },
  componentDidMount: function() {
    this.configureOauth('175859969292-6jtq2u475nc36kv9kbttoi0ol0ns7o5s.apps.googleusercontent.com')
  },
  render: function() {
    return (
      <Image source={require('./signin.jpg')} style={styles.container}>
        <BlurView blurType="light">
          <View style={styles.content}>
            <Text style={styles.welcome}>Welcome to Hours Report</Text>
            { this.renderSignin() }
          </View>
        </BlurView>
      </Image>
    );
  },
  renderSignin: function() {
    if (!this.state.loading) {
      return (
        <TouchableHighlight onPress={() => {this.signIn(); }}>
          <View style={styles.signinBox}>
            <View style={styles.googleIcon}>
              <Icon name='ion|social-googleplus' size={24} color='white' style={{width: 24, height: 24}} />
            </View>
            <Text style={styles.signinText}>Sign in with Google+</Text>
          </View>
        </TouchableHighlight>
      )
    }
    return null;
  },
  configureOauth(clientId, scopes=[]) {
    GoogleSignin.configure(clientId, scopes);

    NativeAppEventEmitter.addListener('googleSignInError', (error) => {
      console.log('ERROR signin in', error);
      this.setState({loading: false});
    });

    NativeAppEventEmitter.addListener('googleSignIn', (user) => {
      console.log(user);
      this.setState({user: user});
      this.props.navigator.push({name: 'home', user: this.state.user});
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
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: 400,
    height: 400
  },
  welcome: {
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 50
  },
  content: {
    flex: 0.80,
    justifyContent: 'center',
    borderRadius: 5,
    margin: 30,
    alignItems: 'center'
  },
  signinBox: {
    backgroundColor: '#dd4b39',
    borderRadius: 5,
    flexDirection: 'row'
  },
  googleIcon: {
    padding: 12,
    borderWidth: 1/2,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: 'transparent',
    borderRightColor: 'white'
  },
  signinText: {
    color: 'white',
    backgroundColor: 'transparent',
    padding: 12,
    marginTop: 2,
    fontWeight: 'bold'
  }
});

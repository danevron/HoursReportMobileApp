var React = require('react-native');
var { NativeAppEventEmitter } = require('react-native');
var GoogleSignin = require('react-native-google-signin');
var { Icon } = require('react-native-icons');

var {
  Navigator,
  StyleSheet
} = React;

var Signin = require('./components/authentication/signin');
var Home = require('./components/home');

var ROUTES = {
  signin: Signin,
  home: Home
};

module.exports = React.createClass({
  renderScene: function(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} />;
  },
  render: function() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'signin'}}
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

var React = require('react-native');
var Reflux = require('reflux');
var Actions = require('./actions');

var {
  Navigator,
  StyleSheet
} = React;

var Signin = require('./components/authentication/signin');
var Home = require('./components/home');
var Timesheet = require('./components/timesheet');
var DataStore = require('./stores/data_store');

var ROUTES = {
  signin: Signin,
  home: Home,
  timesheet: Timesheet
};

module.exports = React.createClass({
  mixins: [Reflux.ListenerMixin],
  mixins: [Reflux.connect(DataStore,"data")],

  onSignInCompleted: function() {
    this.refs.navigator.push({name: 'home'});
  },

  onSignOut: function() {
    this.refs.navigator.push({name: 'signin'});
  },

  componentDidMount: function() {
    this.listenTo(Actions.signIn.completed, this.onSignInCompleted);
    this.listenTo(Actions.signOut, this.onSignOut);
  },

  renderScene: function(route, navigator) {
    var Component = ROUTES[route.name];
    return <Component route={route} navigator={navigator} data={this.state.data} />;
  },
  render: function() {
    return (
      <Navigator
        style={styles.container}
        ref='navigator'
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

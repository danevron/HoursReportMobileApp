var React = require('react-native');
var {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;
var Button = require('apsl-react-native-button');
var { BlurView } = require('react-native-blur');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: this.props.route.user,
      timesheet: null
    };
  },
  render: function() {
    return (
      <Image source={ require('./home.jpg') } style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.nameText}>{this.state.user.name}</Text>
        </View>
        <Button style={styles.timesheetButton} textStyle={styles.timesheetButtonText} onPress={ this.navigateToCurrentTimesheet }>
          Fill your active timesheet
        </Button>
        <Button style={styles.logoutButton} textStyle={styles.timesheetButtonText} onPress={ this.navigateToCurrentTimesheet }>
          Logout
        </Button>
      </Image>
    );
  },
  navigateToCurrentTimesheet: function() {
    if (this.state.timesheet) {
      this.props.navigator.push({name: 'timesheet', user: this.state.user});
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  welcomeText: {
    margin: 15,
    color: 'white',
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold'
  },
  nameText: {
    margin: 15,
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  timesheetButton: {
    borderRadius: 20,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25,
    backgroundColor: 'trunsparent'
  },
  logoutButton: {
    borderRadius: 20,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 25,
    backgroundColor: 'trunsparent'
  },
  timesheetButtonText: {
    color: 'white',
    fontSize: 20
  },
  box: {
    backgroundColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6
  }
});

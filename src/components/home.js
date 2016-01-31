var React = require('react-native');
var { signOut } = require('../actions');
var Button = require('apsl-react-native-button');

var {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} = React;

module.exports = React.createClass({
  render: function() {
    return (
      <Image source={ require('./home.jpg') } style={styles.container}>
        <View style={styles.box}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.nameText}>{this.userName()}</Text>
        </View>
        { this.renderTimesheetButton() }
        <Button style={styles.logoutButton} textStyle={styles.timesheetButtonText} onPress={ signOut }>
          Logout
        </Button>
      </Image>
    );
  },
  renderTimesheetButton: function() {
    if (this.props.data.timesheet) {
      return (
        <Button style={styles.timesheetButton} textStyle={styles.timesheetButtonText} onPress={ this.navigateToCurrentTimesheet }>
          Fill your active timesheet
        </Button>
      );
    }
    return null;
  },
  navigateToCurrentTimesheet: function() {
    this.props.navigator.push({name: 'timesheet'});
  },
  userName: function() {
    if (this.props.data.user) {
      return this.props.data.user.name
    }
    return null;
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

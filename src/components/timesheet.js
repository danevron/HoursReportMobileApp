var React = require('react-native');
var NavBar = require('rn-navbar');

var {
  View,
  StyleSheet,
  Text
} = React;

module.exports = React.createClass({
  render: function() {
    return (
      <View>
        <NavBar title="Current Timesheet" backFunc={()=>{this.props.navigator.pop()}} />
        <View style={styles.container}>
          <Text>TODO: timesheet view</Text>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

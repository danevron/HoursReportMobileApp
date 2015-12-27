var React = require('react-native');
var {
  View,
  StyleSheet,
  Text
} = React;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      user: this.props.route.user
    };
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text>Welcome {this.state.user.name}</Text>
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

var React = require('react-native');
var { Icon } = require('react-native-icons');
var { BlurView } = require('react-native-blur');
var { signIn } = require('../../actions');

var {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  TouchableHighlight
} = React;

module.exports = React.createClass({
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
    if (!this.props.data.dataIsLoading && !this.props.data.user) {
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
  signIn: function() {
    signIn()
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

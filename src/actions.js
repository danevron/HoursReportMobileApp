var React = require('react-native');
var Reflux = require('reflux');

module.exports = {
  signIn: Reflux.createAction({
    children: ["completed"]
  }),
  signOut: Reflux.createAction()
};

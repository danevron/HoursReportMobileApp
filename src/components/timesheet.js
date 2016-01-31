var React = require('react-native');
var NavBar = require('rn-navbar');
var moment = require('moment');
var Calendar = require('./calendar');

var {
  View,
  StyleSheet,
  Text,
  TouchableHighlight
} = React;

module.exports = React.createClass({
  getInitialState: function() {
    return (
      {
        selectedDate: null
      }
    );
  },
  render: function() {
    return (
      <View style={styles.container}>
        <NavBar title="Current Timesheet" backFunc={()=>{this.props.navigator.pop()}} />

        <View style={styles.calendar}>
          <Calendar
            ref="calendar"
            workdayDates={['2016-01-18']}
            weekendDates={['2016-01-19']}
            vacationDates={['2016-01-20']}
            holidayDates={['2016-01-21']}
            sicknessDates={['2016-01-22']}
            armyDates={['2016-01-23']}
            scrollEnabled={true}
            showControls={true}
            titleFormat={'MMMM YYYY'}
            prevButtonText={'Prev'}
            nextButtonText={'Next'}
            onDateSelect={(date) => this.setState({selectedDate: date})}
            onTouchPrev={() => console.log('Back TOUCH')}
            onTouchNext={() => console.log('Forward TOUCH')}
            onSwipePrev={() => console.log('Back SWIPE')}
            onSwipeNext={() => console.log('Forward SWIPE')}/>
        </View>
        <View style={styles.buttons}>
          <TouchableHighlight style={styles.submitButton} onPress={() => {this.signIn(); }}>
            <Text>Submit</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.prefillButton} onPress={() => {this.signIn(); }}>
            <Text>Pre-fill working days</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.extractButton} onPress={() => {this.signIn(); }}>
            <Text>Extract calendar events</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  calendar: {
    flex: 0.5
  },
  buttons: {
    flex: 0.5
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'green'
  },
  prefillButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'yellow'
  },
  extractButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'orange'
  }
});

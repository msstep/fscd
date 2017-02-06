'use strict';

var React = require('react-native');
var {
  IntentAndroid,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} = React;
var UIExplorerBlock = require('./UIExplorerBlock');

var OpenURLButton = React.createClass({

  propTypes: {
    url: React.PropTypes.string,
  },

  handleClick: function() {
    IntentAndroid.canOpenURL(this.props.url, (supported) => {
      if (supported) {
        IntentAndroid.openURL(this.props.url);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.url);
      }
    });
  },

  render: function() {
    return (
      <TouchableNativeFeedback
        onPress={this.handleClick}>
        <View style={styles.button}>
          <Text style={styles.text}>Open {this.props.url}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
});

var IntentAndroidExample = React.createClass({

  statics: {
    title: 'IntentAndroid',
    description: 'Shows how to use Android Intents to open URLs.',
  },

  render: function() {
    return (
      <UIExplorerBlock title="Open external URLs">
        <OpenURLButton url={'https://www.facebook.com'} />
        <OpenURLButton url={'http://www.facebook.com'} />
        <OpenURLButton url={'http://facebook.com'} />
        <OpenURLButton url={'geo:37.484847,-122.148386'} />
      </UIExplorerBlock>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 30,
  },
  button: {
    padding: 10,
    backgroundColor: '#3B5998',
    marginBottom: 10,
  },
  text: {
    color: 'white',
  },
});

module.exports = IntentAndroidExample;
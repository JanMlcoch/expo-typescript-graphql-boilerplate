import React from 'react';
import {Image, Text, View} from 'react-native';
import {styles} from './styles';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.spaceMono}>Hello world</Text>
        <Image source={require('../../assets/images/robot-dev.png')}/>
      </View>
    );
  }
}

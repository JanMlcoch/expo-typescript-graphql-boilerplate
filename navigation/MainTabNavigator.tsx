import React from 'react';
import {Platform} from 'react-native';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/homeScreen/HomeScreen';
import GraphqlScreen from '../screens/graphqlScreen/GraphqlScreen';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

function getHomeStackIconName(isFocused: boolean) {
  return Platform.OS === 'ios'
    ? `ios-information-circle${isFocused ? '' : '-outline'}`
    : 'md-information-circle';
}

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({focused}: { focused: boolean }) => (
    <TabBarIcon
      focused={focused}
      name={getHomeStackIconName(focused)}
    />
  ),
};

const GraphqlStack = createStackNavigator({
  Graphql: GraphqlScreen,
});

GraphqlStack.navigationOptions = {
  tabBarLabel: 'Grapqhl',
  tabBarIcon: ({focused}: { focused: boolean }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  GraphqlStack,
});

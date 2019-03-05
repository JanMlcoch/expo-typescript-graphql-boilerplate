import React, {Component} from 'react';
import './ReactoronConfig';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {ApolloProvider} from 'react-apollo';
import {AppLoading, Asset, Font} from 'expo';
import AppNavigator from './navigation/AppNavigator';
import client from './graphql';

interface AppProps {
  skipLoadingScreen: boolean;
}

interface AppState {
  isLoadingComplete: boolean;
}

export default class App extends Component<AppProps, AppState> {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
          <AppNavigator/>
        </View>
      </ApolloProvider>
    );
  }

  _loadResourcesAsync = async (): Promise<void> => {
    await Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
      ]),
      Font.loadAsync({
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = (error: {}) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({isLoadingComplete: true});
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

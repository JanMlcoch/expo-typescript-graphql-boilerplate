import reactotronReactNative from 'reactotron-react-native';

reactotronReactNative
  .configure({host: 'localhost', port: 9090}) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

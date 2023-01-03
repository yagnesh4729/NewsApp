//#region import 
//#region RN
import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
//#endregion
//#region common files
import AppNavigator from './src/navigator/appNavigator';
// import { Network } from './src/components/Network';
// import { AppLodar } from './src/components/AppLodar';
//#endregion
//#region third party libs
// import { Provider } from 'react-redux';
// import configureStore from './src/redux/store';
// const store = configureStore();
//#endregion
//#endregion

const App: () => React$Node = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </View>
  );
};

export default App;
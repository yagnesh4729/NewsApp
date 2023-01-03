//#region import
//#region RN
import React from 'react';
import { useColorScheme } from 'react-native';
//#endregion
//#region common files
import { DEVICE_OS } from '../utils/constants';
// import { AppLodar } from '../components/AppLodar';
//#endregion
//#region third party libs
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBar } from './tabBar';
import { colors } from '../res/colors';
import News from '../screens/News';
import Settings from '../screens/Settings';
import { NewsFeedProvider } from '../context/NewsFeedContext';
import NewsDetails from '../screens/News/newsDetails';
import { SettingsProvider } from '../context/SettingContext';
//#endregion
//#region const
const Stack = createStackNavigator();
//#endregion
//#endregion

const options = { headerShown: false, gestureEnabled: DEVICE_OS === 'ios' ? true : false };
const Tab = createBottomTabNavigator();
function BottomTabStackScreen() {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="News" component={News} options={options} />
      <Tab.Screen name="Settings" component={Settings} options={options} />
    </Tab.Navigator>
  );
}
export default function AppNavigator() {
  const scheme = useColorScheme();
  const darkTheme = {
    dark: true,
    colors: {
      primary: colors.BLACK2,
      background: colors.blackBase3,
      card: colors.blackBase2,
      text: colors.WHITE,
      border: colors.grayDark
    }
  }
  const linking = {
    prefixes: ['newsapp://']
  };
  return (
    <NewsFeedProvider>
      <SettingsProvider>
        <NavigationContainer theme={scheme === 'dark' ? darkTheme : DefaultTheme} linking={linking}>
          <Stack.Navigator initialRouteName={'Tab'}>
            <Stack.Screen name={'Tab'} component={BottomTabStackScreen} options={options} />
            <Stack.Screen name="NewsDetails" component={NewsDetails} options={options} />
          </Stack.Navigator>
        </NavigationContainer>
      </SettingsProvider>
    </NewsFeedProvider>
  )
}
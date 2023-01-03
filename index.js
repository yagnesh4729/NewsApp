/**
 * @format
 */

import { AppRegistry, TextInput, Text, YellowBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
YellowBox.ignoreWarnings([""]);

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
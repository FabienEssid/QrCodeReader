import React from 'react';
import { AppRegistry } from 'react-native';
import { ThemeProvider } from 'react-native-magnus';
import App from './App';
import { name as appName } from './app.json';

export default function Main() {
  const theme = {
    colors: {
      white500: '#FFFFFF',
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

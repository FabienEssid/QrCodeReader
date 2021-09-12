import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './src/screens/Home';
import History from './src/screens/History';

const Router = () => {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="History" component={History} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Router;

import * as React from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import MainCalendarScreen from './MainCalendarScreen';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();

export default class extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={MainCalendarScreen} />
         </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}


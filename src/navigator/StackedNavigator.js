import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import TabbedNavigator from './TabbedNavigator';
import Details from '../screens/Details';
import Category from '../screens/Category';
import Video from '../components/Video';

const Stack = createNativeStackNavigator();

const HomeNavigation = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={TabbedNavigator} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Video" component={Video} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;

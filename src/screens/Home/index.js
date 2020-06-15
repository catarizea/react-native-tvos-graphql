import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeContainer from './HomeContainer';
import Details from './DetailsScreen';
import Category from './Category';
import Video from '../../components/Video';

const Stack = createStackNavigator();

const HomeNavigation = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeContainer} />
      <Stack.Screen name="Category" component={Category} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Video" component={Video} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;

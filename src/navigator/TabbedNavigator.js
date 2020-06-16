import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { injectIntl } from 'react-intl';

import { StoreContext } from '../store/reducer/StoreProvider';
import Activation from '../screens/Activation';
import Home from '../screens/Home';
import Shows from '../screens/Shows';
import Movies from '../screens/Movies';
import Cartoons from '../screens/Cartoons';
import Settings from '../screens/Settings';
import messages from './messages';
import theme from '../theme';

const Tab = createMaterialTopTabNavigator();

const TabbedNavigator = ({ intl: { formatMessage } }) => {
  const { state } = useContext(StoreContext);

  if (state.isAuthenticated === false) {
    return <Activation />;
  }

  return (
    <Tab.Navigator
      swipeEnabled={false}
      style={theme.tabBar.style}
      tabBarOptions={theme.tabBar.options}
      initialRouteName={formatMessage(messages.homeTitle)}>
      <Tab.Screen name={formatMessage(messages.homeTitle)} component={Home} />
      <Tab.Screen name={formatMessage(messages.showsTitle)} component={Shows} />
      <Tab.Screen
        name={formatMessage(messages.moviesTitle)}
        component={Movies}
      />
      <Tab.Screen
        name={formatMessage(messages.cartoonsTitle)}
        component={Cartoons}
      />
      <Tab.Screen
        name={formatMessage(messages.settingsTitle)}
        component={Settings}
      />
    </Tab.Navigator>
  );
};

export default injectIntl(TabbedNavigator);

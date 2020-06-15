import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { injectIntl } from 'react-intl';

import { StoreContext } from '../store/reducer/StoreProvider';
import Activation from '../screens/Activation/index';
import Home from '../screens/Home/index';
import Shows from '../screens/Shows/index';
import Movies from '../screens/Movies/index';
import Cartoons from '../screens/Cartoons/index';
import Settings from '../screens/Settings/index';
import messages from './messages';

const Tab = createMaterialTopTabNavigator();

const TabbedNavigator = ({ intl: { formatMessage } }) => {
  const { state } = useContext(StoreContext);

  if (state.isAuthenticated === false) {
    return <Activation />;
  }

  return (
    <Tab.Navigator>
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

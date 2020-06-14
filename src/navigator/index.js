import React, { useState, useContext } from 'react';
import { TabBarIOS } from 'react-native';
import { injectIntl } from 'react-intl';

import { StoreContext } from '../store/reducer/StoreProvider';
import Activation from '../screens/Activation/index';
import Home from '../screens/Home/index';
import Shows from '../screens/Shows/index';
import Movies from '../screens/Movies/index';
import Cartoons from '../screens/Cartoons/index';
import Settings from '../screens/Settings/index';
import messages from './messages';

const TabBar = ({ intl: { formatMessage } }) => {
  const [currentTab, setCurrentTab] = useState('home');
  const { state } = useContext(StoreContext);

  if (state.isAuthenticated === false) {
    return <Activation />;
  }

  return (
    <TabBarIOS>
      <TabBarIOS.Item
        selected={currentTab === 'home'}
        title={formatMessage(messages.homeTitle)}
        onPress={() => setCurrentTab('home')}>
        <Home />
      </TabBarIOS.Item>

      <TabBarIOS.Item
        selected={currentTab === 'shows'}
        title={formatMessage(messages.showsTitle)}
        onPress={() => setCurrentTab('shows')}>
        <Shows />
      </TabBarIOS.Item>

      <TabBarIOS.Item
        selected={currentTab === 'movies'}
        title={formatMessage(messages.moviesTitle)}
        onPress={() => setCurrentTab('movies')}>
        <Movies />
      </TabBarIOS.Item>

      <TabBarIOS.Item
        selected={currentTab === 'cartoons'}
        title={formatMessage(messages.cartoonsTitle)}
        onPress={() => setCurrentTab('cartoons')}>
        <Cartoons />
      </TabBarIOS.Item>

      <TabBarIOS.Item
        selected={currentTab === 'settings'}
        title={formatMessage(messages.settingsTitle)}
        onPress={() => setCurrentTab('settings')}>
        <Settings />
      </TabBarIOS.Item>
    </TabBarIOS>
  );
};

export default injectIntl(TabBar);

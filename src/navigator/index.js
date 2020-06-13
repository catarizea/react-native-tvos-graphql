import React, { useState, useContext } from 'react';
import { TabBarIOS } from 'react-native';

import { StoreContext } from '../store/reducer/StoreProvider';
import Activation from '../screens/Activation/index';
import Home from '../screens/Home/index';
import Settings from '../screens/Settings/index';

const TabBar = () => {
  const [currentTab, setCurrentTab] = useState('home');
  const { state } = useContext(StoreContext);

  if (state.isAuthenticated === false) {
    return <Activation />;
  }

  return (
    <TabBarIOS>
      <TabBarIOS.Item
        selected={currentTab === 'home'}
        title={'Home'}
        onPress={() => setCurrentTab('home')}>
        <Home />
      </TabBarIOS.Item>

      <TabBarIOS.Item
        selected={currentTab === 'settings'}
        title={'Settings'}
        onPress={() => setCurrentTab('settings')}>
        <Settings />
      </TabBarIOS.Item>
    </TabBarIOS>
  );
};

export default TabBar;

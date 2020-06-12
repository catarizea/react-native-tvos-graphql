import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TabBarIOS } from 'react-native';
import Navigator from './Navigator';
import { activationRoute, homeRoute, settingRoute } from './routes';
import theme from '../theme';

const TabBar = ({ isAuthenticated }) => {
  const [currentTab, setCurrentTab] = useState('home');

  const changeTab = (selectedTab) => {
    setCurrentTab(selectedTab);
  };

  if (!isAuthenticated) {
    return <Navigator initialRoute={activationRoute} />;
  }

  return (
    <TabBarIOS>
      <TabBarIOS.Item
        selected={currentTab === 'home'}
        title={'Home'}
        onPress={() => changeTab('home')}
        badge={theme.fontFamily}>
        <Navigator initialRoute={homeRoute} />
      </TabBarIOS.Item>

      <TabBarIOS.Item
        selected={currentTab === 'setting'}
        title={'Settings'}
        onPress={() => changeTab('setting')}
        badge={theme.fontFamily}>
        <Navigator initialRoute={settingRoute} />
      </TabBarIOS.Item>
    </TabBarIOS>
  );
};

TabBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default TabBar;

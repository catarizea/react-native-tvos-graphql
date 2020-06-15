import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import { IntlProvider } from 'react-intl';
import localeData from './i18n/translation.json';
import get from 'lodash.get';

import deviceLocale from './constants/deviceLocale';
import StoreProvider from './store/reducer/StoreProvider';
import ApolloProvider from './store/apollo/Provider';
import Navigator from './navigator/StackedNavigator';
import { ignored } from './constants/yellowBox';

const language = get(deviceLocale, '[0].languageCode', 'en');
const messages = localeData[language] || localeData.en;

console.ignoredYellowBox = ignored;
console.disableYellowBox = true;

const App = () => {
  return (
    <IntlProvider locale={language} messages={messages} textComponent={Text}>
      <StoreProvider>
        <ApolloProvider>
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
        </ApolloProvider>
      </StoreProvider>
    </IntlProvider>
  );
};

export default App;

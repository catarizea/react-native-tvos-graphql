import React from 'react';
import { Text } from 'react-native';
import { ApolloProvider } from '@apollo/react-hooks';
import { IntlProvider } from 'react-intl';
import localeData from './i18n/translation.json';
import get from 'lodash.get';

import client from './utils/apolloClient';
import deviceLocale from './constants/deviceLocale';
import StoreProvider from './store/StoreProvider';
import Navigator from './navigator';

const language = get(deviceLocale, '[0].languageCode', 'en');
const messages = localeData[language] || localeData.en;

const App = () => (
  <IntlProvider locale={language} messages={messages} textComponent={Text}>
    <ApolloProvider client={client}>
      <StoreProvider>
        <Navigator />
      </StoreProvider>
    </ApolloProvider>
  </IntlProvider>
);

export default App;

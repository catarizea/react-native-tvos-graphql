import ApolloClient from 'apollo-boost';
import {
  API_ENDPOINT_DEVELOPMENT,
  API_ENDPOINT_PRODUCTION,
} from 'react-native-dotenv';

import deviceInfo from '../constants/deviceInfo';

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'development'
      ? `${API_ENDPOINT_DEVELOPMENT}/graphql`
      : `${API_ENDPOINT_PRODUCTION}/graphql`,
  request: operation => {
    operation.setContext({
      headers: {
        uuid: deviceInfo.uuid,
      },
    });
  },
});

export default client;

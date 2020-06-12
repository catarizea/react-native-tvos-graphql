import ApolloClient from 'apollo-boost';
import {
  API_ENDPOINT_DEVELOPMENT,
  API_ENDPOINT_PRODUCTION,
} from 'react-native-dotenv';

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === 'development'
      ? API_ENDPOINT_DEVELOPMENT
      : API_ENDPOINT_PRODUCTION,
});

export default client;

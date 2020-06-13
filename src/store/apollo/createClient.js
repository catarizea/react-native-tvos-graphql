import ApolloClient from 'apollo-boost';
import {
  API_ENDPOINT_DEVELOPMENT,
  API_ENDPOINT_PRODUCTION,
} from 'react-native-dotenv';

import deviceInfo from '../../constants/deviceInfo';
import { logOut } from '../reducer/actions';

const createClient = dispatch =>
  new ApolloClient({
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
    onError: ({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        console.log('graphQLErrors', graphQLErrors);
      }

      if (networkError) {
        console.log('networkError', networkError);
        logOut(dispatch);
      }
    },
  });

export default createClient;

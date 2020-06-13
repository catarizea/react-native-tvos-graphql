import {
  API_ENDPOINT_DEVELOPMENT,
  API_ENDPOINT_PRODUCTION,
} from 'react-native-dotenv';

const apiHost =
  process.env.NODE_ENV === 'development'
    ? API_ENDPOINT_DEVELOPMENT
    : API_ENDPOINT_PRODUCTION;

const paths = {
  ME: `${apiHost}/me`,
  CODE: `${apiHost}/activation-code`,
  LOGOUT: `${apiHost}/logout`,
};

export default paths;

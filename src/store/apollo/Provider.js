import React, { useContext } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import PropTypes from 'prop-types';

import createClient from './createClient';
import { StoreContext } from '../reducer/StoreProvider';

const Provider = ({ children }) => {
  const { dispatch } = useContext(StoreContext);
  const client = createClient(dispatch);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;

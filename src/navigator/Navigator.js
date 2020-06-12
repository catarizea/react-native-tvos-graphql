import React from 'react';
import PropTypes from 'prop-types';
import { NavigatorIOS } from 'react-native';

const style = { flex: 1 };

const Navigator = ({ initialRoute }) => (
  <NavigatorIOS initialRoute={initialRoute} style={style} navigationBarHidden />
);

Navigator.propTypes = {
  initialRoute: PropTypes.shape({
    component: PropTypes.func,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Navigator;

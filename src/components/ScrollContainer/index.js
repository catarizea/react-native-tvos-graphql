import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';

const style = {
  marginTop: 0,
  marginBottom: 0,
  width: '100%',
  paddingTop: 0,
  paddingBottom: 0,
};

const ScrollContainer = props => {
  const { children } = props;
  return (
    <ScrollView
      contentContainerStyle={style}
      contentInset={{ top: 0 }}
      automaticallyAdjustContentInsets={false}>
      {children}
    </ScrollView>
  );
};

ScrollContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ScrollContainer;

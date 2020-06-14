/* eslint no-console: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import theme from '../../theme';

const Category = React.memo(({ item, navigator, navigateToRoute, box }) => {
  const handlePress = () => {
    navigator.navigate(navigateToRoute, { item });
  };

  return <Button box={box} item={item} handlePress={handlePress} />;
});

Category.propTypes = {
  item: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  box: PropTypes.object,
  navigateToRoute: PropTypes.string.isRequired,
};

Category.defaultProps = {
  box: theme.category.box,
};

export default Category;

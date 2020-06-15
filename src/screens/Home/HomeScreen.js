import React from 'react';
import PropTypes from 'prop-types';
import Container from '../../components/Container';
import ScrollContainer from '../../components/ScrollContainer';
import List from '../../components/List';

const Home = props => {
  const {
    featured,
    uniqueKeys,
    movies,
    loadMoreMovies,
    categories,
    numColumns,
    navigation,
  } = props;

  return (
    <Container>
      <ScrollContainer>
        <List
          horizontal
          items={featured}
          navigator={navigation}
          childType={'featured'}
          uniqueKey={uniqueKeys[0]}
          navigateToRoute={'Details'}
        />
        <List
          horizontal
          items={movies}
          navigator={navigation}
          childType={'poster'}
          loadMoreItems={loadMoreMovies}
          uniqueKey={uniqueKeys[1]}
          navigateToRoute={'Details'}
        />
        <List
          items={categories}
          navigator={navigation}
          childType={'category'}
          uniqueKey={uniqueKeys[2]}
          numColumns={numColumns}
          navigateToRoute={'Category'}
        />
      </ScrollContainer>
    </Container>
  );
};

Home.propTypes = {
  featured: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
  uniqueKeys: PropTypes.array.isRequired,
  movies: PropTypes.array.isRequired,
  loadMoreMovies: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  numColumns: PropTypes.number.isRequired,
};

export default Home;

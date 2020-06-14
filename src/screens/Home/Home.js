import React from 'react';
import PropTypes from 'prop-types';
import Container from '../../components/Container';
import ScrollContainer from '../../components/ScrollContainer';
import List from '../../components/List';

const Home = props => {
  const {
    featured,
    navigator,
    uniqueKeys,
    movies,
    loadMoreMovies,
    categories,
    numColumns,
  } = props;

  return (
    <Container>
      <ScrollContainer>
        <List
          horizontal
          items={featured}
          navigator={navigator}
          childType={'featured'}
          uniqueKey={uniqueKeys[0]}
          navigateToRoute={{}}
        />
        <List
          horizontal
          items={movies}
          navigator={navigator}
          childType={'poster'}
          loadMoreItems={loadMoreMovies}
          uniqueKey={uniqueKeys[1]}
          navigateToRoute={{}}
        />
        <List
          items={categories}
          navigator={navigator}
          childType={'category'}
          uniqueKey={uniqueKeys[2]}
          numColumns={numColumns}
          navigateToRoute={{}}
        />
      </ScrollContainer>
    </Container>
  );
};

Home.propTypes = {
  featured: PropTypes.array.isRequired,
  navigator: PropTypes.object.isRequired,
  uniqueKeys: PropTypes.array.isRequired,
  movies: PropTypes.array.isRequired,
  loadMoreMovies: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  numColumns: PropTypes.number.isRequired,
  intl: PropTypes.object.isRequired,
};

export default Home;

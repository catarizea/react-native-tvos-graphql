import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Home from './HomeScreen';
import { FETCH_MOVIES_LIMIT } from '../../constants/pagination';
import { generateUniqueKeys, getColumnsNumber } from '../../utils/helpers';

export const GET_FEATURED_CATEGORIES = gql`
  query GET_FEATURED_CATEGORIES(
    $featuredSortField: String!
    $categoriesSortField: String!
  ) {
    allCategories(sortField: $categoriesSortField, sortOrder: "asc") {
      id
      title
    }
    featured: allMovies(
      filter: { featured: true }
      sortField: $featuredSortField
      sortOrder: "asc"
    ) {
      id
      title
      released
      genre
      rated
      country
      production
      runtime
      director
      writer
      actors
      plot
      poster
      cover
      rating
      boxOffice
      featured
      trailer
    }
  }
`;

export const GET_MOVIES = gql`
  query GET_MOVIES($page: Int!, $perPage: Int!, $moviesSortField: String!) {
    movies: allMovies(
      page: $page
      perPage: $perPage
      sortField: $moviesSortField
      sortOrder: "asc"
    ) {
      id
      title
      released
      genre
      rated
      country
      production
      runtime
      director
      writer
      actors
      plot
      poster
      cover
      rating
      boxOffice
      featured
      trailer
    }
  }
`;

const uniqueKeys = generateUniqueKeys();
const numColumns = getColumnsNumber('category');

const HomeContainer = ({ navigation }) => {
  const {
    error: featuredCategoriesError,
    data: featuredCategoriesData,
  } = useQuery(GET_FEATURED_CATEGORIES, {
    variables: {
      featuredSortField: 'id',
      categoriesSortField: 'title',
    },
  });

  console.log('featuredCategoriesError', featuredCategoriesError);
  console.log('featuredCategoriesData', featuredCategoriesData);

  const { error: moviesError, data: moviesData, fetchMore } = useQuery(
    GET_MOVIES,
    {
      variables: {
        page: 1,
        perPage: FETCH_MOVIES_LIMIT,
        moviesSortField: 'id',
      },
      fetchPolicy: 'cache-and-network',
    },
  );

  console.log('moviesError', moviesError);
  console.log('moviesData', moviesData);

  const loadMoreMovies = () => {
    if (
      moviesData &&
      moviesData.movies &&
      moviesData.movies.length &&
      moviesData.movies.length % FETCH_MOVIES_LIMIT === 0
    ) {
      fetchMore({
        variables: {
          page: moviesData.movies.length / FETCH_MOVIES_LIMIT + 1,
          perPage: FETCH_MOVIES_LIMIT,
          moviesSortField: 'id',
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          return Object.assign(
            {},
            { movies: [...prev.movies, ...fetchMoreResult.movies] },
          );
        },
      });
    }

    return;
  };

  return (
    <Home
      featured={
        featuredCategoriesData && featuredCategoriesData.featured
          ? featuredCategoriesData.featured
          : []
      }
      movies={moviesData && moviesData.movies ? moviesData.movies : []}
      categories={
        featuredCategoriesData && featuredCategoriesData.allCategories
          ? featuredCategoriesData.allCategories
          : []
      }
      uniqueKeys={uniqueKeys}
      numColumns={numColumns}
      loadMoreMovies={loadMoreMovies}
      navigation={navigation}
    />
  );
};

export default HomeContainer;

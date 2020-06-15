import React from 'react';
import { injectIntl } from 'react-intl';
import get from 'lodash.get';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import CategoryScreen from './CategoryScreen';
import Heading from '../../components/Heading';
import { ContainerCenteredItems } from '../../components/Container/style';
import { getColumnsNumber } from '../../utils/helpers';

import messages from '../messages';

const numColumns = getColumnsNumber('poster');

export const GET_CATEGORY_MOVIES = gql`
  query GET_CATEGORY_MOVIES(
    $categorySortField: String!
    $categoryTitle: String!
  ) {
    movies: allMovies(
      filter: { q: $categoryTitle }
      sortField: $categorySortField
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

const Category = ({ intl: { formatMessage }, navigation, route }) => {
  const category = get(route, 'params.item', null);
  const { error: categoryError, data: categoryData } = useQuery(
    GET_CATEGORY_MOVIES,
    {
      variables: {
        categorySortField: 'title',
        categoryTitle: category.title,
      },
    },
  );

  if (!category.title) {
    return (
      <ContainerCenteredItems>
        <Heading>{formatMessage(messages.categoryTitle)}</Heading>
      </ContainerCenteredItems>
    );
  }

  console.log('categoryError', categoryError);
  console.log('categoryData', categoryData);

  return (
    <CategoryScreen
      searchedMovies={
        categoryData && categoryData.movies ? categoryData.movies : []
      }
      navigator={navigation}
      numColumns={numColumns}
      navigateToRoute={'Details'}
      item={category}
    />
  );
};

export default injectIntl(Category);

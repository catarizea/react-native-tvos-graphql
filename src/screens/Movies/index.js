import React from 'react';
import { injectIntl } from 'react-intl';
import Heading from '../../components/Heading';
import { ContainerCenteredItems } from '../../components/Container/style';
import messages from '../messages';

const MoviesScreen = ({ intl: { formatMessage } }) => (
  <ContainerCenteredItems>
    <Heading>{formatMessage(messages.moviesTitle)}</Heading>
  </ContainerCenteredItems>
);

export default injectIntl(MoviesScreen);

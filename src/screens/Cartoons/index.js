import React from 'react';
import { injectIntl } from 'react-intl';
import Heading from '../../components/Heading';
import { ContainerCenteredItems } from '../../components/Container/style';
import messages from '../messages';

const CartoonsScreen = ({ intl: { formatMessage } }) => (
  <ContainerCenteredItems>
    <Heading>{formatMessage(messages.cartoonsTitle)}</Heading>
  </ContainerCenteredItems>
);

export default injectIntl(CartoonsScreen);

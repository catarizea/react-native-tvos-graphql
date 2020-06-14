import React from 'react';
import { injectIntl } from 'react-intl';
import Heading from '../../components/Heading';
import { ContainerCenteredItems } from '../../components/Container/style';
import messages from '../messages';

const ShowsScreen = ({ intl: { formatMessage } }) => (
  <ContainerCenteredItems>
    <Heading>{formatMessage(messages.showsTitle)}</Heading>
  </ContainerCenteredItems>
);

export default injectIntl(ShowsScreen);

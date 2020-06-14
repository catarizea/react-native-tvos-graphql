import React from 'react';
import { injectIntl } from 'react-intl';
import Heading from '../../components/Heading';
import { ContainerCenteredItems } from '../../components/Container/style';

import messages from '../messages';
import useBackButton from '../../utils/useBackButton';

const DetailsScreen = ({ intl: { formatMessage }, navigation }) => {
  useBackButton(navigation);

  return (
    <ContainerCenteredItems>
      <Heading>{formatMessage(messages.detailsTitle)}</Heading>
    </ContainerCenteredItems>
  );
};

export default injectIntl(DetailsScreen);

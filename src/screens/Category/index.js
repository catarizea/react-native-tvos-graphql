import React from 'react';
import { injectIntl } from 'react-intl';
import Heading from '../../components/Heading';
import { ContainerCenteredItems } from '../../components/Container/style';

import messages from '../messages';
import useBackButton from '../../utils/useBackButton';

const CategoryScreen = ({ intl: { formatMessage }, navigation, route }) => {
  useBackButton(navigation, route);
  return (
    <ContainerCenteredItems>
      <Heading>{formatMessage(messages.categoryTitle)}</Heading>
    </ContainerCenteredItems>
  );
};

export default injectIntl(CategoryScreen);

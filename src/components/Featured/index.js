/* eslint no-console: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import upperCase from 'lodash.uppercase';
import truncate from 'lodash.truncate';
import { TouchableHighlight } from 'react-native';
import CacheableImage from 'react-native-cacheable-image';
import deviceInfo from '../../constants/deviceInfo';
import theme from '../../theme';
import {
  OuterBox,
  InnerBox,
  FeaturedText,
  TextBox,
  TitleText,
  DescriptionText,
} from './style';
import messages from './messages';

const Featured = React.memo(
  ({
    item,
    first,
    last,
    tvParallaxProps,
    box: { innerWidth, innerHeight, outerWidth, outerHeight },
    intl: { formatMessage },
    navigator,
    navigateToRoute,
  }) => {
    const handlePress = () => {
      navigateToRoute.passProps = { item };
      navigator.push(navigateToRoute);
    };

    const firstMarginLeft = first ? 30 : 0;
    const lastMarginRight = last ? 30 : 0;

    return (
      <OuterBox
        outerWidth={outerWidth}
        outerHeight={outerHeight}
        firstMarginLeft={firstMarginLeft + 10}
        lastMarginRight={lastMarginRight + 10}
        style={{ shadowOffset: { width: 0, height: 6 } }}>
        <TouchableHighlight
          activeOpacity={1}
          tvParallaxProperties={tvParallaxProps}
          style={{
            width: innerWidth,
            height: innerHeight,
          }}
          underlayColor={'transparent'}
          hasTVPreferredFocus={first}
          onPress={handlePress}>
          <InnerBox innerWidth={innerWidth} innerHeight={innerHeight}>
            <TextBox>
              <FeaturedText>
                {upperCase(formatMessage(messages.featured))}
              </FeaturedText>
              <TitleText>{item.title}</TitleText>
              <DescriptionText>
                {truncate(item.plot, {
                  length: theme.featured.truncateAt,
                  separator: ' ',
                })}
              </DescriptionText>
            </TextBox>
            <CacheableImage
              source={{ uri: item.cover }}
              resizeMode={'cover'}
              style={{ width: innerWidth, height: innerHeight - 150 }}
              bundleIdentifier={deviceInfo.bundleId}
            />
          </InnerBox>
        </TouchableHighlight>
      </OuterBox>
    );
  },
);

Featured.propTypes = {
  item: PropTypes.object.isRequired,
  tvParallaxProps: PropTypes.object,
  navigator: PropTypes.object.isRequired,
  box: PropTypes.object,
  first: PropTypes.bool,
  last: PropTypes.bool,
  intl: PropTypes.object.isRequired,
  navigateToRoute: PropTypes.object.isRequired,
};

Featured.defaultProps = {
  tvParallaxProps: {
    enabled: true,
    shiftDistanceX: 1.5,
    shiftDistanceY: 1.5,
    tiltAngle: 0.005,
    magnification: 1.08,
  },
  box: theme.featured.box,
  first: false,
  last: false,
};

export default injectIntl(Featured);
